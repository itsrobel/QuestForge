import * as React from 'react-native';
import { View, Text, Button } from 'react-native';
import SelectWorld from './SelectWorld';

const CreateWorld = ({ navigation }) => {
    return (
      <View>
        <Text>CreateWorld Screen</Text>
        <Button
          title="Select World"
          onPress={() => navigation.navigate('SelectWorld')}
        />
      </View>
    );
  };

  export default CreateWorld;