import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const MyButton = ({title, onPress, isLoading}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    backgroundColor: '#3F6EEC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    margin: 15,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
});
