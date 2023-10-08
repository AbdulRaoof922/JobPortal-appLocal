import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationCard = ({
  title,
  salary,
  location,
  image,
  time,
  status,
  color,
  txtColor,
}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={styles.minCard}>
          <Image style={styles.img} source={require('../assets/shell4x.png')} />
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={styles.title}>{title}</Text>
            <View
              style={{
                backgroundColor: '#3F6EEC',
                width: 10,
                height: 10,
                borderRadius: 10,
                marginLeft: 15,
              }}></View>
            <Text style={[styles.other, {marginBottom: 0}]}>Shell</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginTop: 15,
            }}>
            <Icon2 name="wallet" color="#3F6EEC" size={18} />
            <Text style={styles.other}>{salary}</Text>
            <Icon name="location-dot" color="#FF8A00" size={15} />
            <Text style={styles.other}>{location}</Text>
            <Text>{time}</Text>
          </View>
        </View>
      </View>
      {/*  buttons code here */}
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.btn, {backgroundColor: color}]}>
          <Text style={[styles.btnText, {color: txtColor}]}>{status}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>View Application</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default NotificationCard;
const styles = StyleSheet.create({
  card: {
    width: '90%',
    padding: 10,
    margin: 15,
    borderColor: '#3F6EEC47',
    borderWidth: 1,
    borderRadius: 20,
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
    height: 60,
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
  btn: {
    width: '45%',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#3F6EEC47',
  },
  btnText: {
    color: '#777777',
    fontSize: 13,
    margin: 5,
    marginHorizontal: 8,
    alignSelf: 'center',
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
  },
});
