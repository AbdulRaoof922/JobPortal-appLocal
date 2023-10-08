import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const MainHeader = ({ title, props, iconRight }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        color="#000000"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Text></Text>
        {/* <Icon name={iconRight ? iconRight : 'magnify'} color={iconRight ? '#3F6EEC' : 'grey'} size={30} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'MartelSans-SemiBold',
    fontSize: 17,
    fontStyle: 'normal',
    alignSelf:'center',
    color: '#000',
  },
});
export default MainHeader;
