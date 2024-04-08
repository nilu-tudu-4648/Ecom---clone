import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import ReduxWrapper from '../../utils/ReduxWrapper';

import AsyncStorage from '@react-native-async-storage/async-storage'
function Welcome({loginUser$,navigation}) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();    
    function onAuthStateChanged(user) { 
      const getuser = AsyncStorage.getItem('user')
      console.log({getuser})
      setUser(user);
      if(user){
        loginUser$(user)
        //navigation.navigate("Home")
      }else{
        navigation.navigate("Login")
      }
      if (initializing) setInitializing(false);
    }
useEffect(()=>{
  onAuthStateChanged()
},[])
  
    if (initializing) return null; 


    return (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Text>Welcome to Amusoftech</Text>
        </View>
    )
}

export default ReduxWrapper(Welcome)