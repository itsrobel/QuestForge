import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Profile from './Profile';
import TrackStory from './TrackStoryline';
import WorldMap from './WorldMap';
import styles from '../stylesheets/homescreenStyle'

const HomeScreen = ({ navigation }) => {
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
    </View>
  );
};

export default HomeScreen;