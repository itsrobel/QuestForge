//import * as React from 'react-native';
//import React, { useState } from 'react';
import React from 'react'; 
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SelectWorld from './SelectWorld';
import styles from '../stylesheets/createworldStyle'

const CreateWorld = ({ navigation }) => {
    const [worldName, setWorldName] = React.useState('');
    const [selectedTheme, setSelectedTheme] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [usernames, setUsernames] = React.useState([]);
    
    const addUser = () => {
        if (userName.trim() !== '') { // Check if the username is not empty
            setUsernames([...usernames, userName]); // Add username to the array
            setUserName(''); // Clear the input field after adding
        } else {
            alert('Please enter a username'); // Alert if input is empty
        }
    };
    
    return (
    <View style={styles.container}>
        {/* Logo Image */}
        <Image
            source={require('../assets/logo.png')} // Update the path as necessary
            style={{ width: 500, height: 500, position: 'absolute', top: -150, left: 10 }} // Adjust size and position
        />

        {/* top two world option buttons */}
        <View style={styles.topButtonContainer}>
            {/* CreateWorld Button */}
            <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: 'rgba(134, 102, 48, 1)' }]}
                onPress={() => navigation.navigate('CreateWorld')}
            >
                <Text style={styles.buttonText}>Create World</Text>
            </TouchableOpacity>
            {/* SelectWorld Button */}
            <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: 'rgba(191, 166, 125, 1)' }]}
                onPress={() => navigation.navigate('SelectWorld')}
            >
                <Text style={styles.buttonText}>Select World</Text>
            </TouchableOpacity>
        </View>

        {/* Text Input for World Name */}
        <View style={[styles.inputContainer, { marginTop: 200 }]}>
                <Text style={styles.label}>World Name</Text>
                <TextInput
                    style={styles.textInput}
                    value={worldName}
                    onChangeText={setWorldName} // Update state with the input value
                    placeholder="Enter world name" // Placeholder text
                />
        </View>

        {/* Theme Dropdown */}
        <View style={styles.inputContainer}>
                <Text style={styles.label}>Theme:</Text>
                <Picker
                    selectedValue={selectedTheme}
                    onValueChange={(itemValue) => setSelectedTheme(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Theme" value="" />
                    <Picker.Item label="Sci-Fi" value="sci-fi" />
                    <Picker.Item label="Middle Ages" value="middle-ages" />
                    <Picker.Item label="Post-Apocalyptic" value="post-apocalyptic" />
                    <Picker.Item label="Dark Fantasy" value="dark-fantasy" />
                    <Picker.Item label="High Fantasy" value="high-fantasy" />
                </Picker>
        </View>

        {/* Add User Section */}
        <View style={styles.inputContainer}>
                <Text style={styles.label}>Add User:</Text>
                <TextInput
                    style={styles.textInputSmall}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder="Enter username"
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={addUser} // Call the addUser function
                >
                    <Text style={styles.addButtonText}>Add User</Text>
                </TouchableOpacity>
        </View>

        {/* Display Usernames */}
        <View style={styles.usernamesContainer}>
                <Text style={styles.label}>Usernames:</Text>
                {usernames.map((username, index) => (
                    <Text key={index} style={styles.usernameText}>{username}</Text>
                ))}
        </View>

        {/* Create World Button at the Bottom */}
        <View style={styles.createWorldButtonContainer}>
                <TouchableOpacity
                    style={styles.createWorldButton}
                    onPress={() => {
                        // Handle the create world action
                        alert(`World Created: ${worldName}, Theme: ${selectedTheme}, Users: ${usernames.join(', ')}`);
                    }}
                >
                    <Text style={styles.createWorldButtonText}>Create World</Text>
                </TouchableOpacity>
        </View>
    </View>
    );
  };

  export default CreateWorld;