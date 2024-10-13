import * as React from 'react'
import { View, Image, TouchableOpacity, StatusBar, SafeAreaView, FlatList } from 'react-native'





const PhotoAlbum = ({navigation}) => {
    const photos = [
        { id: '1', uri: '../assets/dumbell_icon.png' }, // Use require directly
        { id: '2', uri: '../assets/Camera icon.png' },
        { id: '3', uri: '../assets/books_icon.png' },
        { id: '4', uri: '../assets/Star icon.png' },
        { id: '5', uri: '../assets/dumbell_icon.png'},
        { id: '6', uri: '../assets/Camera icon.png'},
        { id: '7', uri: '../assets/books_icon.png' }, // Use require directly
        { id: '8', uri: '../assets/Star icon.png' },
        { id: '9', uri: '../assets/dumbell_icon.png' },
        { id: '10', uri: '../assets/Camera icon.png' },
        { id: '7', uri: '../assets/books_icon.png' },
        { id: '11', uri: '../assets/Star icon.png'},
        // Add more photos as needed
    ];
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile') }>
                <Image source={require('../assets/logo.png')} style={styles.image} />
            </TouchableOpacity> 

            


            <SafeAreaView style={styles.testContainer}>
                <FlatList
                data={photos}
                renderItem={({ item }) => <Image source={(item.uri)} style={styles.gridImage} />}
                keyExtractor={item => item.id}
                numColumns={4}
                />

            </SafeAreaView>
            

            



        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#312D46',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',


    },
    logoContainer: {
        width: 400,
        height: 400,
        marginLeft: 203.5,


    },
    image: {
        width: 400,
        height: 200,
        marginTop: 20,
        marginLeft: 203.5,
        marignBottom: 5,
    },
    gridImage: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
        backgroundColor: '#848ECB',
        borderColor: '#3C498F',
        borderWidth: 5,
        borderRaius: 10,
        
    },
    gridContainer: {
        flex: 1,
        flexwrap: 'wrap',
        height: 400,
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        marignBottom: -50,
        justifySelf: 'center',


    },
    testContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        alignSelf: 'center',
    }
}

export default PhotoAlbum