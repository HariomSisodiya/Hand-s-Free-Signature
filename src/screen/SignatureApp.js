import React, {useRef, useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import FS from 'react-native-fs';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SignatureApp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const signatureRef = useRef();

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleSave = () => {
    signatureRef.current?.readSignature();
  };
  const handleUndo = () => {
    signatureRef.current?.undo();
  };

  const handleRedo = () => {
    signatureRef.current?.redo();
  };

  const handleOK = signature => {
    console.log(signature);
    const path = FS.DownloadDirectoryPath + '/signature.png';

    const base64Data = signature.replace('data:image/png;base64', '');

    FS.writeFile(path, base64Data, 'base64')
      .then(() => {
        Alert.alert('Success', 'Signature Saved Successfully');
      })
      .catch(err => {
        console.log('ERROR in Signature : ', err);
        Alert.alert('Error', 'Failed to Save Signature');
      });
  };

  // const readFile = () => {
  //   const getPath = FS.CachesDirectoryPath + '/signature.png';
  //   FS.readFile(getPath, 'base64')
  //     .then(res => {
  //       console.log('File Name : ', res);
  //       console.log('File Read Successfully');
  //     })
  //     .catch(err => {
  //       console.log('ERROR in read File : ', err);
  //     });
  // };

  const hideFooterBtn = `
    .m-signature-pad--footer {display: none; margin: 0px;}
    .m-signature-pad {height: ${height * 0.7 - 50}px;}
  `;

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Open Signature Modal"
        onPress={() => setIsModalVisible(true)}
      />
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Hands-free Signature</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}>
                  <Text>C</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.signatureContainer}>
                <SignatureScreen
                  ref={signatureRef}
                  onOK={handleOK}
                  webStyle={hideFooterBtn}
                />
                <View style={styles.separator} />
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleUndo} style={styles.iconBtn}>
                  <Text>Undo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRedo} style={styles.iconBtn}>
                  <Text>Redo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClear} style={styles.iconBtn}>
                  <Text>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'stretch',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    width: width * 0.92,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    // borderWidth: 1,
    // width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    // padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  signatureContainer: {
    height: height * 0.7,
    marginVertical: 8,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 25,
    backgroundColor: '#007AFF',
  },
  iconBtn: {
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    // borderWidth: 1,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    width: '100%',
    marginBottom: 15,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default SignatureApp;
