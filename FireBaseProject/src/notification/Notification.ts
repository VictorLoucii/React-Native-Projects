import { useEffect } from "react";
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging'

const requestUserPermission = async () => {

    //case for android platform:
    if (Platform.OS === 'android') {

        if (Platform.Version >= 33) {
            // Android 13+ (i.e with api 33 or above) requires POST_NOTIFICATIONS permission
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Notification permission granted');
                Alert.alert('Notification permission granted');
            }
            else {
                console.log('Notification permission denied');
                Alert.alert('Notification permission denied');
            }
        }
        else {
            // For Android < 13 i.e api 33 below, notifications are allowed by default
            console.log('Notification permission auto-granted on Android < 13');
            Alert.alert('api<33 so,no runtime permission dialog for notifications')
        }
    }
    // case for ios plaform:
    else if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Notification permission granted on iOS');
            Alert.alert('Notification permission granted');
        } else {
            console.log('Notification permission denied on iOS');
            Alert.alert('Notification permission denied');
        }
    }

}


const getFCMToken = async () => {
    try {
        const token = await messaging().getToken();
        console.log('FCM Token:----', token);
    }
    catch (error) {
        console.log('Error:-----', error);
    }
}

export const useNotification = () => {
    useEffect(() => {
        requestUserPermission();
        getFCMToken();
    }, [])
}
