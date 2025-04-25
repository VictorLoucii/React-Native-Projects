import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const HomeScreen = () => {

    const [dish, setDish] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    const getDataFromFirestore = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch only one document since you only display one
            const foodCollection = await firestore().collection('foodItems').limit(1).get();

            if (!foodCollection.empty) { // Check if we got any documents
                console.log('foodCollection:-----', foodCollection.docs[0].data());
                setDish(foodCollection.docs[0].data());
            } else {
                console.log('No documents found in firestore');
                setError('No dish data found'); // Set specific error if no data
            }
        } catch (err) { // Renamed error variable to avoid conflict
            console.log('Error fetching data:----', err);
            setError('Failed to load dish data'); // Set generic error on fetch failure
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    }

    useEffect(() => {
        getDataFromFirestore();
    }, [])

    // --- Helper function for conditional rendering ---    
    const renderContent = () => {
        if (loading) {
            return (
                <ActivityIndicator
                    size="large"
                    color="#ffffff" // White color for visibility on dark background
                />
            )
        }
        if (error) {
            // Display the error message
            <Text>{error}</Text>
        }
        // Only render dish details if dish data exists
        if (dish) {
            return (
                <View style={styles.dishContainer}>
                    <View style={styles.dishImageContainer}>
                        {/* IMPORTANT: Check if imageURL exists AND is a non-empty string */}
                        {dish.imageUrl && typeof dish.imageUrl === 'string' ? (
                            <Image
                                source={{ uri: dish.imageUrl }}
                                style={styles.dishImage} // <-- MUST provide width/height 
                            />
                        ) : (
                            <Text>no image</Text>
                        )
                        }
                    </View>
                    <View style={styles.dishDetails}>
                        <Text style = {styles.dishText}>{dish?.title ?? 'Not Available'}</Text>
                        <Text style = {styles.dishText}>{dish?.price ?? 'Not Available'}</Text>
                        <Text style = {styles.dishText}>{dish?.rating ?? 'Not Available'}</Text>
                    </View>

                </View>
            )
        }
        // Fallback message if not loading, no error, but also no dish data
        return <Text style={styles.dishText}>No dish details available.</Text>;

    };  // --- End Helper function ---


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background.png')}
                style={styles.imageBkground}
            >
                <View style={styles.borderContainer}>
                    <View style={styles.welcomeView}>
                        <Text style={styles.welcomeText}>Welcome to</Text>
                    </View>
                    <View style={styles.thisIstheHomePageView}>
                        <Text style={styles.thisIstheHomeText}>Products</Text>
                    </View>
                    <View style={styles.goToSignUpView}>
                        <Text style={styles.goToSignUpText}>click here to go to  the SignUp Screen</Text>
                    </View>
                </View>
                {renderContent()}


            </ImageBackground>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    imageBkground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderContainer: {
        height: 420,
        width: 300,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
    },
    welcomeView: {
        marginTop: 50,
    },
    welcomeText: {
        fontSize: 30,
        fontFamily: 'Audiowide-Regular',
        color: 'white',
    },
    thisIstheHomePageView: {
        marginTop: 190,
        paddingHorizontal: 20,

    },
    thisIstheHomeText: {
        fontSize: 30,
        fontFamily: 'Audiowide-Regular',
        color: 'white',
    },
    goToSignUpView: {
        marginTop: 40,
        width: '90%',
        paddingHorizontal: 30,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 5,

    },
    goToSignUpText: {
        fontSize: 20,
        fontFamily: 'Langar-Regular',
        color: 'white',
    },
    dishContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dishImageContainer: {
        left: -25,
    },
    dishImage:{
        height: 100,
        width: 150,
        borderRadius: 5,
    },
    dishDetails:{
        left:-10,
        bottom: 6,
    },
    dishText:{
        fontSize: 20,
        fontFamily: 'Langar-Regular'
    }

})