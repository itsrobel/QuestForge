import * as React from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import SelectWorld from './SelectWorld';
import styles from '../stylesheets/createworldStyle'

const CreateWorld = ({ navigation }) => {
    // other code 
    
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
    </View>
    );
  };

  export default CreateWorld;