import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import all the tab and stack navigator screens
import HomeScreen from '../screens/HomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import MoreScreen from '../screens/MoreScreen';
import MediaScreen from '../screens/MediaScreen';
import BecomeMemberScreen from '../screens/BecomeMemberScreen';
import JoinSocialGroupScreen from '../screens/JoinSocialGroupScreen';
import PrayerRequestScreen from '../screens/PrayerRequestScreen';
import SermonsScreen from '../screens/SermonsScreen';
import UpcomingEventScreen from '../screens/UpcomingEventScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

// Import your custom footer component i.e HomeScreenFooter for the bottom tab navigator
import HomeScreenFooter from '../components/HomeScreenFooter';
// Import CREATED TYPES from file 'navigationTypes.ts'
import { 
    RootTabParamList, 
    ConnectStackParamList, 
    MediaStackParamList, 
    HomeStackParamList 
} from './navigationTypes'; 

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator<RootTabParamList>();
// const Stack = createNativeStackNavigator();

//create a separate, typed Stack for each navigator component. This is best practice
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ConnectStack = createNativeStackNavigator<ConnectStackParamList>();
const MediaStack = createNativeStackNavigator<MediaStackParamList>();

// creating 'ConnectStackNavigator' which is a component for tab 'Connect' tab
const ConnectStackNavigator = () => {
    return (
        <ConnectStack.Navigator screenOptions={{
            headerShown: false
            // headerBackTitle: "",

        }}>
            <ConnectStack.Screen name='ConnectScreen' component={ConnectScreen}
                // options={{ headerShown: false }}
            />
            <ConnectStack.Screen name="BecomeMemberScreen" component={BecomeMemberScreen} />
            <ConnectStack.Screen name="JoinSocialGroupScreen" component={JoinSocialGroupScreen} />
            <ConnectStack.Screen name="PrayerRequestScreen" component={PrayerRequestScreen} />

        </ConnectStack.Navigator>
    )
}

// creating 'MediaStackNavigator' which is a component for tab 'Media' tab
const MediaStackNavigator = () => {
    return (
        <MediaStack.Navigator screenOptions={{
            headerShown: false
            // headerBackTitle: "",
        }}>
            <MediaStack.Screen name='MediaScreen' component={MediaScreen} />
            <MediaStack.Screen name="SermonsScreen" component={SermonsScreen} />
            <MediaStack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />



        </MediaStack.Navigator>
    )
}

// creating 'HomeStackNavigator' which is a component for tab 'Home' tab
const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false
            // headerBackTitle: "",
        }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name='UpcomingEventScreen' component={UpcomingEventScreen} />


        </HomeStack.Navigator>
    )
}



const TabNavigator = () => {

    return (

        <Tab.Navigator
            // This is the most important part: we tell the navigator to use OUR component
            tabBar={(props) => <HomeScreenFooter {...props} />}
            screenOptions={{
                headerShown: false  //hide the default header because your screens have their own
            }}
        >
             {/* The Tab.Screen 'name' now has autocomplete and type-checking! */}
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            {/* Use the Stack Navigator for the "Connect" tab */}
            <Tab.Screen name="Connect" component={ConnectStackNavigator} />

            {/* Use the Stack Navigator for the "Media" tab */}
            <Tab.Screen name="Media" component={MediaStackNavigator} />
            <Tab.Screen name="More" component={MoreScreen} />

        </Tab.Navigator>
    );
};

export default TabNavigator;