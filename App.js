
import RaptorX from 'raptorx-react-native-sd'

import React ,{useEffect,useState}from 'react';
import MainStack from './app/routing/MainStack';
import {Provider} from 'react-redux';
import {StatusBar,StyleSheet} from 'react-native';
import storePre from './app/redux/store';
import DropdownAlert from 'react-native-dropdownalert';
import {AlertHelper} from './app/utils/AlertHelper';
import {PersistGate} from 'redux-persist/integration/react';
import TabNavigationStack from './app/routing/TabNavigationStack';
import {navigationTypeTabs} from './app.json';
import Feather from 'react-native-vector-icons/Feather'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 

MaterialIcons.loadFont()
Ionicons.loadFont()
FontAwesome.loadFont()
Feather.loadFont()
MaterialCommunityIcons.loadFont()
const apiKey = '9a60f01e9b7d2d5d37a1b134241311fd7dfdbc38';
export const simpleSDK = new RaptorX(apiKey);
const App= () => {
  const {persistor, store} = storePre;
 
  

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* navigationTypeTabs ? <TabNavigationStack/> : <MainStack /> */} 
      <MainStack />
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          paddingTop: StatusBar.currentHeight,
          flexDirection: 'row',
        }}
        ref={(ref) => AlertHelper.setDropDown(ref)}
        onClose={() => AlertHelper.invokeOnClose()}
      />
    </PersistGate>
  </Provider>
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
