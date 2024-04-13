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
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NativeModules } from 'react-native';

const { GPUModule } = NativeModules;

const App = () => {
  const [gpuInfo, setGpuInfo] = useState(null);

  useEffect(() => {
    GPUModule.getGPUDetails((error, info) => {
      if (error) {
        console.error(error.message);
      } else {
        setGpuInfo(info);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {gpuInfo ? (
        <>
          <Text>GPU Vendor: {gpuInfo.vendor}</Text>
          <Text>GPU Version: {gpuInfo.version}</Text>
          <Text>GPU Renderer: {gpuInfo.renderer}</Text>
        </>
      ) : (
        <Text>Loading GPU information...</Text>
      )}
      <Button title="Get GPU Details" onPress={() => GPUModule.getGPUDetails()} />
    </View>)
}
export default App