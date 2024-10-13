//import React from 'react';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
//import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from './firebaseConfig';
import HomeScreen from './screens/HomeScreen';
import React, { useState } from 'react'; // Add useState here
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'; // Import other necessary components


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('HomeScreen'); // Navigate to Home after login
            })
            .catch((error) => {
                setError(error.message); // Set error message
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
            <Button title="Go to HomeScreen" onPress={() => navigation.navigate('HomeScreen')} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    error: {
        color: 'red',
    },
});

export default Login;

// const firebaseUIConfig = {
//     signInOptions: [
//       GoogleAuthProvider.PROVIDER_ID,
//       { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
//     ],
//     signInFlow: 'popup', 
//     credentialHelper: 'none', 
//     callbacks: { 
//       signInSuccessWithAuthResult: () => {
//         return false; 
//       }
//     }
// }

// export default function Login(props) {
   

//     const auth = getAuth();
 
//      return (
//        <div className='authen-container'>
//          <h1>Login</h1>
//          <p className='login-instructions'>Please Sign In so we can access your worlds!</p>
//          <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
//        </div>
//      )
//  }