import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingModal = ({isVisible}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default LoadingModal;
