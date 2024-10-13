from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, emit

from langchain_openai import OpenAI
import json
import uuid
import os
from game_master_handler import GROUP_BOSS_FIGHT_PROMPT
from langchain_core.output_parsers import StrOutputParser

llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.7)

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


group_boss_fight_chain = GROUP_BOSS_FIGHT_PROMPT | llm | StrOutputParser()

# Store user data (in a real application, use a database)
users = {}
rooms = {}
invites = {}


@socketio.on("connect")
def handle_connect():
    print(f"Client connected: {request.sid}")


@socketio.on("disconnect")
def handle_disconnect():
    print(f"Client disconnected: {request.sid}")
    for room in rooms:
        if request.sid in rooms[room]["users"]:
            rooms[room]["users"].remove(request.sid)


@socketio.on("register")
def handle_register(data):
    username = data["username"]
    users[request.sid] = {"username": username, "stats": data["stats"]}
    emit("register_response", {"message": f"Registered as {username}"})


@socketio.on("create_party")
def handle_create_party(data):
    party_id = str(uuid.uuid4())
    rooms[party_id] = {"users": [request.sid], "leader": request.sid}
    join_room(party_id)
    emit(
        "party_created", {"party_id": party_id, "message": "Party created successfully"}
    )


@socketio.on("invite_to_party")
def handle_invite(data):
    invitee_username = data["invitee"]
    party_id = data["party_id"]

    if request.sid != rooms[party_id]["leader"]:
        emit(
            "invite_response",
            {"success": False, "message": "Only party leader can send invites"},
        )
        return

    invitee_sid = next(
        (sid for sid, user in users.items() if user["username"] == invitee_username),
        None,
    )
    if not invitee_sid:
        emit("invite_response", {"success": False, "message": "User not found"})
        return

    invite_id = str(uuid.uuid4())
    invites[invite_id] = {"party_id": party_id, "invitee": invitee_sid}

    emit(
        "party_invite",
        {
            "invite_id": invite_id,
            "party_id": party_id,
            "inviter": users[request.sid]["username"],
        },
        room=invitee_sid,
    )

    emit(
        "invite_response",
        {"success": True, "message": f"Invite sent to {invitee_username}"},
    )


@socketio.on("accept_invite")
def handle_accept_invite(data):
    invite_id = data["invite_id"]
    if invite_id not in invites:
        emit("accept_invite_response", {"success": False, "message": "Invalid invite"})
        return

    party_id = invites[invite_id]["party_id"]
    join_room(party_id)
    rooms[party_id]["users"].append(request.sid)

    emit("player_joined", {"username": users[request.sid]["username"]}, room=party_id)

    emit(
        "accept_invite_response",
        {"success": True, "message": "Joined party successfully", "party_id": party_id},
    )

    del invites[invite_id]


@socketio.on("start_boss_fight")
def handle_boss_fight(data):
    room = data["party_id"]
    boss_details = data["boss_details"]

    if request.sid != rooms[room]["leader"]:
        emit(
            "boss_fight_response",
            {"success": False, "message": "Only party leader can start boss fight"},
        )
        return

    party_stats = [users[user_id]["stats"] for user_id in rooms[room]["users"]]
    current_story = "The party has entered the boss chamber..."

    result = group_boss_fight_chain.run(
        {
            "party_stats": json.dumps(party_stats),
            "current_story": current_story,
            "boss_details": json.dumps(boss_details),
        }
    )

    fight_data = json.loads(result)

    for player_change in fight_data["player_stat_changes"]:
        user_id = next(
            uid
            for uid in rooms[room]["users"]
            if users[uid]["username"] == player_change["player_name"]
        )
        for stat_change in player_change["stat_changes"]:
            users[user_id]["stats"][stat_change["stat"]] += stat_change["change"]

    emit(
        "boss_fight_result",
        {
            "fight_data": fight_data,
            "updated_stats": {
                users[uid]["username"]: users[uid]["stats"]
                for uid in rooms[room]["users"]
            },
        },
        room=room,
    )


if __name__ == "__main__":
    socketio.run(app, debug=True)
