import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const AppliedJobCard = ({title, salary, location, image, time,applied}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('JobDetails')}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={styles.minCard}>
          <Image style={styles.img} source={require('../assets/shell4x.png')} />
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.other, {marginBottom: 0}]}>Shell</Text>
            <Text style={[styles.other, {marginBottom: 0,color:'#3F6EEC'}]}>{applied}</Text>
            <Image
              style={{marginTop: 10,marginRight:5,height:22,width:22,resizeMode:'contain'}}
              source={require('../assets/rec.png')}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginTop: 20,
            }}>
            <Icon2 name="wallet" color="#3F6EEC" size={18} />
            <Text style={styles.other}>{salary}</Text>
            <Icon name="location-dot" color="#FF8A00" size={15} />
            <Text style={styles.other}>{location}</Text>
            <Text>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default AppliedJobCard;
const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: 10,
    margin: 15,
    borderColor: '#3F6EEC47',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
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
    fontFamily: 'MartelSans-Regular',
  },
  minCard: {
    width: '20%',
    padding:10,
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
