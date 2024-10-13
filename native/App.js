import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import TrackStory from './screens/TrackStoryline';
import WorldMap from './screens/WorldMap';

const Stack = createNativeStackNavigator();
const logo = require('./assets/logo.png'); // Ensure you have the correct path to your logo image

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackStory"
          component={TrackStory}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => (
              <Image source={logo} style={{ width: 40, height: 40 }} />
            ),
          })}
        />
        <Stack.Screen
          name="WorldMap"
          component={WorldMap}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => (
              <Image source={logo} style={{ width: 40, height: 40 }} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});