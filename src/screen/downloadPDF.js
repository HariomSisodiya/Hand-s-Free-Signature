import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs';

const DownloadPDF = () => {
  const downloadFiles = () => {
    const url =
      'https://dev.wealthelite.in/TaxReport/Abhishek_Singh_Parihar_.pdf';
    const filePath =
      //   RNFS.DownloadDirectoryPath + '/' + `file_${Date.now()}.pdf`;
      RNFS.DownloadDirectoryPath + '/' + `file_1.pdf`;
    const option = {
      fromUrl: url,
      toFile: filePath,
      background: true,
      discretionary: true,
      begin: res => {
        console.log('Download started');
      },
    };
    // console.log('Option : ', option);
    RNFS.downloadFile(option)
      .promise.then(res => {
        console.log('Download Successfully', res);
        Alert.alert('Success', 'Download Complete.');
      })
      .catch(error => {
        console.log('ERROR in download pdf : ', error);
      });
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>DownloadPDF</Text>
      <Button title="Download PDF" onPress={downloadFiles} />
    </View>
  );
};

export default DownloadPDF;
