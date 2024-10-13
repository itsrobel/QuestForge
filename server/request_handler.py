from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, emit
# from langchain.llms import OpenAI


import os

from server.llm_handler import initialize_bedrock_llm, initialize_llm

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


# RESTful API endpoints
@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {"data": "This text was fetched using an HTTP call to server on render"}
    return jsonify(data)


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect", {"data": f"id: {request.sid} is connected"})


# @socketio.on("data")
# def handle_message(data):
#     """event listener when client types a message"""
#     print("data from the front end: ", str(data))
#     emit("data", {"data": data, "id": request.sid}, broadcast=True)


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize LangChain LLM
llm = initialize_bedrock_llm()

# Store active namespaces and their members
namespaces = {}


@socketio.on("create_or_join_namespace")
def create_or_join_namespace(data):
    namespace = data["namespace"]
    user_id = data["user_id"]

    if namespace not in namespaces:
        namespaces[namespace] = set()

    namespaces[namespace].add(user_id)
    join_room(namespace)

    emit(
        "namespace_update",
        {"namespace": namespace, "members": list(namespaces[namespace])},
        room=namespace,
    )
    print(f"User {user_id} joined namespace {namespace}")


@socketio.on("leave_namespace")
def leave_namespace(data):
    namespace = data["namespace"]
    user_id = data["user_id"]

    if namespace in namespaces and user_id in namespaces[namespace]:
        namespaces[namespace].remove(user_id)
        leave_room(namespace)

        if not namespaces[namespace]:
            del namespaces[namespace]
        else:
            emit(
                "namespace_update",
                {"namespace": namespace, "members": list(namespaces[namespace])},
                room=namespace,
            )

    print(f"User {user_id} left namespace {namespace}")


@socketio.on("invite_to_namespace")
def invite_to_namespace(data):
    inviter_id = data["inviter_id"]
    invitee_id = data["invitee_id"]
    namespace = data["namespace"]

    if namespace in namespaces and inviter_id in namespaces[namespace]:
        emit(
            "namespace_invitation",
            {"namespace": namespace, "inviter_id": inviter_id},
            room=invitee_id,
        )
        print(f"User {inviter_id} invited user {invitee_id} to namespace {namespace}")
    else:
        emit(
            "invitation_error",
            {"message": "Invalid namespace or inviter"},
            room=inviter_id,
        )


# NOTE: This function sends a message to the namespace that the current user exists in
@socketio.on("send_message")
def send_message(data):
    namespace = data["namespace"]
    user_id = data["user_id"]
    message = data["message"]

    if namespace in namespaces and user_id in namespaces[namespace]:
        # Use LangChain LLM to process the message
        ai_response = llm(message)

        emit(
            "new_message",
            {
                "namespace": namespace,
                "user_id": user_id,
                "message": message,
                "ai_response": ai_response,
            },
            room=namespace,
        )
        print(f"Message sent in namespace {namespace} by user {user_id}")
    else:
        emit("message_error", {"message": "Invalid namespace or user"}, room=user_id)


if __name__ == "__main__":
    socketio.run(app, debug=True)
