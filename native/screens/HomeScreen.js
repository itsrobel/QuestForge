//import * as React from 'react';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Profile from './Profile';
import TrackStory from './TrackStoryline';
import WorldMap from './WorldMap';
import styles from '../stylesheets/homescreenStyle'

const HomeScreen = ({ navigation }) => {
    const [selectedImages, setSelectedImages] = useState([]);

    // Stat values
    const stats = {
        health: { current: 90, max: 100 },
        athletics: { current: 50, max: 100 },
        creativity: { current: 80, max: 100 },
        knowledge: { current: 10, max: 100 },
        charisma: { current: 100, max: 100 },
    };
    
    const pickImage = async () => {
        // Ask for permission to access the image library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        // Pick an image from the device's image library
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images
          allowsEditing: true,
          aspect: [4, 3], // You can set the aspect ratio if you want
          quality: 1, // High-quality image
        });
    
        // Log the result for debugging purposes
        console.log(result);
    
        // Check if an image was selected
        if (!result.canceled) {
          // Check if result.assets exists and use the first asset's uri
          if (result.assets && result.assets.length > 0) {
            setSelectedImages(prevImages => [
              ...prevImages,
              result.assets[0].uri
            ]); // Save the image URI to state
          } else {
            alert('No image selected!');
          }
        } else {
          alert('Image picking was canceled!');
        }
    };

    // HealthBar component
    const HealthBar = ({ current, max }) => {
        const percentage = (current / max) * 100; // Calculate the width percentage
        const healthBarColor = current > 30 ? 'green' : 'red'; // Change color based on health level
        return (
            <View style={styles.healthBarContainer}>
                <View style={[styles.healthBar, { width: percentage, backgroundColor: healthBarColor }]} />
                <Text style={styles.healthBarText}>{`${current} / ${max}`}</Text>
            </View>
        );
    };
    
    return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
            source={require('../assets/logo.png')} // Update the path as necessary
            style={{ width: 500, height: 500, position: 'absolute', top: -150, left: 10 }} // Adjust size and position
      />

      <View style={styles.leftBox}>
            {/* Positioning the button here */}
            {/* <View style={styles.uploadButtonContainer}>
                <TouchableOpacity
                    style={styles.fileButton}
                    onPress={pickImage}
                >
                    <Text style={{ color: '#fff' }}>Upload Image</Text>
                </TouchableOpacity>
            </View> */}
       </View>
      
      {/* Button Container */}
      <View style={{ position: 'absolute', bottom: 80, right: 20 }}>
        {/* Profile Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={{ color: 'rgba(3, 4, 61, 1)', textAlign: 'center' }}>Go to Profile</Text>
        </TouchableOpacity>

        {/* World Map Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('WorldMap')}
        >
          <Text style={{ color: 'rgba(3, 4, 61, 1)', textAlign: 'center' }}>World Map</Text>
        </TouchableOpacity>

        {/* Track Storyline Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TrackStory')}
        >
          <Text style={{ color: 'rgba(3, 4, 61, 1)', textAlign: 'center' }}>Track Storyline</Text>
        </TouchableOpacity>
      </View>

      {/* Image Upload Button */}
      {/* <View style={{ position: 'absolute', bottom: 50, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
                style={styles.fileButton}
                onPress={pickImage} // Call the image picker
            >
                <Text style={{ color: '#fff' }}>Upload Image</Text>
            </TouchableOpacity>
       </View> */}
       <View style={{ position: 'absolute', bottom: 50, width: '100%', left: 500, flexDirection: 'row'}}>
            <TouchableOpacity
                style={styles.fileButton}
                onPress={pickImage} // Call the image picker
            >
                <Text style={{ color: 'rgba(3, 4, 61, 1)' }}>Upload Image</Text>
            </TouchableOpacity>
       </View>

       {/* Character Stats Container */}
       <View style={styles.statsContainer}>
          {Object.entries(stats).map(([key, value]) => (
              <View style={styles.statBox} key={key}>
                 <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                 <HealthBar current={value.current} max={value.max} />
              </View>
           ))}
       </View>
    </View>
  );
};


export default HomeScreen;