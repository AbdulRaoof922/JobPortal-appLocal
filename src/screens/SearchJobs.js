import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import JobCard from '../component/JobCard';
import {Searchbar} from 'react-native-paper';
import LoadingModal from '../component/LoadingModal';
import axios from 'axios';
import {useSelector} from 'react-redux';
import useSaveJob from '../component/useSaveJob';

const SearchJobs = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState(null);
  const {saveJob, data} = useSaveJob();

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://ill-pear-basket-clam-tie.cyclic.cloud/getAllJobs',
        {
          userId: user?.user?.id,
          userType: user?.userType == 'Fresher' ? 'freshers' : 'professionals',
        },
      );
      setJobs(response.data);
    } catch (error) {
      setError(error);
      console.error('Error fetching jobs data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  useEffect(() => {
    const results = jobs.filter(job =>
      job.job_category.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredJobs(results);
  }, [query, jobs]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={{flex: 1}}>
      <LoadingModal isVisible={loading} />

      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 5,
            marginHorizontal: 25,
          }}>
          <Searchbar
            placeholder="Search your application..."
            placeholderTextColor={'#777777'}
            iconColor="#777777"
            inputStyle={styles.searchTxt}
            cursorColor={'#777777'}
            style={styles.search}
            onChangeText={setQuery} // Update query when text changes
            value={query} // Set the value of the input to the current query
          />
          {/* <TouchableOpacity style={styles.home}>
            <Image
              style={{height: 25, width: 25, resizeMode: 'contain'}}
              source={require('../assets/align.png')}
            />
          </TouchableOpacity> */}
        </View>
        {filteredJobs.map((item, index) => {
          return (
            <JobCard
              onPressSaveJob={async () => {
                setLoading(true);
                await saveJob(
                  item?.userid,
                  item?.id,
                  user.userType === 'Fresher' ? 'freshers' : 'professionals',
                );
                // Find the index of the item you want to update
                const indexToUpdate = filteredJobs.findIndex(
                  job => job.id === item.id,
                );

                // Create a new array with the updated item
                const updatedJobs = filteredJobs.map((job, index) =>
                  index === indexToUpdate ? {...job, itemSaved: true} : job,
                );

                // Update the state with the new array
                setFilteredJobs(updatedJobs);
                setLoading(false);
              }}
              key={index}
              itemSaved={item?.itemSaved}
              title={item?.job_category}
              salary={`$k${item?.salary}/month`}
              location={item?.location}
              applied={''}
              time={item?.posting_date}
              onPress={() =>
                navigation.navigate('JobDetails', {
                  jobData: item,
                })
              }
            />
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SearchJobs;
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
    width: '100%',
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
