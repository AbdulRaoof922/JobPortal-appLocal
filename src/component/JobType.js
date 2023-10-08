import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'
const JobType = ({ title, image, onPress,active}) => {
    return (
        <TouchableOpacity style={styles.main} onPress={onPress}>
            <TouchableOpacity style={[styles.card,active?{backgroundColor:'#3F6EEC'}:{backgroundColor:'#ffffff'}]} onPress={onPress}>
                <View style={[styles.innerCard,active?{backgroundColor:'#ffffff'}:{backgroundColor:'#256CFC1F'}]}>
                    <Image source={image} style={styles.img}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}
export default JobType
const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding:10,
        borderColor: '#3F6EEC47',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5
    },
    img:{
        height:30,
        width:30,
        resizeMode:'contain'
    },
    innerCard: {
        width: 50,
        height: 50,
        backgroundColor: '#256CFC1F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    title: {
        color: '#3F6EEC',
        fontSize: 16,
        margin: 5,
        fontWeight: '800',
        fontFamily: 'MartelSans-Regular'
    },
})