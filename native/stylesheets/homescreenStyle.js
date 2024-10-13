import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, // Ensure the view takes up the full screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 13, 51, 1)', // Set the background color
  },
  title: {
    fontSize: 24,
    color: '#fff', // Set text color to white for better contrast
  },
  buttonContainer: {
    backgroundColor: 'rgba(224, 187, 117, 1)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10, // Space between buttons
    width: 150, // Set a width for consistent button size
    alignItems: 'center', // Center align button text
  },
  fileButton: {
    backgroundColor: 'rgba(224, 187, 117, 1)', // Button background color
    borderRadius: 5,
    padding: 10,
    marginLeft: 10, // Space between the file button and the rest
    alignItems: 'center', // Center align button text
    width: 200, // You can adjust this width
  },
});