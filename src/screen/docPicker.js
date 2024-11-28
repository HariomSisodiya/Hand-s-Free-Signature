import {View, Button, TextInput, Text} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker, {types} from 'react-native-document-picker';

const DocPicker = () => {
  const [filepath, setFilePath] = useState('');
  const handleDocSelection = async () => {
    try {
      const respone = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
        // allowMultiSelection: false,
      });
      console.log('Response : ', respone);
      setFilePath(respone[0]?.name);
    } catch (error) {
      console.log('ERROR in pick file : ', error);
    }
  };
  console.log('File Path : ', filepath);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Pick Document" onPress={handleDocSelection} />
      <Text>{filepath}</Text>
    </View>
  );
};

export default DocPicker;
