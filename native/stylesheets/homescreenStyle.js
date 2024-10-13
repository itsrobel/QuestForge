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
  statsContainer: {
    position: 'absolute',
    top: 20, // Position from the top
    right: 20, // Align to the right
    backgroundColor: 'rgba(15, 13, 51, 1)', // Set background color to red
    padding: 10, // Padding for the red container
    borderRadius: 10, // Optional rounded corners
  },
  statBox: {
    backgroundColor: 'rgba(221, 245, 253, 0.88)', // Green background for each stat box
    padding: 10,
    marginVertical: 10, // Increased vertical space between boxes
    borderRadius: 5, // Optional rounded corners for boxes
    width: 200, // Width of each stat box
  },
  statLabel: {
    color: 'rgba(60, 73, 143, 1)',
    fontSize: 18,
  },
  healthBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Space between bars
  },
  healthBar: {
    height: 20, // Height of the bar
    backgroundColor: 'green', // Default color, can be overridden by the component
    borderRadius: 5,
    marginRight: 10, // Space between bar and text
    flex: 1, // Allows the bar to take remaining space
  },
  healthBarText: {
    color: 'rgba(60, 73, 143, 1)',
    fontSize: 14,
  },
  leftBox: {
    position: 'absolute',
    top: 150,
    left: 45,
    width: '77%', // 2/3 of the screen width
    height: '100%', // Full height of the screen
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Set background color with 30% opacity
    padding: 10, // Padding inside the box
    borderTopLeftRadius: 40, // Round top left corner
    borderTopRightRadius: 40,
    // justifyContent: 'flex-end', // Align children to the bottom
    // alignItems: 'center', // Center children horizontally
    // paddingBottom: 20,
  },
//   uploadButtonContainer: {
//     alignItems: 'center', // Center align the button
//     justifyContent: 'center',
//     position: 'relative', // Change from 'absolute' to 'relative' to keep it in the flow of 'leftBox'
//     marginBottom: 20, // Add margin to position above the bottom
//   },
});