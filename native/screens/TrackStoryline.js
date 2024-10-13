import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';

const raidImage = require('../assets/Controller icon.png'); // Replace with your actual image path
const knowImage = require('../assets/books_icon.png'); // Replace with your actual image path
const charImage = require('../assets/Drama Masks from Figma.png'); // Replace with your actual image path
const creativityImage = require('../assets/Star icon.png'); // Replace with your actual image path
const athlImage = require('../assets/dumbell_icon.png');
const photImage = require('../assets/Camera icon.png');
const logoImage = require('../assets/logo.png');
// Sample data for the table
const tableData = [
  { id: '1', name: 'Go to the hub fair', type: 'Charisma', status: 'current'},
  { id: '2', name: 'Walk to Mary Gates', type: 'Charisma', status: 'past' },
  { id: '3', name: 'Study at the library', type: 'Knowledge', status: 'past' },
  { id: '4', name: 'Go to the hub career fair', type: 'Creativity', status: 'past' },
  { id: '5', name: 'Workout at IMA', type: 'Athletics', status: 'past' },
  { id: '6', name: 'Compete against a raid', type: 'Raid', status: 'past' },
  { id: '1', name: 'Go to the hub fair', type: 'Charisma', status: 'current'},
  { id: '2', name: 'Walk to Mary Gates', type: 'Charisma', status: 'past' },
  { id: '3', name: 'Study at the library', type: 'Knowledge', status: 'past' },
  { id: '4', name: 'Go to the hub career fair', type: 'Creativity', status: 'past' },
  { id: '5', name: 'Workout at IMA', type: 'Athletics', status: 'past' },
  { id: '6', name: 'Compete against a raid', type: 'Raid', status: 'past' },
];


const TrackStory = ({navigation}) => {
  const [loaded, error] = useFonts({
    'Inter_18pt-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
    'JetBrainsMono_18pt-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
  });
    return (
      
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home') }>
        <Image source={logoImage} style={{ width: 500, height: 200, }} />
        
        </TouchableOpacity>


        <View style={styles.tableContainer}>
          {/* Table 
          Header */}
          <View style={styles.tableHead}>
            <Text style={[styles.imageCell, styles.headerCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}></Text>
            <Text style={[styles.tableCell, styles.headerCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>Experience Type</Text>
            <Text style={[styles.tableCell, styles.headerCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>Event Name</Text>
            <Text style={[styles.imageCell, styles.headerCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}></Text>
          </View>
          
          <ScrollView 
            showsVerticalScrollIndicator={true}
            
          >
          {/* Table Rows */}
          {tableData.map((row) => (
            <View key={row.id}
             style={[styles.tableRow, 
                row.status === 'current' && styles.currentRow,
                row.status === 'past' && styles.pastRow,
              ]}
            >
              
              <View style={styles.imageCell}>
                {/* Conditionally render images based on type */}
                {row.type === 'Charisma' && <Image source={charImage} style={styles.image} />}
                {row.type === 'Knowledge' && <Image source={knowImage} style={styles.image} />}
                {row.type === 'Creativity' && <Image source={creativityImage} style={styles.image} />}
                {row.type === 'Raid' && <Image source={raidImage} style={styles.image} />}
                {row.type === 'Athletics' && <Image source={athlImage} style={styles.image} />}
              </View>
              <Text style={[styles.tableCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>{row.type}</Text>
              <Text style={[styles.tableCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}>{row.name}</Text>
              <View style={[styles.imageCell, {fontFamily: 'JetBrainsMono_18pt-Regular'}]}></View>
            </View>
          
          ))}
          </ScrollView>
          </View>
         
        </View>
      
    );
  };
  

// Styles for the table and cells
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#312D46',
  },

  tableRow: {
     backgroundColor: '#CA9845',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#866630',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    color: '#333',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  imageCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40, // Proportional image width
    height: 40, // Proportional image height
    resizeMode: 'contain', // Maintain aspect ratio
  },
});

export default TrackStory;
