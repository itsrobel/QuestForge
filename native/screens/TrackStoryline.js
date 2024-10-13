import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

const raidImage = require('../assets/Controller icon.png'); // Replace with your actual image path
const knowImage = require('../assets/books_icon.png'); // Replace with your actual image path
const charImage = require('../assets/Drama Masks from Figma.png'); // Replace with your actual image path
const creativityImage = require('../assets/Star icon.png'); // Replace with your actual image path

// Sample data for the table
const tableData = [
  { id: '1', name: 'Go to the hub fair', type: 'charisma', status: 'current'},
  { id: '2', name: 'Walk to Mary Gates', type: 'charisma', status: 'past' },
  { id: '3', name: 'Study at the library', type: 'knowledge', status: 'past' },
  { id: '3', name: 'Go to the hub career fair', type: 'creativity', status: 'past' },
];

const TrackStory = () => {
  // Always return JSX from your component
  return (
    <ScrollView style={styles.container}>
         <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.headerCell]}>Event Name</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Experience Type</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Image</Text>
      </View>

      {/* Table Rows */}
      {tableData.map((row) => (
        <View key={row.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{row.type}</Text>
          <Text style={styles.tableCell}>{row.name}</Text>
          <View style={styles.imageCell}>
              {/* Conditionally render images based on type */}
              {row.type === 'charisma' && <Image source={charImage} style={styles.image} />}
              {row.type === 'knowledge' && <Image source={knowImage} style={styles.image} />}
              {row.type === 'creativity' && <Image source={creativityImage} style={styles.image} />}
              {row.type === 'raid' && <Image source={raidImage} style={styles.image} />}
            </View>
        </View>
      ))}
      </View>
    </ScrollView>
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
