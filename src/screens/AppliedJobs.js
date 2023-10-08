import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import JobCard from '../component/JobCard';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';

const AppliedJobs = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 5,
          marginHorizontal: 25,
        }}>
        <Searchbar
          autoFocus={true}
          placeholder="Search your application..."
          placeholderTextColor={'#777777'}
          iconColor="#777777"
          inputStyle={styles.searchTxt}
          cursorColor={'#777777'}
          style={styles.search}
        />
        <TouchableOpacity style={styles.home}>
          <Image
            style={{height: 25, width: 25, resizeMode: 'contain'}}
            source={require('../assets/align.png')}
          />
        </TouchableOpacity>
      </View>
      <JobCard
        title={'Senior UI/UX Designer'}
        salary={'$10k/month'}
        location={'Mumbai, India'}
        applied={'applied'}
        time={'24 h'}
      />
      <JobCard
        title={'Senior UI/UX Designer'}
        salary={'$10k/month'}
        location={'Mumbai, India'}
        applied={'applied'}
        time={'24 h'}
      />
      <JobCard
        title={'Senior UI/UX Designer'}
        salary={'$10k/month'}
        location={'Mumbai, India'}
        applied={'applied'}
        time={'24 h'}
      />
      <JobCard
        title={'Senior UI/UX Designer'}
        salary={'$10k/month'}
        location={'Mumbai, India'}
        applied={'applied'}
        time={'24 h'}
      />
    </ScrollView>
  );
};
export default AppliedJobs;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  home: {
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: '#3F6EEC',
    justifyContent: 'center',
    height: 50,
    width: '15%',
    alignItems: 'center',
  },
  search: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#767E8F1A',
    fontSize: 40,
  },
  searchTxt: {
    fontSize: 12,
    fontFamily: 'MartelSans-SemiBold',
    color: '#777777',
  },
});
