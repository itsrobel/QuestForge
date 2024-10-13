import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Profile from './Profile';
import styles from '../stylesheets/homescreenStyle'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen tesy</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default HomeScreen;