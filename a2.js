import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RaptorX from 'raptorx-react-native-sd';

const Stack = createStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();
  const apiKey = '9a60f01e9b7d2d5d37a1b134241311fd7dfdbc38';
  const simpleSDK = new RaptorX(apiKey, navigation); // Pass navigation object during initialization

  useEffect(() => {
    // Call navigation capture method inside useEffect
    simpleSDK.navigationCapture();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')} title='Go to Details' />
    </View>
  );
};

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
