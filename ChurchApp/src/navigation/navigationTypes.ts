// this file will be the single source of truth for all our navigation related types:
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps, } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native'; // Important for nesting
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';   //for navigation prop type


export type Comment = {
  id: number;
  created_at: string;
  content: string;
  user_id: string;
  profiles: {
    username: string | null;
    avatar_url: string | null;
  };
};

// define the shape of the data we pass around
export type vid = {
  id: number;
  title: string;
  creator: string; 
  date: string;
  thumbnail_url: string;
  video_url: string;
  description: string | null;
};

// --- Stack Navigator Type Definitions ---
//create a ParamList for each Stack Navigator you have

// For the stack inside the "Media" tab
export type MediaStackParamList = {
  MediaScreen: undefined;
  // SermonsScreen: undefined;
  VideoListScreen: { title: string; tableName: string };
  VideoPlayerScreen: { video: vid, videoType: string; }; // This screen Requires a 'video' parameter (type: vid) and a 'videoType' parameter (type: string).
};

// For the stack inside the "Connect" tab
export type ConnectStackParamList = {
  ConnectScreen: undefined;
  BecomeMemberScreen: undefined;
  JoinSocialGroupScreen: undefined;
  PrayerRequestScreen: undefined;
};

// For the stack inside the "Home" tab
export type HomeStackParamList = {
  HomeScreen: undefined;
  UpcomingEventScreen: undefined;
};

// For the stack inside the "More" tab
export type MoreStackParamList = {
  MoreScreen: undefined;
  EditProfileScreen: undefined;
};


// --- Bottom Tab Navigator Type Definition ---
// This defines the names of your tabs
export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>; // The "Home" tab contains the HomeStack
  Connect: NavigatorScreenParams<ConnectStackParamList>; // The "Connect" tab contains the ConnectStack
  Media: NavigatorScreenParams<MediaStackParamList>; // The "Media" tab contains the MediaStack
  More: NavigatorScreenParams<MoreStackParamList>;
};


// --- Screen Prop Type Definitions ---
// below are the navigation prop types which we will export. // This is our library of reusable types for all screens.
// This makes it easier to type your screens. we can now import these directly.

// Props for any screen in the Media Stack
// --- Screen Prop Type Definitions ---
// This is our library of reusable types for all screens:

// --- Home Stack Types ---
export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;
export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;  //now import these in screens of Home Stack and then wrap it in <> in use navigation


// --- Connect Stack Types ---
export type ConnectStackScreenProps<T extends keyof ConnectStackParamList> =
  NativeStackScreenProps<ConnectStackParamList, T>;
export type ConnectStackNavigationProp = NativeStackNavigationProp<ConnectStackParamList>;//now import these in screens of Home Stack and then wrap it in <> in use navigation



// --- Media Stack Types ---
export type MediaStackScreenProps<T extends keyof MediaStackParamList> =
  NativeStackScreenProps<MediaStackParamList, T>;
export type MediaStackNavigationProp = NativeStackNavigationProp<MediaStackParamList>;//now import these in screens of Home Stack and then wrap it in <> in use navigation
// Specific route prop for convenience
export type VideoPlayerScreenRouteProp = MediaStackScreenProps<'VideoPlayerScreen'>['route'];//now import these in screens of Home Stack and then wrap it in <> in use navigation



// --- More Stack Types ---
export type MoreStackScreenProps<T extends keyof MoreStackParamList> =
  NativeStackScreenProps<MoreStackParamList, T>;
export type MoreStackNavigationProp = NativeStackNavigationProp<MoreStackParamList>;//now import these in screens of Home Stack and then wrap it in <> in use navigation





////////////////////////////////////////////
//explanation:

// The following two lines are a fantastic example of advanced TypeScript patterns (specifically Generics and Indexed Access Types) that make your code much more reusable and maintainable.


// Statement 1: The Generic "Type Factory"

// export type MediaStackScreenProps<T extends keyof MediaStackParamList> =
//   NativeStackScreenProps<MediaStackParamList, T>;


// What it is: This line creates a flexible, reusable "type template" or a "type factory." Its job is to generate the correct prop types (navigation and route) for any screen within your MediaStack.

// Let's dissect the pieces:

// export type MediaStackScreenProps<...> = ...

// We are creating and exporting a new type named MediaStackScreenProps.

// The <...> part makes it a Generic Type. Think of it like a function that takes a type as an argument and produces a new type as a result.

// <T extends keyof MediaStackParamList>

// This is the "argument" for our generic type.

// T is a placeholder for a type (a common convention, like i in a for loop).

// extends keyof MediaStackParamList is a constraint. It means that T can't be just anything; it must be one of the keys (i.e., screen names) from your MediaStackParamList.

// In your case, T can only be 'MediaScreen', 'SermonsScreen', or 'VideoPlayerScreen'.

// NativeStackScreenProps<MediaStackParamList, T>

// This is the "master template" provided by React Navigation.

// It takes two arguments:

// The full ParamList for the navigator (MediaStackParamList).

// The specific screen name (T) we are interested in.

// It returns a complete props object type, like { navigation: ..., route: ... }, tailored specifically for screen T.

// In Simple English:

// "Create a reusable type template called MediaStackScreenProps. It takes one argument, T, which must be a screen name from our MediaStack. In return, it will give back the official, fully-typed props object (containing navigation and route) for that specific screen."

// How you would use it:

// Generated typescript
// import { MediaStackScreenProps } from './navigationTypes';

// // Type the entire component's props
// const SermonsScreen: React.FC<MediaStackScreenProps<'SermonsScreen'>> = ({ navigation, route }) => {
//   // `navigation` and `route` are now perfectly typed for SermonsScreen
//   // ...
// };

// This is a powerful pattern because you define it once and can reuse it for every screen in the MediaStack.

// Statement 2: The Specific "Shortcut Type"
// export type VideoPlayerScreenRouteProp = MediaStackScreenProps<'VideoPlayerScreen'>['route'];


// What it is: This line uses the "type factory" we created in Statement 1 to create a very specific, non-generic "shortcut" type because it doesn't contain <...>. It represents only the route prop for only the VideoPlayerScreen.

// Let's dissect the pieces:

// MediaStackScreenProps<'VideoPlayerScreen'>

// Here, we are using our generic type from Statement 1.

// We pass the string literal 'VideoPlayerScreen' as the argument T.

// The result is the full props object type specifically for the VideoPlayerScreen. This resulting type looks like this:

// {
//   navigation: // The specific navigation prop for VideoPlayerScreen
//   route: { // The specific route prop for VideoPlayerScreen
//     key: string;
//     name: 'VideoPlayerScreen';
//     params: { sermon: vid; }
//   }
// }


// ['route']

// This is an Indexed Access Type. It's like accessing a property on an object, but you're doing it at the type level.

// It says: "From that full props object type we just generated, pluck out the type of the route property."

// In Simple English:

// "Create a new type named VideoPlayerScreenRouteProp. To get its definition, first use our MediaStackScreenProps factory to generate the full props for the 'VideoPlayerScreen', and then from that result, extract and give me only the type for its route property."

// How you use it (exactly as you did in your code):

// Generated typescript
// import { VideoPlayerScreenRouteProp } from '../navigation/navigationTypes';

// // ... inside your VideoPlayerScreen component
// const route = useRoute<VideoPlayerScreenRouteProp>();

// // `route` is now perfectly typed, and TypeScript knows `route.params.sermon` exists.

// This is a convenience. It's much cleaner to import and use the simple VideoPlayerScreenRouteProp name than to write useRoute<MediaStackScreenProps<'VideoPlayerScreen'>['route']>() every time.