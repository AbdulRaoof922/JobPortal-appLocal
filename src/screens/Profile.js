import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MyButton from '../component/MyButton';
import {ProgressBar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import UtilityMethods from '../utility/UtilityMethods';
import LoadingModal from '../component/LoadingModal';
import {setUser} from '../redux/Reducers/AuthReducer';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const showImagePicker = async () => {
    UtilityMethods.selectImage('gallery', image => {
      setImage(image.path);
      handleImageUpload(image.path);
    });
  };

  const handleImageUpload = async imageData => {
    try {
      setLoading(true);
      const fileUri = imageData;
      const fileType = fileUri.split('.').pop(); // Extracts file extension

      if (!['png', 'jpg', 'jpeg'].includes(fileType)) {
        throw new Error(`Unsupported file type: ${fileType}`);
      }

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: `image/${fileType}`, // Dynamically set the MIME type
        name: `uploaded_image.${fileType}`, // Dynamically set the file extension
      });
      formData.append('upload_preset', 'resumes'); // make sure this preset is configured for images

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfewwtzi3/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const imageUrl = response.data.secure_url;
      onPressUpdate(imageUrl);
      return imageUrl;
    } catch (error) {
      setLoading(false);
      alert('Error uploading to Cloudinary:', error.message);
      console.error('Error uploading to Cloudinary:', error);
      console.error('Error details:', error.message, error.config);
    }
  };
  const onPressUpdate = async imageURL => {
    setLoading(true);

    try {
      const response = await axios.patch(
        `https://ill-pear-basket-clam-tie.cyclic.cloud/update-${
          user.userType == 'Fresher' ? 'profile' : 'proProfile'
        }/${user?.user?.id}`,
        {
          profileImage: imageURL,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const updatedUser = {
        ...user.user,
        profileImage: imageURL,
        // any other fields you want to update
      };
      const updateMainObject = {
        ...user,
        user: updatedUser,
      };
      dispatch(setUser(updateMainObject));
      // Handle response accordingly
      // navigation.goBack();

      // You might want to navigate the user to another screen or update the UI in some way here
    } catch (err) {
      console.error('Failed to update profile:', err);
      // setError(err.message || 'An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LoadingModal isVisible={loading} />
      <View style={styles.mainCard}>
        <TouchableOpacity onPress={showImagePicker}>
          {!image && !user?.user?.profileImage ? (
            <Image style={styles.img} source={require('../assets/jhon.png')} />
          ) : (
            <Image
              style={styles.img}
              source={{uri: image ? image : user?.user?.profileImage}}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{user?.user?.name}</Text>
        <Text style={[styles.txt, {color: '#3F6EEC'}]}>
          {user?.user?.resumeHeadline}
        </Text>
        <View
          style={{
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text style={[styles.txt, {color: '#777777', fontSize: 12}]}>
            Profile Completed
          </Text>
          <Text
            style={[
              styles.txt,
              {fontSize: 12, color: '#3F6EEC', marginRight: 15},
            ]}>
            100%
          </Text>
        </View>
        <ProgressBar style={{width: 270}} progress={1} color={'#3F6EEC'} />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Personal');
        }}
        style={styles.card}>
        <Text style={styles.txt}>Personal information</Text>
        <Image
          style={styles.vector}
          source={require('../assets/greater.png')}
        />
      </TouchableOpacity>
      {user?.userType == 'Professional' && (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpEmployment');
            }}
            style={styles.card}>
            <Text style={styles.txt}>Employment</Text>
            <Image
              style={styles.vector}
              source={require('../assets/greater.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpDesiredCarrerProfile');
            }}
            style={styles.card}>
            <Text style={styles.txt}>Desired Carrier Profile</Text>
            <Image
              style={styles.vector}
              source={require('../assets/greater.png')}
            />
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUpEducationDetailsFresher');
        }}
        style={styles.card}>
        <Text style={styles.txt}>Education</Text>
        <Image
          style={styles.vector}
          source={require('../assets/greater.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Others');
        }}
        style={styles.card}>
        <Text style={styles.txt}>Other information</Text>
        <Image
          style={styles.vector}
          source={require('../assets/greater.png')}
        />
      </TouchableOpacity>

      {/* <MyButton
        title={'Save Now'}
        onPress={() => navigation.navigate('Main')}
      /> */}
    </ScrollView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  txt: {
    color: '#000000',
    fontSize: 14,
    marginLeft: 15,
    textAlign: 'justify',
    fontFamily: 'MartelSans-Regular',
  },
  name: {
    color: '#000000',
    fontSize: 16,
    marginLeft: 15,
    textAlign: 'justify',
    fontFamily: 'ReadexPro-Bold',
  },
  card: {
    borderRadius: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#3F6EEC47',
    alignItems: 'center',
    margin: 10,
  },
  mainCard: {
    borderRadius: 25,
    width: '90%',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    borderColor: '#3F6EEC47',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  img: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 100,
    backgroundColor: '#ffffff',
  },
  vector: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
