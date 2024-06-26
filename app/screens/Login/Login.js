import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet, // Assuming you have StyleSheet imported for styles
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import {AlertHelper} from '../../utils/AlertHelper';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import writeData from '../../utils/writeData'; // Assuming writeData function is defined
import ReduxWrapper from '../../utils/ReduxWrapper';
import { simpleSDK } from '../../../App';

function Login({ getProductsList$, loginUser$, navigation }) {
  const [credentials, setCredentials] = useState({
    email: 'n@gmail.com',
    password: '123',
  });
  const [isloading, setisloading] = useState(false);

  const onLogin = async () => {
    const { email, password } = credentials;

    try {
      if (email && password) {
        setisloading(true);
        loginUser$({ email: email, name: 'Test user', uid: '123' }); // Assuming loginUser$ dispatches an action
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({ email: email, name: 'Test user', uid: '123' }),
        );
        await fetchData(email);
        getProductsList$(); // Assuming getProductsList$ dispatches an action
        AlertHelper.show('success', 'Welcome to Amusoftech');
      } else {
        setisloading(false);
        AlertHelper.show('error', 'Email and password is required!!');
      }
    } catch (error) {
      AlertHelper.show('error', 'Something went wrong');
    }
  };

  const fetchData = async (userID) => {
    try {
      await simpleSDK.createSession(userID);
      await simpleSDK.initDeviceData();
      await simpleSDK.navigationCapture();
      await simpleSDK.initSensorsData();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const onChangeText = (name, text) => {
    setCredentials({ ...credentials, [name]: text });
  };

  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: scale(50),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5)
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text="Welcome,"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Label
              text="Sign Up"
              style={{
                fontSize: scale(14),
                fontWeight: '500',
                color: appColors.primary,
              }}
            />
          </Pressable>
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={text => onChangeText('email', text)}
            keyboardType="email-address"
            label="Email"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={text => onChangeText('password', text)}
            secureTextEntry
            label="Password"
            placeholder="Password"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('Verification')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: scale(10),
          }}>
          <Label
            text="Forgot password"
            style={{
              fontSize: scale(14),
              // fontWeight: '500',
            }}
          />
        </Pressable>
        <CustomButton isLoading={isloading} onPress={onLogin} label="Sign in" />
      </View>
   </Container>
  );
}

export default ReduxWrapper(Login);
