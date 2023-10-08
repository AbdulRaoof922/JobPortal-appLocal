import { StyleSheet, View, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState } from 'react'
import MyButton from '../component/MyButton'
import { TextInput, Text } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/FontAwesome6';
const CreateAccount = ({ navigation }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [checked, setChecked] = useState(false);
    const [name, setname] = useState('')
    const [confirm, setconfirm] = useState('')
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ backgroundColor: '#3F6EEC', width: '22%', padding: 15, borderRadius: 10, alignItems: 'center' }}>
                <Text style={[styles.login, { color: '#ffffff', fontSize: 16 }]}>LOGO</Text>
            </View>
            <Text style={styles.login}>Create an account</Text>
            <Text style={styles.signin}>Sign up to get started!</Text>

            <TextInput
                label="Full Name"
                value={name}
                mode='outlined'
                style={styles.input}
                theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
                placeholder='John Doe'
                onChangeText={text => setname(text)}
            />
            <TextInput
                label="Email"
                value={email}
                mode='outlined'
                style={styles.input}
                theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
                placeholder='Johndoe@email.com'
                onChangeText={text => setemail(text)}
            />
            <TextInput
                label="Create Password"
                value={password}
                style={styles.input}
                theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
                secureTextEntry
                mode='outlined'
                onChangeText={text => setpassword(text)}
                right={<TextInput.Icon color={'#777777'} icon={() =><Feather name={'eye-slash'} size={20} color='#777777'/>} />}
            />
            <TextInput
                label="Re-enter Password"
                value={confirm}
                style={styles.input}
                theme={{ colors: { primary: '#3F6EEC3D' }, roundness: 10 }}
                secureTextEntry
                mode='outlined'
                onChangeText={text => setconfirm(text)}
                right={<TextInput.Icon color={'#777777'} icon={() =><Feather name={'eye-slash'} size={20} color='#777777'/>} />}
            />
            <View style={{ width: '90%' }}>
                <View style={{ flexDirection: 'row', width: '90%', alignItems: 'flex-start' }}>
                    <CheckBox
                        disabled={false}
                        value={checked}
                        boxType='circle'
                        tintColors={{ true: '#3F6EEC', false: '#256CFC54' }}
                        onValueChange={(newValue) => setChecked(newValue)}
                    />
                    <Text style={styles.remember}>I agree to the Logo Terms & Services and Privacy Policy</Text>
                </View>
            </View>
            <MyButton title={'Register'} onPress={() =>navigation.navigate('Registration')} />
            <Text style={styles.remember}>Already have an account</Text>
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.btnText}>Log in</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default CreateAccount
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '90%',
        margin: 10,
        borderColor: '#4E6BB8',
        backgroundColor: '#ffffff',
        color: '#ffffff',
        height: 55,
        borderRadius: 200
    },
    login: {
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold',
        margin: 5,
        fontFamily: 'ReadexPro-Regular'
    },
    signin: {
        color: '#000000',
        fontSize: 14,
        margin: 5,
        fontFamily: 'ReadexPro-Regular'
    },
    remember: {
        color: '#777777',
        fontSize: 14,
        margin: 5,
        textAlign: 'justify',
        fontFamily: 'MartelSans-Regular'
    },
    forget: {
        color: '#000000',
        fontSize: 14,
        margin: 5,
        fontFamily: 'MartelSans-Bold'
    },
    btn: {
        width: '90%',
        backgroundColor: '#F1F4FD',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        borderRadius: 10,
        margin: 15
    },
    btnText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'MartelSans-Regular',
        fontWeight: '400'
    }
})