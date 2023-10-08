import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import NotificationCard from '../component/NotificationCard'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MainHeader from '../component/MainHeader';
const Notification = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MainHeader title={'Notifications'} iconRight={'bell'}/>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginHorizontal: 25 }}>
        <Searchbar
          placeholder="Search your application..."
          placeholderTextColor={'#777777'}
          iconColor='#777777'
          inputStyle={styles.searchTxt}
          cursorColor={'#777777'}
          style={styles.search}
        />
        <TouchableOpacity
          style={styles.home}>
          <Image style={{height:25,width:25,resizeMode:'contain'}} source={require('../assets/align.png')}/>
        </TouchableOpacity>
      </View>

      <NotificationCard title={'Senior UI/UX Designer'} salary={'$10k/month'} location={'Mumbai, India'} status={'On the way'} color={'#FF8A0030'} txtColor={'#BC6C0E'} />
      <NotificationCard title={'Senior UI/UX Designer'} salary={'$10k/month'} location={'Mumbai, India'} status={'Delivered'} color={'#03A82730'} txtColor={'#067D20'} />
      <NotificationCard title={'Senior UI/UX Designer'} salary={'$10k/month'} location={'Mumbai, India'} status={'Cancelled'} color={'#FFE9E9'} txtColor={'#D02E51'} />
      <NotificationCard title={'Senior UI/UX Designer'} salary={'$10k/month'} location={'Mumbai, India'} status={'On the way'} color={'#FF8A0030'} txtColor={'#BC6C0E'} />
    </ScrollView>
  )
}
export default Notification
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  home: {
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: '#3F6EEC',
    justifyContent: 'center',
    height: 50,
    width: '15%',
    alignItems: 'center'
  },
  search: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#767E8F1A',
    fontSize:40
  },
  searchTxt: {
    fontSize:12,
    fontFamily:'MartelSans-SemiBold',
    color:'#777777'
  }
})