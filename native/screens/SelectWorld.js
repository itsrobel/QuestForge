import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import socket from './Socket';
const SelectWorld = ({ navigation }) => {
  const [text, setText] = useState("");
  const worldData = [
    { id: 1, world: 'My World', seed: 'fsdfsdfsd' },
    { id: 2, world: 'My World 2', seed: 'fsdfsdfvcxsd' },
    { id: 3, world: 'My World', seed: 'fsdfsdfsd' },
    { id: 4, world: 'My World 2', seed: 'fsdfsdfvcxsd' },
    { id: 5, world: 'My World', seed: 'fsdfsdfsd' },
    { id: 6, world: 'My World 2', seed: 'fsdfsdfvcxsd' },
    { id: 7, world: 'My World', seed: 'fsdfsdfsd' },
    { id: 8, world: 'My World 2', seed: 'fsdfsdfvcxsd' },
    { id: 9, world: 'My World', seed: 'fsdfsdfsd' },
    { id: 10, world: 'My World 2', seed: 'fsdfsdfvcxsd' },

  ];
  const [loaded, error] = useFonts({
    'Inter_18pt-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
    'JetBrainsMono_18pt-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
});

useEffect(() => {
  // Listen for messages from the server
  socket.on("get_worlds", (data) => {
    for (let i = 0; i < data.length; i++) {
      let wt = { id: i, world: data[i], seed: "some cool number" };
      worldData.push(wt);
    }
  });

  // Clean up the listener on component unmount
  return () => {
    socket.off("get_worlds");
  };
}, []);

const sendMessage = () => {
  // Emit a message to the server
  socket.emit("message", "Hello from React Native!");
};
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Update the path as necessary
        style={{ width: 500, marginTop: -150, left: 10 }} // Adjust size and position
      />

      <View style={styles.topContainer}>
      <View style={styles.topButtonContainer}>
        {/* CreateWorld Button */}
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: "rgba(191, 166, 125, 1)" },
          ]}
          onPress={() => navigation.navigate("CreateWorld")}
        >
          <Text style={[styles.buttonText, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>Create World</Text>
        </TouchableOpacity>
        {/* SelectWorld Button */}
        <TouchableOpacity
          style={[styles.buttonContainer,{ backgroundColor: "rgba(134, 102, 48, 1)" }]}
          onPress={() => navigation.navigate("SelectWorld")}>
          <Text style={[styles.buttonText, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>Select World</Text>
        </TouchableOpacity>
      </View>


      <Text style={[styles.label, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>Enter World Name:</Text>

      <TextInput
        style={[styles.input, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}
        placeholder="Type seed name here"
        value={text}
        onChangeText={(value) => setText(value)}
      />


      <Text style={[styles.label, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>Or Select A World Down Below</Text>
      </View>
      




    <ScrollView
      style={{marginTop:-180, width: '80%', alignSelf: 'center', flex: 1}} showsVerticalScrollIndicator={true}>

      

      
        

        {worldData.map((row) => (
          <View key={row.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>World Name: {row.world}</Text>
            <Text style={[styles.tableCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}> Seed: {row.seed}</Text>
          </View>
        ))}
        <Button
          title="Join"
          onPress={() => {
            console.log('World Name:', text); // Log the entered text or do something with it
            navigation.navigate('Home');
          }}
          style={{fontFamily: 'JetBrainsMono_18pt-Regular'}}
        />
      
      </ScrollView>
    </View>
  );
};

export default SelectWorld;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the view takes up the full screen
    padding: 20,

    backgroundColor: 'rgba(15, 13, 51, 1)',
     // Set the background color
  },
  topButtonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-between', // Space between the buttons
    marginBottom: 10, // Reduced space below buttons  
  },
  buttonContainer: {
    borderRadius: 5,
    padding: 10,
    width: '30%', // Each button takes 48% of the available width
    alignItems: 'center', // Center the text inside the button
    paddingVertical: 15, // Adjust padding for a tighter look
  },
  buttonText: {
    color: "rgba(255, 255, 255, 1)", // Text color
    textAlign: "center", // Align text in the center
    fontSize: 22,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    color: "white",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "white",
  },
  tableRow: {
    backgroundColor: "#4C4A65", // Set background color for table rows
    borderBottomColor: "#866630",
    paddingVertical: 10, // Adjusted padding
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  tableCell: {
    color: "white",
    fontSize: 16,
  },
  topContainer: {
    padding: 20,
    flex: 1,
    marginTop: -180,
  }
});
