import { StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react';
import { FONTS } from '../constants/fonts'
import { FONTsize, spacing } from '../constants/dimensions'
import { TabView, SceneMap, TabBar, type SceneRendererProps } from 'react-native-tab-view';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// type for specific routes
type Route = {
  key: string;
  title: string;
};

// Define the type for the props this component will receive and we will export it to login Screen and Sign Up screen
export type LoginSignUpFormProps = {
  onSwitchTab: () => void; // It expects a function that takes no arguments and returns nothing
}


// defining THE SCENES OUTSIDE THE COMPONENT --
// This maps your route keys to your components.
// const customRenderScene = SceneMap({
//   login: LoginForm,
//   signup: SignUpForm,
// });



const customRenderScene = ({ route, jumpTo }: SceneRendererProps & { route: Route }) => {
  switch (route.key) {
    case 'login':   
      // Pass the 'jumpTo' function as a prop named 'onSwitchTab'
      return <LoginForm onSwitchTab={() => jumpTo('signup')} />;
    case 'signup':
      // Pass the 'jumpTo' function as a prop named 'onSwitchTab'
      return <SignUpForm onSwitchTab={() => jumpTo('login')} />;
  }
};



const AuthScreen = () => {

  // GET THE SCREEN WIDTH using the hook:
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();



  //for the react native tab view, note: you also need to install it's dependency 'react-native-pager-view' if you are using react native cli 
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'login', title: 'Login' },  // This 'title' becomes the label of tab bar
    { key: 'signup', title: 'Sign Up' },  //'Sign Up' becomes the label of tab bar
  ]);




  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>

      <StatusBar
        barStyle={'light-content'}  // For this specific dark screen use: 'light-content'
        translucent={true} //this hides the status bar in android 
        backgroundColor='transparent'
      />

      <View style={styles.mainHeadingContainer}>
        <Text style={styles.mainHeading}>Hey!</Text>
        <Text style={styles.subHeading}>
          {index === 0 ? 'Welcome Back' : 'Join Us'}
        </Text>
      </View>

      {/*RENDER THE TABVIEW also check the explanation at the bottom of the file*/}
      <View style={styles.loginSignupContainer}>

        <TabView
          navigationState={{ index, routes }}
          renderScene={customRenderScene}
          onIndexChange={setIndex}
          // The initialLayout prop helps with performance,USE THE NUMERIC WIDTH HERE
          initialLayout={{ width: width }}
          // Define renderTabBar inline, "Inline" means that we are defining the function directly at the place where it is being used, rather than defining it separately with a name and then referring to it by that name. use the inline method to solve TypeScript problem
          // This allows TypeScript to infer the correct props type automatically.
          renderTabBar={props => (
            <TabBar
              {...props}
              // indicatorContainerStyle={{alignItems:'center'}}
              indicatorStyle={{  //this styles our underline below tab label styles 'Login' and 'Sign Up'
                backgroundColor: '#5A2F23',
                // backgroundColor: 'transparent', // or height: 0, this hides the underline below tab bar label 'Login or Sign Up'
              }} //this styles our underline below tab label styles 'Login' and 'Sign Up'      
              style={{
                backgroundColor: '#F1E3E1',
                elevation: 0,
                shadowOpacity: 0,
              }}
              activeColor={'#5A2F23'}
              inactiveColor={'#8A6F69'}
            />
          )}
          // 
          commonOptions={{
            labelStyle: {   //this styles the label text 'Login', 'Sign Up'
              fontFamily: FONTS.poppinsBold,
              textTransform: 'none',  //this means do not apply any capitalization, just explicitly set it even though sometimes it may not make any visible change
              fontSize: FONTsize.large,
            }
          }}
        />

      </View>




    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5A2F23',
    flex: 1,
  },
  mainHeadingContainer: {
    marginTop: 160,
    paddingHorizontal: spacing.medium,
    flex:1
  },
  mainHeading: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 50,
  },
  subHeading: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 40,
    marginTop:-15,
  },
  loginSignupContainer: {
    flex: 3,
    backgroundColor: '#F1E3E1',
    borderTopRightRadius: spacing.xtraLarge,
    borderTopLeftRadius: spacing.xtraLarge,
    // paddingTop: spacing.medium,
    overflow: 'hidden', //this hides it children parts if they go out of the loginSignupContainer
  }
})


