import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1, // Ensure the view takes up the full screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 13, 51, 1)', // Set the background color
    },
    topButtonContainer: {
        position: 'absolute', // Use absolute positioning
        top: 170, // Adjust this value to move it closer to the top (e.g., 0 for very top)
        flexDirection: 'row', // Align buttons horizontally
        justifyContent: 'space-between', // Add space between the buttons
        width: '70%', // Control the width of the container
    },
    buttonContainer: {
        //backgroundColor: 'rgba(224, 187, 117, 1)', // Button background color
        borderRadius: 5,
        padding: 10,
        width: '45%', // Each button takes 45% of the available width
        alignItems: 'center', // Center the text inside the button
        paddingVertical: 20,
        width: '40%'
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 1)', // Text color
        textAlign: 'center', // Align text in the center
        fontSize: 22,
    },
});