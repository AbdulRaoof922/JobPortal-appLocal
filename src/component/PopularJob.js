import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {timeAgo} from '../screens/JobDetails';
const PopularJob = ({
  title,
  salary,
  location,
  image,
  time,
  type,
  onPress,
  onPressSaveJob,
  itemSaved,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={styles.minCard}>
          <Image style={styles.img} source={image} />
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.title, {marginBottom: 0}]}>{title}</Text>
            <TouchableOpacity
              onPress={onPressSaveJob}
              hitSlop={30}
              style={{
                // marginTop: 10,
                marginRight: 15,
                width: 20,
                height: 25,
              }}>
              {itemSaved ? (
                <Image
                  style={{
                    marginTop: 10,
                    marginRight: 15,
                    width: 20,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/rec2.png')}
                />
              ) : (
                <Image
                  style={{
                    marginTop: 10,
                    marginRight: 15,
                    width: 20,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/rec.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.other}>Shell</Text>
          <Text style={styles.salary}>{salary}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#D9D9D9AB',
          width: '90%',
          height: 2,
          margin: 20,
        }}></View>
      <Text style={styles.address}>{location}</Text>
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Full Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Posted {timeAgo(time)} ago</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default PopularJob;
const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width / 1.15,
    padding: 10,
    margin: 10,
    borderColor: '#3F6EEC47',
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 5,
    fontFamily: 'MartelSans-Regular',
  },
  salary: {
    color: '#3F6EEC',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 5,
    fontFamily: 'MartelSans-Regular',
  },
  other: {
    color: '#777777',
    fontSize: 13,
    marginHorizontal: 5,
    marginHorizontal: 8,
    fontWeight: '600',
    fontFamily: 'MartelSans-Regular',
  },
  address: {
    color: '#777777',
    fontSize: 14,
    marginHorizontal: 8,
    alignSelf: 'center',
    fontWeight: '600',
    fontFamily: 'MartelSans-Regular',
  },
  minCard: {
    width: '18%',
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    margin: 10,
    alignItems: 'center',
    borderColor: '#D9D9D9AB',
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  btn: {
    padding: 5,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#3F6EEC47',
  },
  btnText: {
    color: '#777777',
    fontSize: 11,
    margin: 5,
    marginHorizontal: 8,
    alignSelf: 'center',
    fontWeight: '400',
    fontFamily: 'MartelSans-Light',
  },
});
