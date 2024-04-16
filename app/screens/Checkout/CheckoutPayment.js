import React, { useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { appColors } from '../../utils/appColors';
import { paymentMethods } from '../../utils/MockData';
import CustomInput from '../../components/CustomInput';
import CheckBox from '../../components/CheckBox';
import Label from '../../components/Label';
import { getElementInfo } from '../../utils/useListner'; // Import the getElementInfo function
import { simpleSDK } from '../../../App';

export default function CheckoutPayment() {
  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCardDetails, setSaveCardDetails] = useState(false);

  const handleInputChange =async (elementId, value) => {
    // Call the getElementInfo function and do something with the result
    const elementInfo =await simpleSDK.formCapture(elementId, value);
    console.log('Element Info:', elementInfo);
  };

  const handleChangeNameOnCard = (text) => {
    setNameOnCard(text);
    handleInputChange('nameOnCard', text);
  };

  const handleChangeCardNumber = (text) => {
    setCardNumber(text);
    handleInputChange('cardNumber', text);
  };

  const handleChangeExpiryDate = (text) => {
    setExpiryDate(text);
    handleInputChange('expiryDate', text);
  };

  const handleChangeCvv = (text) => {
    setCvv(text);
    handleInputChange('cvv', text);
  };

  const handleChangeSaveCardDetails = () => {
    setSaveCardDetails(!saveCardDetails);
  };

  const SquareCard = ({ item }) => {
    return (
      <Pressable onPress={() => setSelectedMethod(item)} style={{ width: scale(100), height: scale(80), backgroundColor: selectedMethod === item ? appColors.primary : appColors.white, borderRadius: scale(5), justifyContent: 'center', alignItems: 'center' }}>
        <Feather name={item} size={scale(25)} color={selectedMethod === item ? appColors.white : appColors.gray} />
      </Pressable>
    );
  };

  return (
    <View style={{ paddingVertical: scale(10) }}>
      <View style={{ flexDirection: 'row' }}>
        <FlatList showsHorizontalScrollIndicator={false} ItemSeparatorComponent={() => <View style={{ padding: scale(5) }} />} horizontal data={paymentMethods} renderItem={({ item, index }) => <SquareCard item={item} />} />
      </View>
      <View style={{ paddingVertical: scale(10) }}>
        <CustomInput containerStyle={{ backgroundColor: 'transparent' }} value={nameOnCard} onChangeText={handleChangeNameOnCard} label="Name on card" />
      </View>
      <View style={{ paddingVertical: scale(10) }}>
        <CustomInput containerStyle={{ backgroundColor: 'transparent' }} value={cardNumber} onChangeText={handleChangeCardNumber} label="Card number" IconRight={() => <Feather name="credit-card" color={appColors.primary} size={scale(20)} />} />
      </View>
      <View style={{ paddingVertical: scale(10) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomInput containerStyle={{ backgroundColor: 'transparent' }} value={expiryDate} onChangeText={handleChangeExpiryDate} label="Expiry Date" />
          <CustomInput containerStyle={{ backgroundColor: 'transparent' }} value={cvv} onChangeText={handleChangeCvv} label="CVV" />
        </View>
      </View>
      <View style={{ paddingVertical: scale(10), flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox isChecked={saveCardDetails} onPress={handleChangeSaveCardDetails} />
        <View style={{ paddingLeft: scale(10) }}>
          <Label text="Save this card details" style={{ fontSize: scale(15) }} />
        </View>
      </View>
    </View>
  );
}
