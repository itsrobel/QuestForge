//import * as React from 'react-native';
//import React, { useState } from 'react';
import React from 'react'; 
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import CreateWorld from './CreateWorld';

import { useFonts } from 'expo-font';

const Opening = ({ navigation }) => {
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
    const [loaded, error] = useFonts({
        'Inter_18pt-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
        'JetBrainsMono_18pt-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    });

    const logo = require('../assets/logo.png'); // Ensure you have the correct path to your logo image
    
    return (
        <View style={styles.container}>
            <View style={styles.anotherContainer}>
            <Image source={logo} style={{width:800, height:800, alignSelf:"center", flex: 1, marginTop: 40}}/>
            {/* <View style={styles.spaceContainer}/> */}

            <Text style={{fontFamily: "Lateef-Regular", margin: -100, flex: 1, alignSelf: 'flex-end', fontSize: 20, color: '#B6B2CB', marginLeft: -50, flex: 1, }}>embark on an adventure!</Text>
            

            <TouchableOpacity style={{flex: 1, borderRadius: 40,}} onPress={() => navigation.navigate('CreateWorld')}>
                <Text style={{fontSize:60, marginTop: -120,  fontFamily: "Lateef-Regular", color: "#B6B2CB", alignSelf:"center"}}>PLAY</Text>
            </TouchableOpacity>

            </View>
        </View>
    );
  }

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#312D46',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spaceContainer: {
        flex: 1,
    },
    anotherContainer: {
        width: '50%',
        height: '100%'
    }

  }

  export default Opening;