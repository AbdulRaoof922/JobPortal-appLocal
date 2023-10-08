import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  Share,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyButton from '../component/MyButton';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';
import {useSelector} from 'react-redux';
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsPast = (now - date) / 1000;

  if (secondsPast > 86400) {
    const day = parseInt(secondsPast / 86400);
    if (day > 7) {
      const week = parseInt(day / 7);
      if (week > 4) {
        const month = parseInt(day / 30);
        if (month > 12) {
          const year = parseInt(day / 365);
          return year + 'y';
        } else {
          return month + 'mo';
        }
      } else {
        return week + 'w';
      }
    } else {
      return day + 'd';
    }
  } else {
    return '1d'; // Return minimum of 1 day if less than 24 hours have passed
  }
}

// Example usage:

JobDetails = ({navigation, route}) => {
  const user = useSelector(state => state.auth.user);

  const jobId = route?.params?.jobId;
  const jobData = route?.params?.jobData;
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchJobCategoriesByType = async jobId => {
    setLoading(true);
    try {
      const url = `https://ill-pear-basket-clam-tie.cyclic.cloud/job-details/${jobId}`;
      const response = await axios.get(url);
      setJobDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch job categories:', error);
      setLoading(false);
    }
  };

  const applyForJob = async jobApplicationData => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://ill-pear-basket-clam-tie.cyclic.cloud/apply-for-job',
        jobApplicationData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error('Error applying for job:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // An error occurred in setting up the request
        console.error('Error message:', error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobData) {
      setJobDetails(jobData);
    } else {
      fetchJobCategoriesByType(jobId);
    }
  }, []);

  const [h1, seth1] = useState(4);
  const [h2, seth2] = useState(0);
  const [h3, seth3] = useState(0);
  const changeHeight = val => {
    if (val === 'h1') {
      seth1(4);
      seth2(0);
      seth3(0);
    } else if (val === 'h2') {
      seth1(0);
      seth2(4);
      seth3(0);
    } else if (val === 'h3') {
      seth1(0);
      seth2(0);
      seth3(4);
    }
  };
  const shareJob = async () => {
    try {
      const shareMessage = `
        Check out this job!
        Position: ${jobDetails.job_category}
        Job Type: ${jobDetails.job_type}
        Location: ${jobDetails.location}
        Description: ${jobDetails.job_description}
        Salary: $${jobDetails.salary}/Month
        Experience Required: ${jobDetails.experience}
        Qualification: ${jobDetails.qualification}
        No. of Openings: ${jobDetails.noOfOpenings}
        Posting Date: ${jobDetails.posting_date}
      `;

      await Share.share({
        message: shareMessage,
        title: 'Check out this job!',
      });
    } catch (error) {
      console.error('Error sharing job:', error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LoadingModal isVisible={loading} />
      <View style={styles.card}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="star" color="#FF8A00" size={25} />
            <Text
              style={[
                styles.desc,
                {color: '#000000', fontSize: 13, margin: 0},
              ]}>
              4.7
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <TouchableOpacity onPress={shareJob} style={styles.minCard}>
              <Feather name="share-2" color="#3F6EEC" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.minCard}>
              <Image
                style={{width: 25, height: 25, resizeMode: 'contain'}}
                source={require('../assets/rec2.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.innerCard}>
          <Image
            style={styles.imageStyles}
            source={require('../assets/g.png')}
          />
        </View>
        <Text
          numberOfLines={2}
          style={[styles.title, {width: 200, textAlign: 'center'}]}>
          {jobDetails?.title}
        </Text>
        <Text style={[styles.desc, {color: '#3F6EEC'}]}>Shell</Text>
        <Text style={[styles.desc, {color: '#777777', fontSize: 16}]}>
          {jobDetails?.location}
        </Text>
        <Text style={[styles.desc, {color: '#3F6EEC'}]}>
          ${jobDetails?.salary} Salary per month
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Onside</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Full Time</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.desc, {color: '#777777', fontSize: 13}]}>
          {timeAgo(jobDetails?.posting_date)}
        </Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          flexDirection: 'row',
          marginHorizontal: 20,
          // flexGrow: 1,
          // backgroundColor: 'red',
          height: 80,
        }}>
        <TouchableOpacity onPress={() => changeHeight('h1')}>
          <Text style={styles.tabText}>Job Description</Text>
          <View
            style={{
              backgroundColor: '#3F6EEC',
              height: h1,
              borderRadius: 5,
            }}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeHeight('h2')}>
          <Text style={[styles.tabText, {marginHorizontal: 10}]}>
            Key Qualification
          </Text>
          <View style={{backgroundColor: '#3F6EEC', height: h2}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeHeight('h3')}>
          <Text style={[styles.tabText, {marginHorizontal: 5}]}>
            Requirement Skills
          </Text>
          <View style={{backgroundColor: '#3F6EEC', height: h3}}></View>
        </TouchableOpacity>
      </ScrollView>
      {h1 != 0 && (
        <View
          style={{
            width: '95%',
            padding: 15,
            margin: 5,
            // backgroundColor: 'red',
          }}>
          <Text style={styles.title}>Job Describtion</Text>
          <Text style={styles.desc}>{jobDetails?.job_description}</Text>
        </View>
      )}
      {h2 != 0 && (
        <View
          style={{
            width: '95%',
            padding: 15,
            margin: 5,
          }}>
          <Text style={styles.title}>Key Qualification</Text>
          <Text style={styles.desc}>{jobDetails?.skills}</Text>
        </View>
      )}
      {h3 != 0 && (
        <View
          style={{
            width: '95%',
            padding: 15,
            margin: 5,
          }}>
          <Text style={styles.title}>Requirement Skills</Text>
          <Text style={styles.desc}>Not Requirement</Text>
        </View>
      )}
      <View
        style={{
          height: 40,
        }}
      />
      <MyButton
        title={'Apply Now'}
        onPress={() => {
          applyForJob({
            applicantId: user?.user?.id,
            jobId: jobDetails?.id,
            recruiterId: jobDetails?.userid,
          });
          // alert('Under Progress');
          // navigation.navigate('ApplyJob')
        }}
      />
    </ScrollView>
  );
};

export default JobDetails;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    // flexGrow: 1,
  },
  imageStyles: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  btn: {
    width: '35%',
    padding: 8,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#3F6EEC',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 13,
    margin: 5,
    marginHorizontal: 8,
    alignSelf: 'center',
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
  },
  card: {
    width: '90%',
    padding: 20,
    margin: 15,
    borderColor: '#3F6EEC47',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
  },
  innerCard: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: '#D9D9D9AB',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  minCard: {
    width: 42,
    height: 42,
    borderWidth: 1,
    marginHorizontal: 5,
    borderColor: '#3F6EEC47',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'ReadexPro-Regular',
  },
  desc: {
    color: '#777777',
    fontSize: 13,
    margin: 5,
    marginLeft: 12,
    fontFamily: 'MartelSans-Regular',
    textAlign: 'justify',
  },
  tabText: {
    color: '#777777',
    fontSize: 13,
    marginVertical: 15,
    fontFamily: 'MartelSans-Regular',
    textAlign: 'justify',
  },
});
