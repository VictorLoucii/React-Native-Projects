import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import all the tab screens
import HomeScreen from '../screens/HomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import GiftScreen from '../screens/GiftScreen';
import MoreScreen from '../screens/MoreScreen';
import MediaScreen from '../screens/MediaScreen';

// Import your custom footer component i.e HomeScreenFooter
import HomeScreenFooter from '../components/HomeScreenFooter';

const Tab = createBottomTabNavigator();

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
            <Tab.Screen name="Connect" component={ConnectScreen} />
            <Tab.Screen name="Give" component={GiftScreen} />
            <Tab.Screen name="Media" component={MediaScreen} />
            <Tab.Screen name="More" component={MoreScreen} />

            {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        </Tab.Navigator>
    );
};

export default TabNavigator;