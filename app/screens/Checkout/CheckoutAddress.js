import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import CheckBox from '../../components/CheckBox';
import Label from '../../components/Label';
import CustomInput from '../../components/CustomInput';
import  {getElementInfo}  from '../../utils/useListner'; // Import the getElementInfo function

export default function CheckoutAddress() {
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Punjab');
  const [country, setCountry] = useState('India');

  const handleInputChange = (elementId, value) => {
    // Call the getElementInfo function and do something with the result
    const elementInfo = getElementInfo(elementId, value);
    console.log('Element Info:', elementInfo);
  };

  return (
    <View style={{ paddingVertical: scale(30) }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <CheckBox isChecked={true} />
        <View style={{ paddingLeft: scale(1) }}>
          <Label text="Billing address is the same as delivery address" style={{ fontSize: scale(15) }} />
        </View>
      </View>

      <View style={{ paddingVertical: scale(1) }}>
        <CustomInput
          containerStyle={{ backgroundColor: 'transparent' }}
          value={street1}
          onChangeText={(value) => { setStreet1(value); handleInputChange('#street1', value); }}
          label="Street 1"
        />
      </View>
      <View style={{ paddingVertical: scale(1) }}>
        <CustomInput
          containerStyle={{ backgroundColor: 'transparent' }}
          value={street2}
          onChangeText={(value) => { setStreet2(value); handleInputChange('#street2', value); }}
          label="Street 2"
        />
      </View>

      <View style={{ paddingVertical: scale(1) }}>
        <CustomInput
          containerStyle={{ backgroundColor: 'transparent' }}
          value={city}
          onChangeText={(value) => { setCity(value); handleInputChange('#city', value); }}
          label="City"
        />
      </View>

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomInput
            containerStyle={{ backgroundColor: 'transparent' }}
            value={state}
            onChangeText={(value) => { setState(value); handleInputChange('#state', value); }}
            label="State"
          />
          <CustomInput
            containerStyle={{ backgroundColor: 'transparent' }}
            value={country}
            onChangeText={(value) => { setCountry(value); handleInputChange('#country', value); }}
            label="Country"
          />
        </View>
      </View>
    </View>
  );
}
