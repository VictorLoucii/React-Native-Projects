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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



// creating a new component for the 'ConnectStackNavigator' stack navigator which will be conencted with the bottom tab navigator(linking bottom tab navigator with stack navigator)
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


const TabNavigator = () => {

    return (

        <Tab.Navigator
            // This is the most important part: we tell the navigator to use OUR component
            tabBar={(props) => <HomeScreenFooter {...props} />}
            screenOptions={{
                headerShown: false  //hide the default header because your screens have their own
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* Use the Stack Navigator for the "Connect" tab */}
            <Tab.Screen name="Connect" component={ConnectStackNavigator} />

            {/* Use the Stack Navigator for the "Media" tab */}
            <Tab.Screen name="Media" component={MediaStackNavigator} />
            <Tab.Screen name="More" component={MoreScreen} />

        </Tab.Navigator>
    );
};

export default TabNavigator;