/////////////EXplanation of <TabView>  and <TabBar> :

// Part 1: The <TabView> Component (The Engine)

// Think of <TabView> as the main engine and controller of your entire tab system. It's the parent component that manages the logic, state, and scenes, but it doesn't have a specific look itself. It coordinates everything behind the scenes.

// Here is a detailed breakdown of each prop you are using on <TabView>:

// navigationState={{ index, routes }}

// This is the most important prop. It's the "brain" of the component, telling it the current situation.

// routes: This provides the map of all possible tabs. You've given it an array [{ key: 'login', ... }, { key: 'signup', ... }], so TabView knows there are two tabs, what their keys are, and what their titles should be.

// index: This tells TabView which of the tabs in your routes array is the currently active one. If index is 0, the "Login" tab is active. If index is 1, "Sign Up" is active. Your dynamic subheading {index === 0 ? 'Welcome Back' : 'Join Us'} is a perfect example of using this index value.

// renderScene={customRenderScene}

// This answers the question: "What content should I show?"
// TabView looks at the active index, finds the corresponding route key (e.g., 'login'), and then uses your customRenderScene SceneMap to find which component to display. It acts as a lookup table, connecting the route key to the actual LoginForm or SignUpForm component.

// onIndexChange={setIndex}

// This handles user interaction. It's what makes the component dynamic.
// When a user swipes or taps a different tab, TabView calculates the new index. It then calls the function you provided here, setIndex, with the new value. This updates your component's state, which causes a re-render, and the whole system updates to show the new active tab and scene.

// initialLayout={{ width: width }}

// This is a performance optimization.
// To display its content correctly, TabView needs to know the width of the screen. Normally, it would have to measure this after it first renders, which can sometimes cause a visual flicker. By providing the width upfront (from the useWindowDimensions hook), you allow it to render smoothly and immediately.

// renderTabBar={...}

// This prop tells the TabView engine: "Don't use your default, built-in tab bar. Instead, I will tell you exactly how to draw it." The function you provide here returns a JSX element that will be used as the visible tab bar at the top. This gives you complete control over its appearance.

// commonOptions={{...}}

// This is a clean and type-safe way to provide styling that should apply to all tabs equally.

// labelStyle: You are using this to define the font family, capitalization, and font size for both the "Login" and "Sign Up" labels, ensuring they have a consistent look.

// Part 2: The <TabBar> Component (The User Interface)

// Think of <TabBar> as the visible user interface that is "plugged into" the <TabView> engine. It's the physical bar that the user sees and touches. You are defining its look and feel inside the renderTabBar function.

// Here is a detailed breakdown of the props you are using on <TabBar>:

// {...props}

// This is a critical piece of wiring. The renderTabBar function receives a set of props from the TabView engine. These props contain all the necessary information for the bar to work, such as:

// The current navigationState.

// The position (an animated value used for the indicator's sliding effect).

// Functions to handle tap events (onTabPress).

// By "spreading" ...props onto your <TabBar> component, you are passing all these essential instructions down, ensuring that when a user taps on your styled tab bar, the main TabView engine knows about it.

// indicatorStyle={{...}}

// This prop styles the small underline that slides between the tabs.

// backgroundColor: '#5A2F23': You've set the color of the indicator to your primary dark brown. The comment correctly notes that you could set it to 'transparent' to hide it completely.

// style={{...}}

// This styles the container of the tab bar itself.

// backgroundColor: '#F1E3E1': You're setting the background color of the entire bar.

// elevation: 0 and shadowOpacity: 0: You are using these to remove the default shadow that often appears on Android and iOS, giving it a flat, modern look that seamlessly connects with the content below.

// activeColor={'#5A2F23'}

// This sets the text color for the label of the tab that is currently selected.

// inactiveColor={'#8A6F69'}

// This sets the text color for the label of the tab that is not currently selected, making it visually distinct from the active one