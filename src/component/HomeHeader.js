import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const HomeHeader = ({onPress}) => {
  const user = useSelector(state => state.auth.user);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconView} onPress={onPress}>
        <Image
          source={require('../assets/DrawerIcon.png')}
          style={styles.drawerIcon}
        />
      </TouchableOpacity>
      <View style={styles.rightView}>
        <View style={styles.textSection}>
          <Text style={styles.text1}>{user?.user?.name}</Text>
          <Text style={styles.text2}> {user?.user?.resumeHeadline}</Text>
        </View>
        {user?.user?.profileImage ? (
          <Image
            style={styles.profileImage}
            source={{uri: user?.user?.profileImage}}
          />
        ) : (
          <Image
            style={styles.profileImage}
            source={require('../assets/jhon.png')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  iconView: {
    backgroundColor: '#FFF',
    elevation: 10,
    shadowColor: 'gray',
    padding: 15,
    borderRadius: 10,
  },
  drawerIcon: {
    resizeMode: 'contain',
    width: 10,
    height: 10,
    padding: 10,
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    backgroundColor: '#3F6EEC',
    borderRadius: 100,
  },
  text1: {
    fontFamily: 'MartelSans-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    color: '#000',
  },
  text2: {
    fontFamily: 'MartelSans-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    color: '#777',
  },
  textSection: {
    marginRight: 10,
  },
});

export default HomeHeader;
