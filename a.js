import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SimpleSDK from './api/SimpleSDK'; // Adjust the path as needed
import RaptorX from 'raptorx-react-native-sd'

const App = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '9a60f01e9b7d2d5d37a1b134241311fd7dfdbc38';
      const simpleSDK = new RaptorX(apiKey);
      
      try {
        const data = await simpleSDK.createSession();
        // console.log('API response:', data);
        const initDeviceData = await simpleSDK.initSensorsData();
        console.log('APP.js response:', initDeviceData);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>App</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Add UI elements to display or interact with API response data (if needed) */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
