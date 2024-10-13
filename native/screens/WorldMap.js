
import * as React from 'react-native';
import { View, TouchableOpacity, Image } from 'react-native';


const logoImage = require('../assets/logo.png');



const WorldMap = ({ navigation }) => {

    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home') }>
                <Image source={logoImage} style={{ width: 500, height: 200, }} />
            </TouchableOpacity>
            

            
        
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#312D46',
    },
    map: {
        flex: 1
    }
}

export default WorldMap;
