import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

const raidImage = require('../assets/Controller icon.png'); // Replace with your actual image path
const knowImage = require('../assets/books_icon.png'); // Replace with your actual image path
const charImage = require('../assets/Drama Masks from Figma.png'); // Replace with your actual image path
const creativityImage = require('../assets/Star icon.png'); // Replace with your actual image path
const athlImage = require('../assets/dumbell_icon.png');
const photImage = require('../assets/Camera icon.png');
// Sample data for the table
const tableData = [
  { id: '1', name: 'Go to the hub fair', type: 'charisma', status: 'current'},
  { id: '2', name: 'Walk to Mary Gates', type: 'charisma', status: 'past' },
  { id: '3', name: 'Study at the library', type: 'knowledge', status: 'past' },
  { id: '4', name: 'Go to the hub career fair', type: 'creativity', status: 'past' },
  { id: '5', name: 'Workout at IMA', type: 'athletics', status: 'past' },
  { id: '6', name: 'Compete against a raid', type: 'raid', status: 'past' },
];

const TrackStory = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHead}>
            <Text style={[styles.imageCell, styles.headerCell]}></Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Experience Type</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Event Name</Text>
            <Text style={[styles.imageCell, styles.headerCell]}></Text>
          </View>
  
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
                {row.type === 'charisma' && <Image source={charImage} style={styles.image} />}
                {row.type === 'knowledge' && <Image source={knowImage} style={styles.image} />}
                {row.type === 'creativity' && <Image source={creativityImage} style={styles.image} />}
                {row.type === 'raid' && <Image source={raidImage} style={styles.image} />}
                {row.type === 'athletics' && <Image source={athlImage} style={styles.image} />}
              </View>
              <Text style={styles.tableCell}>{row.type}</Text>
              <Text style={styles.tableCell}>{row.name}</Text>
              <View style={styles.imageCell}></View>
            </View>
          
          ))}
        </View>
      </ScrollView>
    );
  };
  

// Styles for the table and cells
const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#312D46',
  },
  tableHead:{
    
    backgroundColor: '#CA9845',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#866630',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom:20,
  },

  tableRow: {
    // backgroundColor: '#CA9845',
  
    flexDirection: 'row',
    borderBottomColor: '#866630',
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40, // Proportional image width
    height: 40, // Proportional image height
    resizeMode: 'contain', // Maintain aspect ratio
  },
  currentRow: {
    backgroundColor: '#E0BB75', // Green for current events
  },
  pastRow: {
    backgroundColor: '#CA9845', // Orange for past events
  },


});

export default TrackStory;
