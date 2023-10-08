import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>
        We're working hard to bring this to you soon. Stay tuned!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
});

export default ComingSoon;
