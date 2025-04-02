//my code:
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { deviceHeight, deviceWidth } from './Dimensions';
import { API_KEY } from './Constants';
import { Img_API_KEY } from './Constants';

const Details = ({ route }) => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [cityImage, setCityImage] = useState(null);

    const { name } = route.params;

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`)
            .then(response => response.json())
            .then((jsonData) => {
                console.log(jsonData);
                if (jsonData.cod === 200) {
                    setData(jsonData);
                    setErrorMessage('');
                    fetchCityImage(name);
                }
                else {
                    console.log('API Error: ', jsonData.message);
                    setErrorMessage('Invalid City name, please enter a valid city.')
                    setData(null);
                    setCityImage(null);
                }
            })
            .catch((error) => {
                console.log('Fetch Error: ', error);
                setErrorMessage('Network error. Please try again')
                setData(null);
                setCityImage(null);
            })
    }, [name])

    const fetchCityImage = (city) => {
        fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${Img_API_KEY}&per_page=1`)
        .then((response) => response.json())
        .then((imageData) => {
            console.log('imageData: ',imageData)
            if(imageData.results.length > 0){
                setCityImage(imageData.results[0].urls.regular);
            }
            else{
                setCityImage(null);
            }
        })
        .catch((error) => {
            console.log('Error: ', error);
            setCityImage(null);
        })
    }

    const WeatherData = ({ name, detail }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: 'white' }}>{name}</Text>
                <Text style={{ fontSize: 22, color: 'white' }}>{detail}</Text>
            </View>
        )
    }


    return (
        <View>
            <ImageBackground
                source={cityImage ? {uri: cityImage} : require('../Assets/images/image5.jpg')}
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

                {errorMessage ? (
                    <View style = {styles.errorStyling}>
                        <Text style = {{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                            {errorMessage}
                        </Text>
                    </View>
                ) : null}

                {/* below conditional rendering has to be done inside View container because it contains style prop 'absolute' */}
                {
                    data ? (
                        <View style={styles.apiData}>
                            <View>
                                <Text style={styles.cityNameStyling}>{name}</Text>
                                <Text style={styles.weatherStyling}>{data['weather'][0]['main']}</Text>
                                {/* <Text style={styles.weatherStyling}>{data.weather[0].main}</Text>  this works same like the above statement*/}
                            </View>
                            <Text style={styles.tempStyle}>
                                {(data['main']['temp'] - 273).toFixed(2)}&deg;C
                            </Text>
                            <Text style={styles.weather}>WEATHER DETAILS</Text>

                            <View style={{ width: deviceWidth - 60 }}>
                                <WeatherData name='Wind Speed' detail={data['wind']['speed']} />
                                <WeatherData name='Pressure' detail={data['main']['pressure']} />
                                <WeatherData name='Humidity' detail={`${data['main']['humidity']}%`} />
                                <WeatherData name='Visibility' detail={data['visibility']} />
                                <WeatherData name='Country' detail={data['sys']['country']} />

                            </View>
                        </View>

                    ) : null
                }
            </View>

        </View>
    )
}

export default Details

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
    apiData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: deviceHeight - 100,

    },
    cityNameStyling: {
        color: 'white',
        fontSize: 40,
    },
    weatherStyling: {
        fontSize: 22,
        color: 'white',
    },
    tempStyle: {
        fontSize: 60,
        color: 'white',

    },
    weather: {
        fontSize: 22,
        color: 'white',
    },
    errorStyling:{
        justifyContent: 'center',
        alignItems: 'center',
        top: 250,
        paddingHorizontal: 10,
    }

})