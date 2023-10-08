import {StyleSheet, ScrollView, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import JobCard from '../component/JobCard';
import MainHeader from '../component/MainHeader';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';

const CategoryDetails = ({route, navigation}) => {
  const jobType = route?.params?.jobType;
  const jobCategory = route?.params?.jobCategory;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchJobCategoriesByType = async (jobType, jobCategory) => {
    try {
      setLoading(true);
      const url = `https://ill-pear-basket-clam-tie.cyclic.cloud/jobsByCategory/${jobType}/${jobCategory}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setJobs(response.data);
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        Alert.alert(
          'Error',
          'Failed to fetch jobs. Unexpected server response.',
        );
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      Alert.alert(
        'Error',
        'Failed to fetch jobs. Please check your internet connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobCategoriesByType(jobType, jobCategory);
  }, []);
  return (
    <View style={styles.container}>
      <LoadingModal isVisible={loading} />
      <MainHeader title={route?.params?.title} />

      <FlatList
        data={jobs}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        keyExtractor={(item, index) => index.toString()}
        // numColumns={2}
        renderItem={({item, index}) => {
          return (
            <JobCard
              onPress={() =>
                navigation.navigate('JobDetails', {
                  jobId: item?.id,
                })
              }
              company={item?.job_type}
              title={item?.job_category}
              salary={`$${item.salary}k/month`}
              location={item?.complete_address}
              time={item?.posting_date}
            />
          );
        }}
      />
    </View>
  );
};
export default CategoryDetails;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});
