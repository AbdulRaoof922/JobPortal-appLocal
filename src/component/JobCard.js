import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
function timeSince(dateString) {
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

const JobCard = ({
  title,
  salary,
  location,
  image,
  time,
  applied,
  company,
  onPress,
  onPressSaveJob,
  itemSaved,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',

          // backgroundColor: 'red',
        }}>
        <View style={styles.minCard}>
          <Image style={styles.img} source={require('../assets/g.png')} />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              // width: '60%',
              flex: 1,
            }}>
            <Text style={[styles.other, {marginBottom: 0}]}>{company}</Text>
            <Text style={[styles.other, {marginBottom: 0, color: '#3F6EEC'}]}>
              {applied}
            </Text>
            <TouchableOpacity hitSlop={30} onPress={onPressSaveJob} style={{}}>
              {itemSaved ? (
                <Image
                  style={{
                    marginTop: 10,
                    marginRight: 5,
                    height: 22,
                    width: 22,
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/rec2.png')}
                />
              ) : (
                <Image
                  style={{
                    marginTop: 10,
                    marginRight: 5,
                    height: 22,
                    width: 22,
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/rec.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.title, {flex: 1}]}>{title}</Text>
            <Text style={{width: 100}}>{timeSince(time)}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginTop: 20,
              // backgroundColor: 'red',
            }}>
            <Icon2 name="wallet" color="#3F6EEC" size={18} />
            <Text style={styles.other}>{salary}</Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Icon name="location-dot" color="#FF8A00" size={15} />
              <Text
                numberOfLines={1}
                style={[
                  {width: 100, color: 'gray', textAlignVertical: 'center'},
                ]}>
                {location}
              </Text>
            </View>
            {/* <Text>{time}</Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default JobCard;
const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: 10,
    margin: 15,
    borderColor: '#3F6EEC47',
    borderWidth: 1,
    borderRadius: 20,
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  title: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
    marginLeft: 5,
    fontFamily: 'MartelSans-Regular',
  },
  other: {
    color: '#777777',
    fontSize: 13,
    margin: 5,
    marginHorizontal: 8,
    fontWeight: '600',
    // width: 50,
    // borderStartColor: 'red',
    fontFamily: 'MartelSans-Regular',
  },
  minCard: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    alignItems: 'center',
    borderColor: '#3F6EEC47',
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});
