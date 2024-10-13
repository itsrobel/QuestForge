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
    inputContainer: {
        marginTop: 20, // Space above the input
        width: '45%', // Adjust width as necessary
        top: -70
    },
    label: {
        fontSize: 18, // Size for the label
        color: '#fff', // Label color
        marginBottom: 5, // Space below the label
    },
    textInput: {
        height: 40, // Height of the input box
        //borderColor: 'gray', // Border color
        borderWidth: 1, // Border thickness
        borderRadius: 5, // Rounded corners
        paddingHorizontal: 10, // Padding inside the input
        backgroundColor: 'rgba(134, 102, 48, 1)', // Input background color
    },
    textInputSmall: {
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(134, 102, 48, 1)',
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: 'rgba(134, 102, 48, 1)',
    },
    addButton: {
        backgroundColor: 'rgba(224, 187, 117, 1)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'rgba(3, 4, 61, 1)',
        fontSize: 16,
    },
    usernamesContainer: {
        marginTop: -20,
        width: '60%', // Adjust as needed
        alignItems: 'flex-start', // Align text to the start
    },
    usernamesRow: {
        flexDirection: 'row', // Align usernames horizontally
        flexWrap: 'wrap', // Allow wrapping to next line if necessary
    },
    usernameText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 10,
    },
    createWorldButtonContainer: {
        position: 'absolute', // Absolute positioning to place at the bottom
        bottom: 20, // Adjust this value to change vertical positioning
        width: '100%', // Full width
        alignItems: 'center', // Center the button
    },
    createWorldButton: {
        backgroundColor: 'rgba(191, 166, 125, 1)', // Button color
        paddingVertical: 15, // Vertical padding
        paddingHorizontal: 30, // Horizontal padding
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Center text
    },
    createWorldButtonText: {
        color: 'white', // Text color
        fontSize: 18, // Text size
        fontWeight: 'bold', // Bold text
    },
});