//UseNotificatoin.ts:

import { useEffect } from 'react';
import {PermissionsAndroid} from 'react-native'; 
import messaging from '@react-native-firebase/messaging'


const requestUserPermission = async() => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    if(granted === PermissionsAndroid.RESULTS.GRANTED){
        console.log('Notification permission granted');
    }else{
        console.log('Notification permission denied');
    }
}

const getToken = async() =>{
    try{
        const token = await messaging().getToken();  
        console.log('FCM token:---',token);
    }
    catch(error){
        console.log('Failed to get FCM Token, error:----',error);
    }
}

export const useNotification = () => {
    
    useEffect(() =>{
        requestUserPermission();
        getToken();
    },[])
}