import * as React from 'react-native';
import { View, Text, Button } from 'react-native';
import CreateWorld from './CreateWorld';

const SelectWorld = ({ navigation }) => {
    return (
      <View>
        <Text>SelectWorld Screen</Text>
        <Button
          title="Create World"
          onPress={() => navigation.navigate('CreateWorld')}
        />
      </View>
    );
  };

  export default SelectWorld;