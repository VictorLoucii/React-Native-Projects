
import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { deviceHeight, deviceWidth } from './Dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { cities } from './Cities'
import Cards from './component/Cards'
import { useNavigation } from '@react-navigation/native'


const Home = () => {
    const [city, setCity] = useState('');
    const navigation = useNavigation();
    const goToDetails = () => {
        navigation.navigate('Details', {name: city});
    }

    return (
        <View>
            <ImageBackground
                source={require('../Assets/images/image3.jpg')}
                style={styles.bkGroundImage}
            />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Ionicons name='menu-sharp' size={46} color='white' />
                    <Image
                        source={require('../Assets/images/user.jpg')}
                        style={styles.userImage}
                    />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headingText}>
                        Hello Victor
                    </Text>
                    <Text style={styles.searchCityName}>
                        Search City Name
                    </Text>
                </View>
                <View style={styles.inputField}>
                    <TextInput
                        value={city}
                        onChangeText={(value) => setCity(value)}
                        placeholder='Search City Name'
                        placeholderTextColor='white'
                        style={{ paddingHorizontal: 10, color: 'white', fontSize: 17 }}
                    />
                    <TouchableOpacity onPress={goToDetails}>
                        <Ionicons
                            name='search'
                            size={25}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                <View style = {styles.myLocationContainer}>
                    <Text style={styles.myLocationStyling}>
                        My Location
                    </Text>
                </View>
                <FlatList 
                    horizontal = {true}
                    data = {cities}
                    renderItem={({item}) => (
                        <Cards 
                            name = {item.name}
                            image = {item.image}
                        />
                    )}
                    ItemSeparatorComponent={
                        <View style = {{marginHorizontal: 5}} />
                    }
 
                />
            </View>
        </View>

    )
}

export default Home

const styles = StyleSheet.create({
    bkGroundImage: {
        height: deviceHeight,
        width: deviceWidth,
        opacity: 0.6,
        backgroundColor: 'black',
    },
    container: {
        position: 'absolute',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    headerContainer: {
        width: deviceWidth - 20,  //reason for -20: -10 + -10 from paddingHorizontal min(7:17)
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userImage: {
        height: 46,
        width: 46,
        borderRadius: 50,
    },
    headerTextContainer: {
        paddingHorizontal: 50,
        marginTop: 100,

    },
    headingText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    searchCityName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    inputField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 20,
        paddingHorizontal: 10,

    },
    myLocationContainer:{
        marginTop: 170,
        marginBottom: 20,

    },
    myLocationStyling: {
        color: 'white',
        paddingHorizontal: 10,
        fontSize: 22,
    },

})