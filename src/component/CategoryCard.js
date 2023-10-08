import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native'
import React from 'react'
const CategoryCard = ({ title, count, image,onPress}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.innerCard}>
                <Image style={styles.img} source={image} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.count}>{count}</Text>
        </TouchableOpacity>
    )
}
export default CategoryCard
const styles = StyleSheet.create({
    card: {
        flex:1,
        paddingHorizontal:5,
        paddingVertical:8,
        borderColor: '#3F6EEC47',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    },
    img:{
        height:50,
        width:50,
        resizeMode:'contain'
    },
    innerCard: {
        width: 100,
        height: 100,
        backgroundColor: '#256CFC1F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    title: {
        color: '#000000',
        fontSize: 16,
        margin: 5,
        fontWeight: '800',
        fontFamily: 'MartelSans-Regular'
    },
    count: {
        color: '#3F6EEC',
        fontSize: 16,
        margin: 5,
        fontWeight: '600',
        fontFamily: 'MartelSans-Regular'
    },
})