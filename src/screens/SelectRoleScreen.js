import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {setSignUpRole, setUser} from '../redux/Reducers/AuthReducer';

const SelectRoleScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelection = role => {
    if (role == 'Fresher') {
      dispatch(setSignUpRole('Fresher'));
      dispatch(setUser(null));
    }
    if (role == 'Professional') {
      dispatch(setSignUpRole('Professional'));
      dispatch(setUser(null));
    }
    setSelectedRole(role);
    navigation.navigate('SignUpDetailsFresher', {role: role}); // Pass role as a parameter to CreateAccount
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          marginVertical: 15,
        }}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Fresher' ? styles.selectedRole : null,
          ]}
          onPress={() => handleRoleSelection('Fresher')}>
          <Text style={styles.roleText}>Fresher</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'Professional' ? styles.selectedRole : null,
          ]}
          onPress={() => handleRoleSelection('Professional')}>
          <Text style={styles.roleText}>Professional</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'ReadexPro-Regular',
  },
  roleButton: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    borderRadius: 10,
    margin: 5,
  },
  selectedRole: {
    backgroundColor: '#3F6EEC',
  },
  roleText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'MartelSans-Regular',
  },
});

export default SelectRoleScreen;
