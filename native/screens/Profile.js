import * as React from 'react-native';

import { View, Text, Image, TouchableOpacity, Button } from 'react-native';


const ProfileButton = ({title, icon}) => {
    return (
        <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>{title}</Text>
            <Image source={icon} style={styles.buttonImage} />

        </TouchableOpacity>
    )
}

const SpecialStatContainer = ({title, icon}) => {
    return (
        <View style={styles.specialStatContainer}>
            <Text style={styles.statText}>{title}</Text>
            
                <View style={styles.inLineContainer}>
                    <Image source={require('../assets/Yellow star icon.png')} style={styles.statImage}/>
                    <View style={styles.statBar}>
                
                    </View>

                
                </View>

            
        </View>
    )
}

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.entireContainer}>
            
            <Image source={require('../assets/logo.png')} style={styles.image} />
                
                
                <View style={styles.informationContainer}>

                    <View style={styles.profileCard}>
                        <View style={styles.profilePicture}></View>
                        <Text style={styles.userName}>@username</Text>
                        
                        <View style={styles.profileButtons}>
                            <ProfileButton title="Photos" icon="../assets/Camera icon.png" />
                            <ProfileButton title="Friends" icon="../assets/Controller icon.png" />
                        </View>

                        <View style={styles.roundedRectangle}>
                            <SpecialStatContainer title="Health"/>
                            <SpecialStatContainer title="XP"/>

                        </View>

                    </View>
                    <View style={styles.statsContainer}>
                        <ProfileButton title="TEST"/>
                        <ProfileButton title="TEST"/>
                        <ProfileButton title="TEST"/>
                        <ProfileButton title="TEST"/>
                
                    </View>

                </View>
                
                

            </View> 
            
            
        </View> // container
    )
}






const styles = {
    image: {
        flex: 2,
        width: 500,
        height: 500,
        resizeMode: 'cover',
        marginLeft: -80,
        marginTop: -50,
        padding: 20,
        marginBottom: -40,
        marginBottom: -50,
        flexShrink: 0,
    },
    container: {
        flex: 1,
        // flexBasis: '50%',
        width: '140%',
        backgroundColor: '#312D46',
        justifyContent: 'between',
        flexDirection: 'column',
        // justifyContent: 'center',
        marginLeft: -200,

        alignItems: 'center',

        
    },
    profileCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor:'#848ECB',
        width: '30%',
        height: '100%',
        // marginRight: '1em',
        borderRadius: 20,
        borderWidth: 4,
        borderColor:'#3C498F',
        paddingBottom:20
    },
    testButton: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        
    },
    profileButtons: {
        // flex: 0,
        flexShrink: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginRight: 20,
        marginLeft: 20,
        marginRight: 20,
        
        
    },
    profileButton: {
        marginRight: 20,
        marginLeft: 20,
        flex: 1,
        color: '#C8DDE7',

    

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3C498F',
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        padding: 20,

        borderRadius: 12,
    },
    buttonImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    profileButtonText: {
        color: '#C8DDE7',
        fontSize: 25,
    },
    roundedRectangle: {
        // width: 400,
        flex: 3,
        justifyContent: 'center',

        width: '80%',
        height: '100%',
        // height: 00,
        marginTop: 40,
        // padding: 10,
        backgroundColor: '#312D46',
        borderRadius: 12,
    },
    informationContainer: {
        flex: 4.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
        width: '100%',
        // height: '1000',
        backgroundColor: 'green',
        marginBottom: 50,
        

    },
    spaceContainer: {
        flex: 1,
        backgroundColor: '#848ECB',
        margin: 20,
    },
    statsContainer: {
        flex: 1,
        width: 10,
        flexDirection: 'column',
        flex: 1,

    },
    entireContainer: {
        // flex: 1,
        width: '50%',
        height: '100%',
        marginRight: 100,
        // justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'auto',
        backgroundColor: 'red',
    },
    specialStatContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
    
    },
    statText: {
        flex: 1,
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 50,
        // marignRight: 100,
        marginTop: 20,
        marginBottom: -50,
        color: '#6976C3',
    },
    statBar: {
        
        backgroundColor: '#D9D9D9',
        borderColor: '#B6B2CB',
        borderWidth: 5,
        borderRadius: 20,
        width: 250,
        height: 50,
    },
    inLineContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    statImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginLeft: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        backgroundColor: '#6976C3',
        borderRadius: 50,
        marginTop: 10,
    },

    
}

export default Profile;
