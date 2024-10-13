//import * as React from 'react';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Profile from './Profile';
import TrackStory from './TrackStoryline';
import WorldMap from './WorldMap';
import styles from '../stylesheets/homescreenStyle'

const HomeScreen = ({ navigation }) => {
    const [uploadedImages, setUploadedImages] = useState([]);

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
                // Save the image URI to state and log the updated array
                setUploadedImages(prevImages => {
                    const newImages = [...prevImages, result.assets[0].uri];
                    console.log("Uploaded Images:", newImages); // Log the updated images
                    return newImages; // Return the new array
                });
            } else {
                alert('No image selected!');
            }
        } else {
            alert('Image picking was canceled!');
        }
    };
    
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen tesy</Text>
      
      {/* Button Container */}
      <View style={{ position: 'absolute', bottom: 80, right: 20 }}>
        {/* Profile Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Go to Profile</Text>
        </TouchableOpacity>

        {/* World Map Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('WorldMap')}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>World Map</Text>
        </TouchableOpacity>

        {/* Track Storyline Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TrackStory')}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Track Storyline</Text>
        </TouchableOpacity>
      </View>

      {/* Image Upload Button */}
      <View style={{ position: 'absolute', bottom: 50, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
                style={styles.fileButton}
                onPress={pickImage} // Call the image picker
            >
                <Text style={{ color: '#fff' }}>Upload Image</Text>
            </TouchableOpacity>
       </View>

       {/* Display Uploaded Images */}
       {/* {uploadedImages.length > 0 && (
                <ScrollView style={{ position: 'absolute', top: 100, width: '100%', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Uploaded Images:</Text>
                    {uploadedImages.map((uri, index) => (
                        <Image
                            key={index}
                            source={{ uri }} // Use the image URI
                            style={{ width: 200, height: 200, marginTop: 10 }} // You can adjust the size
                        />
                    ))}
                </ScrollView>
        )} */}
    </View>
  );
};

export default HomeScreen;