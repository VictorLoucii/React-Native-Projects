import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import all the tab and stack navigator screens
import HomeScreen from '../screens/HomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import MoreScreen from '../screens/MoreScreen';
import MediaScreen from '../screens/MediaScreen';
import BecomeMemberScreen from '../screens/BecomeMemberScreen';

// Import your custom footer component i.e HomeScreenFooter for the bottom tab navigator
import HomeScreenFooter from '../components/HomeScreenFooter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JoinSocialGroupScreen from '../screens/JoinSocialGroupScreen';
import PrayerRequestScreen from '../screens/PrayerRequestScreen';
import SermonsScreen from '../screens/SermonsScreen';
import UpcomingEventScreen from '../screens/UpcomingEventScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



// creating 'ConnectStackNavigator' which is a component for tab 'Connect' tab
const ConnectStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
            // headerBackTitle: "",

        }}>
            <Stack.Screen name='ConnectScreen' component={ConnectScreen}
                // options={{ headerShown: false }}
            />
            <Stack.Screen name="BecomeMemberScreen" component={BecomeMemberScreen} />
            <Stack.Screen name="JoinSocialGroupScreen" component={JoinSocialGroupScreen} />
            <Stack.Screen name="PrayerRequestScreen" component={PrayerRequestScreen} />

        </Stack.Navigator>
    )
}

// creating 'MediaStackNavigator' which is a component for tab 'Media' tab
const MediaStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
            // headerBackTitle: "",
        }}>
            <Stack.Screen name='MediaScreen' component={MediaScreen} />
            <Stack.Screen name="SermonsScreen" component={SermonsScreen} />


        </Stack.Navigator>
    )
}

// creating 'HomeStackNavigator' which is a component for tab 'Home' tab
const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
            // headerBackTitle: "",
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name='UpcomingEventScreen' component={UpcomingEventScreen} />


        </Stack.Navigator>
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