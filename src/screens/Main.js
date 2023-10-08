import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import JobType from '../component/JobType';
import PopularJob from '../component/PopularJob';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeHeader from '../component/HomeHeader';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';
import UtilityMethods from '../utility/UtilityMethods';
import {initNotifications} from '../Services/NotificationController';
import useSaveJob from '../component/useSaveJob';
import {useSelector} from 'react-redux';
function separateJobsByType(jobs) {
  const companyJobs = jobs.filter(job => job.job_type === 'Company');
  const fulltimeJobs = jobs.filter(job => job.job_type === 'Fulltime');
  const remoteJobs = jobs.filter(job => job.job_type === 'Remote');
  const freelanceJobs = jobs.filter(job => job.job_type === 'Freelance');
  return {
    companyJobs,
    fulltimeJobs,
    remoteJobs,
    freelanceJobs,
  };
}
const Main = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [fulltimeJobs, setFulltimeJobs] = useState([]);
  const [remoteJobs, setRemoteJobs] = useState([]);
  const [freelanceJobs, setFreelanceJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const {saveJob, error, data} = useSaveJob();
  const handleSaveJob = jobId => {
    saveJob(29, 9, user.userType === 'Fresher' ? 'freshers' : 'professionals');
  };
  useEffect(() => {
    // handleSaveJob();
    // initNotifications();
    fetchCategories();
    fetchAllCategoryJobs();
    // UtilityMethods.requestPermission(async item => {
    //   // dispatch(setUser(data));
    // });
    return () => {};
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://ill-pear-basket-clam-tie.cyclic.cloud/categories',
      );

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        // Handle unexpected status codes
        console.error(`Unexpected status code: ${response.status}`);
        Alert.alert(
          'Error',
          'Failed to fetch categories. Unexpected server response.',
        );
      }
    } catch (error) {
      // Log the error and show an alert
      console.error('Error fetching categories:', error);
      Alert.alert(
        'Error',
        'Failed to fetch categories. Please check your internet connection and try again.',
      );
    }
  };

  const onPressJobType = jobType => {
    navigation.navigate('Category', {
      jobType: jobType,
    });
  };

  const fetchAllCategoryJobs = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        'https://ill-pear-basket-clam-tie.cyclic.cloud/latestJobsByType',
      );

      if (response.status === 200) {
        const separatedJobs = separateJobsByType(response.data);
        setCompanyJobs(separatedJobs.companyJobs);
        setFulltimeJobs(separatedJobs.fulltimeJobs);
        setRemoteJobs(separatedJobs.remoteJobs);
        setFreelanceJobs(separatedJobs.freelanceJobs);
      } else {
        // Handle unexpected status codes
        console.error(`Unexpected status code: ${response.status}`);
        Alert.alert(
          'Error',
          'Failed to fetch jobs. Unexpected server response.',
        );
      }
    } catch (error) {
      // Log the error and show an alert
      console.error('Error fetching jobs:', error);
      Alert.alert(
        'Error',
        'Failed to fetch jobs. Please check your internet connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LoadingModal isVisible={loading} />
      <HomeHeader onPress={() => navigation.openDrawer()} />
      <View style={{margin: 10}}>
        <Text
          style={[styles.see, {color: '#777777', marginLeft: 20, margin: 5}]}>
          Welcome
        </Text>
        <Text style={styles.title}>Find Your Dream Job!</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Jobs');
        }}
        style={styles.searchSection}>
        <Searchbar
          editable={false}
          placeholder="Search your job here"
          placeholderTextColor={'#777777'}
          iconColor="#777777"
          cursorColor={'#777777'}
          style={styles.search}
          inputStyle={styles.searchTxt}
        />
        {/* <TouchableOpacity style={styles.home}>
          <Image
            style={{height: 25, width: 25, resizeMode: 'contain'}}
            source={require('../assets/align.png')}
          />
        </TouchableOpacity> */}
      </TouchableOpacity>
      <ImageBackground
        imageStyle={{borderRadius: 10}}
        style={styles.card}
        source={require('../assets/card.png')}>
        <View style={{width: '70%'}}>
          <Text style={styles.find}>See how you can find a job quuickly!</Text>
          <TouchableOpacity style={styles.white}>
            <Text style={styles.red}>Read more</Text>
          </TouchableOpacity>
        </View>

        <Image
          style={styles.profile}
          source={require('../assets/look4x.png')}
        />
      </ImageBackground>

      <View style={{flex: 1, margin: 10}}>
        <Text style={styles.title}>Brows by category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row', margin: 10}}>
          <JobType
            onPress={() => onPressJobType('Company')}
            title={'Company'}
            image={require('../assets/company.png')}
            // active={true}
          />
          <JobType
            onPress={() => onPressJobType('Fulltime')}
            title={'Full Time'}
            image={require('../assets/time.png')}
            active={false}
          />
          <JobType
            onPress={() => onPressJobType('Remote')}
            title={'Remote'}
            image={require('../assets/remote.png')}
            active={false}
          />
          <JobType
            onPress={() => onPressJobType('Freelance')}
            title={'Freelance'}
            image={require('../assets/freelancer.png')}
            active={false}
          />
        </ScrollView>
      </View>

      {/* <View style={{flex: 1, margin: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>Popular Jobs</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Text style={styles.see}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <PopularJob
            title={'Senior UI/UX Designer'}
            salary={'$330 - $1300/Month'}
            location={'California,india'}
            image={require('../assets/shell4x.png')}
            onPress={() => navigation.navigate('JobDetails')}
          />
          <PopularJob
            title={'Senior UI/UX Designer'}
            salary={'$330 - $1300/Month'}
            location={'California,india'}
            image={require('../assets/pepsi.png')}
            onPress={() => navigation.navigate('JobDetails')}
          />
        </ScrollView>
      </View> */}

      <View style={{flex: 1, margin: 10}}>
        <Text style={styles.title}>Company</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {companyJobs.map((item, index) => {
            return (
              <PopularJob
                onPressSaveJob={async () => {
                  setLoading(true);
                  await saveJob(
                    item?.userid,
                    item?.id,
                    user.userType === 'Fresher' ? 'freshers' : 'professionals',
                  );
                  // Find the index of the item you want to update
                  const indexToUpdate = companyJobs.findIndex(
                    job => job.id === item.id,
                  );

                  // Create a new array with the updated item
                  const updatedJobs = companyJobs.map((job, index) =>
                    index === indexToUpdate ? {...job, itemSaved: true} : job,
                  );

                  // Update the state with the new array
                  setCompanyJobs(updatedJobs);
                  setLoading(false);
                }}
                itemSaved={item?.itemSaved}
                onPress={() => {
                  navigation.navigate('JobDetails', {
                    jobData: item,
                  });
                }}
                key={index}
                title={item?.job_category}
                salary={`$${item?.salary}/Month`}
                location={item?.location}
                image={require('../assets/g.png')}
                time={item?.posting_date}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={{flex: 1, margin: 10}}>
        <Text style={styles.title}>Full Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {fulltimeJobs.map((item, index) => {
            return (
              <PopularJob
                onPressSaveJob={async () => {
                  setLoading(true);
                  await saveJob(
                    item?.userid,
                    item?.id,
                    user.userType === 'Fresher' ? 'freshers' : 'professionals',
                  );
                  // Find the index of the item you want to update
                  const indexToUpdate = fulltimeJobs.findIndex(
                    job => job.id === item.id,
                  );

                  // Create a new array with the updated item
                  const updatedJobs = fulltimeJobs.map((job, index) =>
                    index === indexToUpdate ? {...job, itemSaved: true} : job,
                  );

                  // Update the state with the new array
                  setFulltimeJobs(updatedJobs);
                  setLoading(false);
                }}
                itemSaved={item?.itemSaved}
                key={index}
                onPress={() => {
                  navigation.navigate('JobDetails', {
                    jobData: item,
                  });
                }}
                title={item?.job_category}
                salary={`$${item?.salary}/Month`}
                location={item?.location}
                image={require('../assets/g.png')}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={{flex: 1, margin: 10}}>
        <Text style={styles.title}>Remote</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {remoteJobs.map((item, index) => {
            return (
              <PopularJob
                onPressSaveJob={async () => {
                  setLoading(true);
                  await saveJob(
                    item?.userid,
                    item?.id,
                    user.userType === 'Fresher' ? 'freshers' : 'professionals',
                  );
                  // Find the index of the item you want to update
                  const indexToUpdate = remoteJobs.findIndex(
                    job => job.id === item.id,
                  );

                  // Create a new array with the updated item
                  const updatedJobs = remoteJobs.map((job, index) =>
                    index === indexToUpdate ? {...job, itemSaved: true} : job,
                  );

                  // Update the state with the new array
                  setRemoteJobs(updatedJobs);
                  setLoading(false);
                }}
                itemSaved={item?.itemSaved}
                key={index}
                onPress={() => {
                  navigation.navigate('JobDetails', {
                    jobData: item,
                  });
                }}
                title={item?.job_category}
                salary={`$${item?.salary}/Month`}
                location={item?.location}
                image={require('../assets/g.png')}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={{flex: 1, margin: 10}}>
        <Text style={styles.title}>Frelance</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {freelanceJobs.map((item, index) => {
            return (
              <PopularJob
                onPressSaveJob={async () => {
                  setLoading(true);
                  await saveJob(
                    item?.userid,
                    item?.id,
                    user.userType === 'Fresher' ? 'freshers' : 'professionals',
                  );
                  // Find the index of the item you want to update
                  const indexToUpdate = freelanceJobs.findIndex(
                    job => job.id === item.id,
                  );

                  // Create a new array with the updated item
                  const updatedJobs = freelanceJobs.map((job, index) =>
                    index === indexToUpdate ? {...job, itemSaved: true} : job,
                  );

                  // Update the state with the new array
                  setFreelanceJobs(updatedJobs);
                  setLoading(false);
                }}
                itemSaved={item?.itemSaved}
                key={index}
                onPress={() => {
                  navigation.navigate('JobDetails', {
                    jobData: item,
                  });
                }}
                title={item?.job_category}
                salary={`$${item?.salary}/Month`}
                location={item?.location}
                image={require('../assets/g.png')}
              />
            );
          })}
        </ScrollView>
      </View>

      {/* extra view for employee */}
      <View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity style={styles.empCard}>
            <Icon name="search-minus" size={25} color={'#999999'} />
            <Text style={styles.empText}>Search Your Dream Career</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.empCard}>
            <Icon name="user-plus" size={25} color={'#999999'} />
            <Text style={styles.empText}>Create Your Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.empCard2}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'MartelSans-Bold',
            color: '#000000',
          }}>
          Are you an Employer?
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.empBtn}>
            <Text style={styles.empBtnText}>Search Your Hire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.empBtn, {backgroundColor: '#ab36f5'}]}>
            <Text style={styles.empBtnText}>Post a Job</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Main;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    // flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 20,
    fontFamily: 'Readex-Regular',
    marginBottom: 5,
  },
  see: {
    color: '#3F6EEC',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 30,
    fontFamily: 'MartelSans-Regular',
  },
  red: {
    color: '#3F6EEC',
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'center',
    fontFamily: 'MartelSans-Regular',
  },
  find: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 30.5,
    marginRight: 30,
    fontFamily: 'ReadexPro-Bold',
  },
  card: {
    flex: 1,
    padding: 23,
    flexDirection: 'row',
    borderRadius: 100,
    margin: 20,
    justifyContent: 'space-between',
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
  white: {
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: '65%',
    padding: 12,
    marginTop: 15,
    alignItems: 'center',
  },
  profile: {
    width: 140,
    height: 150,
    position: 'absolute',
    right: -45,
    marginRight: 50,
    alignSelf: 'flex-end',
    resizeMode: 'cover',
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
  empCard: {
    width: '45%',
    padding: 10,
    height: 100,
    backgroundColor: '#3F6EEC0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 4,
  },
  empCard2: {
    width: '90%',
    backgroundColor: '#3F6EEC0F',
    borderRadius: 5,
    padding: 10,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 20,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 4,
  },
  empText: {
    fontSize: 14,
    margin: 5,
    textAlign: 'center',
    fontFamily: 'MartelSans-Regular',
    color: '#000000',
  },
  empBtn: {
    width: '45%',
    backgroundColor: '#e69c09',
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  empBtnText: {
    fontSize: 14,
    margin: 5,
    fontFamily: 'MartelSans-Regular',
    color: '#ffffff',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 25,
  },
});
