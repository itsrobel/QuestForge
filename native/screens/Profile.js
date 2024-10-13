import * as React from 'react-native';

import { View, Text, Image, TouchableOpacity, Button,  FlatList} from 'react-native';


// import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts } from 'expo-font';




const ProfileButton = ({title, icon, navigation}) => {
    return (
        <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('PhotoAlbum')}
        >
            <Text style={styles.profileButtonText}>{title}</Text>
            <Image source={icon} style={styles.buttonImage} />

        </TouchableOpacity>
    )
}

 // HealthBar component
 const HealthBar = ({ current, max, title }) => {

    const image = title === 'athletics'
        ? require('../assets/dumbell_icon.png')
        : title === 'creativity'
        ? require('../assets/Star icon.png')
        : title === 'knowledge'
        ? require('../assets/books_icon.png')
        : require('../assets/Drama Masks from Figma.png');

    const width = (current/max === 1) ? 200 : 
                  (current/max === 0.75) ? 150 : 
                  (current/max === 0.5) ? 100 : 
                  (current/max === 0.25) ? 50 : 0;

    
    

    return (
        <View style={{flex:1, flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center'}}>
        <View style={styles.healthBarContainer}>
            <Text style={styles.statLabel}>{title.charAt(0).toUpperCase() + title.slice(1)}:</Text>
            <View style={[styles.healthBar, { width: width }]} /> 
            {/* width: `${percentage}%`  */}
            <Text style={styles.healthBarText}>{`${current} / ${max}`}</Text>
            
        </View>
            <Image source={image} style={{marginRight: 20, width: 90, height: 90, resizeMode:'contain'}}/>
        </View>
    );
};

const specialStats = {
    health: { current: 100, max: 100 },
    xp: { current: 50, max: 100 },
};

const SpecialStatContainer = ({title, width}) => {

    const widthActual = (width === 100) ? 300 : 
                  (width === 75) ? 150 : 
                  (width === 50) ? 100 : 
                  (width === 25) ? 50 : 0;
    
    return (
        <View style={styles.specialStatContainer}>
            <Text style={styles.statText}>{title}</Text>

                
            
                <View style={styles.inLineContainer}>
                    <Image source={require('../assets/Yellow star icon.png')} style={styles.statImage}/>
                    <View style={[styles.statBar, {width: widthActual}]}>
                
                </View>

                
                </View>

            
        </View>
    )
}

const Profile = ({ navigation }) => {
    const [loaded, error] = useFonts({
        'Inter_18pt-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
        'JetBrainsMono_18pt-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            console.log('Fonts loaded');
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        console.log('Fonts not loaded');
    }
    
    // Stat values
    const stats = {
        athletics: { current: 100, max: 100, icon: '../assets/dumbell_icon.png' },
        creativity: { current: 75, max: 100, icon: '../assets/dumbell_icon.png'  },
        knowledge: { current: 50, max: 100, icon: '../assets/dumbell_icon.png'  },
        charisma: { current: 25, max: 100, icon: '../assets/dumbell_icon.png'  },
    };

    const logoImage = require('../assets/logo.png');

    return (
        <View style={styles.container}>
            

            <View style={styles.entireContainer}>

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image source={logoImage} style={{alignSelf: 'flex-start', width: 500, height: 200,}} />
            </TouchableOpacity>
            
            
                
                
                <View style={styles.informationContainer}>

                    <View style={styles.profileCard}>
                        <View style={[styles.profilePicture, {flex: 1, alignItems:'center', justifyContent: 'center', padding: 40}]}>
                            {/* <Image source={require('../assets/Controller icon.png')} style={{width: 75, height: 75, padding:10}} /> */}
                        </View>
                        <Text style={styles.userName}>@adaLovelace</Text>
                        
                        <View style={styles.profileButtons}>
                            <ProfileButton title="Photos" icon="../assets/Camera icon.png" navigation={navigation}/>
                            <ProfileButton title="Friends" icon="../assets/Controller icon.png" />
                        </View>

                        <View style={styles.roundedRectangle}>
                            <SpecialStatContainer title="Health" width={specialStats.health.current}/>
                            <SpecialStatContainer title="XP" width={specialStats.xp.current}/>

                        </View>

                    </View>
                    {/* <View style={styles.statsContainer}>
                        <HealthBar title="TEST"/>
                        <HealthBar title="TEST"/>
                        <HealthBar title="TEST"/>
                        <HealthBar current={50} max={100} />
                
                    </View> */}
                    <View style={styles.spaceContainer}></View>
                    
                        {/* <View style={styles.statsContainer}>

                            {Object.entries(stats).map(([key, value]) => (
                                <View style={styles.statBox} key={key}>
                                    <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                                    <HealthBar current={value.current} max={value.max} />
                                    
                                </View>
                            ))}
                            

                        </View> */}
                        <View style={styles.statsContainer}>

                        </View>

                    

                </View>
                
                

            </View> 
            
            
        </View> // container
    );
}






const styles = {
    logoContainer: {
        flex: 2,
        backgroundColor: 'red',

    },
    image: {
        flex: 2,
        width: 400,
        height: 400,
        resizeMode: 'cover',
        marginLeft: -80,
        marginTop: 50,
        paddingBottom: 50,
        paddingTop: 80,
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
        flex: 2,
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
    userName: {
        fontSize: 20,
        fontFamily: 'JetBrainsMono_18pt-Regular',
        color: '#312D46'

    },
    buttonImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    profileButtonText: {
        color: '#C8DDE7',
        fontSize: 25,
        fontFamily: 'JetBrainsMono_18pt-Regular'
    },
    roundedRectangle: {
        // width: 400,
        flex: 3,
        justifyContent: 'space-between',

        width: '80%',
        height: '110%',
        // height: 00,
        // marginTop: 20,
        padding: 25,
        backgroundColor: '#312D46',
        borderRadius: 12,
    },
    informationContainer: {
        flex: 4.5,
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 20,
        width: '100%',
        // height: '1000',
        marginBottom: 50,
        backgroundColor: 'green'
        

    },
    spaceContainer: {
        flex: .5,
        backgroundColor: '#848ECB',
        margin: 20,
    },
    entireContainer: {
        // flex: 1,
        width: '50%',
        height: '100%',
        marginRight: 100,
        // justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'auto',
    },
    specialStatContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

    
    },
    statText: {
        flex: 1,
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 30,
        marginRight: -20,
        marginTop: 20,
        marginBottom: 30,
        color: '#B6B2CB',
        fontFamily: 'JetBrainsMono_18pt-Regular',
        
    },

    statBar: {
        flex:1.5,
        
        backgroundColor: '#B6B2CB',
        borderColor: '#D9D9D9',
        borderWidth: 5,
        borderRadius: 20,
        height: 50,
        marginRight: 20,
        
        
    },
    inLineContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -50,
        justifyContent: 'space-between',
        marginRight: -20,
    },
    statImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        
    },
    profilePicture: {
        width: 150,
        height: 150,
        backgroundColor: '#6976C3',
        borderRadius: 75,
        marginTop: 10,
    },
    statsContainer: {
        flex: 1,
        backgroundColor: 'red',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        marginRight: 20,
        
        // position: 'absolute',
        // top: 20, // Position from the top
        // right: 20, // Align to the right
        // backgroundColor: 'rgba(15, 13, 51, 1)', // Set background color to red
        // padding: 10, // Padding for the red container
        // borderRadius: 10, // Optional rounded corners
        
      },
      statBox: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#DDF5FD', // Green background for each stat box
        width: '100%', // Width of each stat box
        // padding: 16,
        paddingTop: 16,
        paddingHorizontal: 5, // Horizontal padding
        marginVertical: 10, // Increased vertical space between boxes
        borderRadius: 20, // Optional rounded corners for boxes
        // width: 200, // Width of each stat box
      },
      statLabel: {
        color: 'rgba(60, 73, 143, 1)',
        fontSize: 18,
        marginBottom: 5,
        fontFamily: "JetBrainsMono_18pt-Regular",
      },
      healthBarContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 5, // Space between bars
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      healthBar: {
        height: 20, // Height of the bar
        backgroundColor: 'rgba(57, 52, 70, 1)', // Bar color
        borderRadius: 5,
        marginRight: 5, // Space between bar and text
        // flex: 1, // Allows the bar to take remaining space
        // marginLeft: -80,
       
      },
      healthBarText: {
        color: 'rgba(60, 73, 143, 1)',
        fontSize: 13,
        marginBottom: 5,
        marginRight: 20,
        fontFamily: 'JetBrainsMono_18pt-Regular',
      },
      importedStatsContainer: {
        position: 'absolute',
        top: 20, // Position from the top
        right: 20, // Align to the right
        backgroundColor: 'rgba(15, 13, 51, 1)', // Set background color to red
        padding: 10, // Padding for the red container
        borderRadius: 10, // Optional rounded corners
      },
      contStatBar:{
        height: 44,
        width: 276,
        marginRight: 10, // Space between bar and text
        marginLeft: -80,
        backgroundColor: '#D9D9D9',
        borderColor: '#393446',
        borderWidth: 5,
        borderRadius: 15,
      },

    
}

export default Profile;
