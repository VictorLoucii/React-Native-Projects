import { create } from 'zustand';

//defined a hook 'useThemeStore':
export const useThemeStore = create((set) => ({
  isDarkMode: false, //default value of isDarkMode
  toggleTheme: (value) =>
    set((state) => ({ isDarkMode: value !== undefined ? value : !state.isDarkMode })),
}));


//explanation: (also check the doc: RNjs)
// This file uses the Zustand library to create a small, efficient, and centralized place to manage your application's theme (Dark Mode vs. Light Mode).

// The file defines a custom React hook called useThemeStore. Any component in your app can use this hook to:

// 1. import { create } from 'zustand';

// import ... from 'zustand': This line imports the necessary tools from the Zustand library.

// { create }: create is the primary function provided by Zustand. You call this function to build your state "store". It takes a configuration function as an argument and returns a custom hook that your components can use.

// 2. export const useThemeStore = create(...)

// export: This keyword makes the useThemeStore hook available to be imported and used in other files across your application, like App.tsx and CustomDrawerContent.tsx.

// const useThemeStore: This declares a constant named useThemeStore. By convention, React hooks start with the word use. This is the custom hook you will call in your components.

// = create(...): You are calling the create function and assigning its return value (the newly created hook) to your useThemeStore constant.

// 3. (set) => ({ ... })

// This is the configuration function you pass to create. It defines the entire structure of your store.

// (set): The create function gives you one powerful argument: set. The set function is the only way to update the state in your store. You call it whenever you want to make a change.

// => ({ ... }): This arrow function returns an object. This object represents your store's "slice"—it contains both the state variables (the data) and the actions (the functions that modify the data).

// 4. isDarkMode: true,

// isDarkMode: This is a piece of state within your store. It's a key in your store's object.

// : true: This is the initial or default value for isDarkMode. This means that when your app first loads, the theme will be Dark Mode by default. The comment you added, 

// 5. toggleTheme: (value) => set(...)

// This defines an action—a function that lives inside your store and is used to modify its state.

// toggleTheme: The name of your action. You will call toggleTheme() from your components to change the theme.

// (value):  value is NOT the LightMode or DarkMode object. It is expected to be a boolean (true or false), or undefined if not provided i.e empty parnthesis(). This action is defined to accept an optional parameter named value. This makes it very flexible.

// Let's look at your two scenarios.

// Scenario 1: Toggling the Theme (What you are currently doing)

// This happens in your CustomDrawerContent.tsx file:

// Generated javascript
// <TouchableOpacity onPress={() => toggleTheme()}>
//     <Octicons
//         name={isDarkMode ? 'moon' : 'sun'}
//         // ...
//     />
// </TouchableOpacity>


// When the user presses this button, you call toggleTheme().

// How it's called: You call the function with no arguments: toggleTheme().

// What is value?: Since no argument was passed, value inside the function is undefined.

// The logic: Let's trace the expression { isDarkMode: value ? value : !state.isDarkMode }.

// The condition value ? is evaluated. Since value is undefined, JavaScript treats it as "falsy".

// Because the condition is false, the expression after the colon (:) is executed: !state.isDarkMode.

// !state.isDarkMode takes the current value of isDarkMode and flips it.

// If state.isDarkMode was true, it becomes false.

// If state.isDarkMode was false, it becomes true.

// so when we come back to this statement in CustomDrawerContent.tsx file:
// <Octicons
//     name={isDarkMode ? 'moon' : 'sun'}
//     />
//     here true = moon and false = sun icons will be displayed in the ui

// Conclusion: Calling toggleTheme() with no arguments toggles the theme. This is how the "moon" and "sun" icon switch works.

// Scenario 2: Explicitly Setting the Theme (The purpose of value)

// The value ? value part of the expression is for situations where you want to force the theme to a specific state, instead of just toggling it. You are not currently doing this in your code, but here is how you would do it.

// Imagine you had two separate buttons: one to always set Dark Mode and one to always set Light Mode.

// Generated javascript
// // A button to ALWAYS set the theme to DARK
// <Button
//   title="Activate Dark Mode"
//   onPress={() => toggleTheme(true)}  // We pass `true` as the value
// />

// // A button to ALWAYS set the theme to LIGHT
// <Button
//   title="Activate Light Mode"
//   onPress={() => toggleTheme(false)} // We pass `false` as the value
// />

// Now let's see what happens when you press the "Activate Dark Mode" button:

// How it's called: toggleTheme(true).

// What is value?: The value parameter is true.

// The logic: Let's trace { isDarkMode: value ? value : !state.isDarkMode }.

// The condition value ? is evaluated. Since value is true, the condition is "truthy".

// Because the condition is true, the expression right after the question mark (?) is executed: value.

// The state isDarkMode is set to the value of value, which is true.

// Conclusion: Calling toggleTheme(true) sets isDarkMode to true. Calling toggleTheme(false) sets isDarkMode to false. This allows you to directly set the state without caring what the previous state was.

// The line in App.tsx:
// <NavigationContainer theme={isDarkMode ? DarkMode : LightMode}>

// This line does not call toggleTheme. It reads the isDarkMode state from your Zustand store.

// When isDarkMode is true, it gives the DarkMode theme to NavigationContainer.

// When isDarkMode is false, it gives the LightMode theme to NavigationContainer.

// This is the result of your state change, not the cause of it. When you press the button in CustomDrawerContent, isDarkMode changes, which causes App.tsx to re-render and select the correct theme object.