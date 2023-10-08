import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const RadioButton = ({label, isSelected, onPress}) => (
  <TouchableOpacity
    style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}
    onPress={onPress}>
    <View
      style={{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isSelected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#000',
          }}
        />
      ) : null}
    </View>
    <Text style={{marginLeft: 10, color: 'gray', fontSize: 12}}>{label}</Text>
  </TouchableOpacity>
);

export default RadioButton;
