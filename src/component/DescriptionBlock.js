import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DescriptionBlock = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '90%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  description: {
    fontSize: 16,
  },
});

export default DescriptionBlock;
