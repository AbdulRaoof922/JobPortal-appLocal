import {StyleSheet, View, ScrollView, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CategoryCard from '../component/CategoryCard';
import axios from 'axios';
import LoadingModal from '../component/LoadingModal';

const Category = ({navigation, route}) => {
  const jobType = route?.params?.jobType;
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobCategoriesByType = async jobType => {
    try {
      setLoading(true); // Ensure loading is set to true at the start of the function
      const url = `https://ill-pear-basket-clam-tie.cyclic.cloud/jobCategoriesByType?jobType=${jobType}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setJobCategories(response.data);
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        Alert.alert(
          'Error',
          'Failed to fetch job categories. Unexpected server response.',
        );
      }
    } catch (error) {
      console.error('Failed to fetch job categories:', error);
      Alert.alert(
        'Error',
        'Failed to fetch job categories. Please check your internet connection and try again.',
      );
    } finally {
      setLoading(false); // Ensure loading is set to false at the end of the function, whether it was successful or not
    }
  };

  useEffect(() => {
    fetchJobCategoriesByType(jobType);
  }, []);
  return (
    <View style={styles.container}>
      <LoadingModal isVisible={loading} />
      <FlatList
        data={jobCategories}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <CategoryCard
              title={item?.category}
              count={item?.jobCount}
              image={require('../assets/account.png')}
              onPress={() =>
                navigation.navigate('CategoryDetails', {
                  jobType: item?.category,
                  jobCategory: jobType,
                })
              }
            />
          );
        }}
      />

      {/* <View style={{flexDirection: 'row', margin: 5}}>
        <CategoryCard
          title={'Accounting'}
          count={'100+'}
          image={require('../assets/account.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'Accounting'})
          }
        />
        <CategoryCard
          title={'Graphic Design'}
          count={'100+'}
          image={require('../assets/graphic.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'Graphic Design'})
          }
        />
      </View>
      <View style={{flexDirection: 'row', margin: 5}}>
        <CategoryCard
          title={'UI UX Design'}
          count={'100+'}
          image={require('../assets/ui.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'UI UX Design'})
          }
        />
        <CategoryCard
          title={'Digital Marketing'}
          count={'100+'}
          image={require('../assets/social.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'Digital Marketing'})
          }
        />
      </View>
      <View style={{flexDirection: 'row', margin: 5}}>
        <CategoryCard
          title={'Software Engineer'}
          count={'100+'}
          image={require('../assets/engineer.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'Software Engineer'})
          }
        />
        <CategoryCard
          title={'Manager'}
          count={'100+'}
          image={require('../assets/manager.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'Manager'})
          }
        />
      </View>
      <View style={{flexDirection: 'row', margin: 5}}>
        <CategoryCard
          title={'Receptionist'}
          count={'100+'}
          image={require('../assets/counter.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'Receptionist'})
          }
        />
        <CategoryCard
          title={'Store Keeper'}
          count={'100+'}
          image={require('../assets/social-media.png')}
          onPress={() =>
            navigation.navigate('CategoryDetails', {title: 'Store Keeper'})
          }
        />
      </View> */}
    </View>
  );
};
export default Category;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
});
