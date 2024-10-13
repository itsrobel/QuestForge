import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import TrackStory from './screens/TrackStoryline';
import WorldMap from './screens/WorldMap';
import CreateWorld from './screens/CreateWorld';
import SelectWorld from './screens/SelectWorld';
import PhotoAlbum from './screens/PhotoAlbum';
import Login from './Login'; // Import the Login component
import { auth } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const logo = require('./assets/logo.png'); // Ensure you have the correct path to your logo image

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Set up an observer on Auth to listen for changes in the user's sign-in state
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // Update the state based on whether user is logged in
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName={isLoggedIn ? "HomeScreen" : "Login"}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="TrackStory" component={TrackStory} options={{ headerShown: false }} />
        <Stack.Screen name="WorldMap" component={WorldMap} options={{ headerShown: true, header: () => (<Image source={logo} style={{ width: 400, height: 400 }} />) }} />
        <Stack.Screen name="PhotoAlbum" component={PhotoAlbum} options={{ headerShown: false }} />
        <Stack.Screen name="CreateWorld" component={CreateWorld} options={{ headerShown: false }} />
        <Stack.Screen name="SelectWorld" component={SelectWorld} options={{ headerShown: false }} />
      </Stack.Navigator> */}
      <Stack.Navigator initialRouteName="CreateWorld">
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorldMap"
          component={WorldMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhotoAlbum"
          component={PhotoAlbum}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreateWorld"
          component={CreateWorld}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectWorld"
          component={SelectWorld}
          options={{ headerShown: false }}
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