
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface TabBarVisibilityContextType {
  isTabBarVisible: boolean;
  setIsTabBarVisible: (isVisible: boolean) => void;
}

// Create the context with a default value
const TabBarVisibilityContext = createContext<TabBarVisibilityContextType | undefined>(undefined);

// Create a Provider component
export const TabBarVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <TabBarVisibilityContext.Provider value={{ isTabBarVisible, setIsTabBarVisible }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useTabBarVisibility = () => {
  const context = useContext(TabBarVisibilityContext);
  if (context === undefined) {
    throw new Error('useTabBarVisibility must be used within a TabBarVisibilityProvider');
  }
  return context;
};


//explanation:

// Let's break down your TabBarVisibilityContext.tsx file statement by statement. This file is a perfect, textbook example of how to properly set up a reusable Context in a React/TypeScript application.

// Overall Purpose

// The entire purpose of this file is to create a complete, self-contained system for managing and sharing a single piece of information—whether the tab bar should be visible (true or false)—across your entire app without having to pass it down manually through every component.

// 1. The Imports
// Generated typescript
// import React, { createContext, useState, useContext, ReactNode } from 'react';


// This line imports the essential building blocks from the React library:

// createContext: This is the core function from React that you call to create a new "context" object. Think of it as creating a new, shared data channel.

// useState: This is the standard React Hook for adding a state variable to a functional component. We use this inside our Provider component to actually hold and manage the isTabBarVisible value.

// useContext: This is the React Hook that allows a component to "subscribe" or "listen" to the data channel created by createContext. This is how components will read the shared value.

// ReactNode: This is a TypeScript type from React. It represents anything that React can render: JSX, strings, numbers, fragments, etc. We use it to type the children prop of our Provider, ensuring it can wrap any valid React components.

// 2. The TypeScript Interface
// Generated typescript
// interface TabBarVisibilityContextType {
//   isTabBarVisible: boolean;
//   setIsTabBarVisible: (isVisible: boolean) => void;
// }

// This interface is a TypeScript feature that defines the shape or structure of the data that our context will hold. It acts as a contract.

// isTabBarVisible: boolean;: This part of the contract says, "Any object that matches this type must have a property named isTabBarVisible, and its value must be a boolean (true or false)." This is the actual piece of data we want to share.

// setIsTabBarVisible: (isVisible: boolean) => void;: This part says, "The object must also have a property named setIsTabBarVisible, and it must be a function." It further specifies that this function must accept one argument (which we've named isVisible and typed as a boolean), and that the function does not return any value (void). This is the function we will use to change the shared data.

// 3. Creating the Context Object
// Generated typescript
// const TabBarVisibilityContext = createContext<TabBarVisibilityContextType | undefined>(undefined);```
// This is the line where we actually create the context itself.

// *   **`createContext<...>`**: We call the `createContext` function. The part in the angle brackets `<...>` is a TypeScript Generic. It tells TypeScript that this context is designed to hold data that matches the shape of our `TabBarVisibilityContextType` interface.
// *   **`| undefined`**: We add `| undefined` to tell TypeScript that the context's value *might* also be `undefined`. This is important because...
// *   **`(undefined)`**: ...the value we pass inside the `createContext()` parentheses is the **default value**. This is the value a component will receive *only if* it tries to access the context without being wrapped in a Provider. We set it to `undefined` by default, which allows us to later check if a component is being used correctly.

// ---

// ### 4. The Provider Component

// ```typescript
// export const TabBarVisibilityProvider = ({ children }: { children: ReactNode }) => {
//   const [isTabBarVisible, setIsTabBarVisible] = useState(true);

//   return (
//     <TabBarVisibilityContext.Provider value={{ isTabBarVisible, setIsTabBarVisible }}>
//       {children}
//     </TabBarVisibilityContext.Provider>
//   );
// };

// This component is the owner and manager of the shared state.

// export const TabBarVisibilityProvider = ...: We define and export a standard React component.

// ({ children }: { children: ReactNode }): This defines the component's props. It's destructured to get the special children prop. children represents any React components that you nest inside this Provider when you use it (e.g., <TabBarVisibilityProvider><App /></TabBarVisibilityProvider>).

// const [isTabBarVisible, setIsTabBarVisible] = useState(true);: This is where the magic happens. We use the useState Hook to create the actual state variable. We initialize it to true, meaning the tab bar is visible by default when the app first loads. This state lives inside the Provider component.

// return (...): The component returns JSX.

// <TabBarVisibilityContext.Provider ...>: The context object we created earlier (TabBarVisibilityContext) automatically has a special sub-component called .Provider. We must use this to make the state available.

// value={{ isTabBarVisible, setIsTabBarVisible }}: This is the most critical prop. The value prop is where we "broadcast" our data. We pass it an object that perfectly matches our TabBarVisibilityContextType interface: it contains the current state (isTabBarVisible) and the function to update that state (setIsTabBarVisible).

// {children}: Inside the Provider, we render the children. This means any component nested inside our Provider will now be able to access the value we provided.

// 5. The Custom Hook
// Generated typescript
// export const useTabBarVisibility = () => {
//   const context = useContext(TabBarVisibilityContext);
//   if (context === undefined) {
//     throw new Error('useTabBarVisibility must be used within a TabBarVisibilityProvider');
//   }
//   return context;
// };

// This is a convenience hook that makes using our context cleaner and safer.

// export const useTabBarVisibility = () => ...: We define and export a custom hook (by convention, hook names start with "use").

// const context = useContext(TabBarVisibilityContext);: We use the useContext hook, passing it our context object. React looks up the component tree, finds the nearest TabBarVisibilityContext.Provider, and gives us its value prop.

// if (context === undefined) { ... }: This is a crucial safety check. Remember how we set the default context value to undefined? This if statement checks for that case. If context is undefined, it means this hook was called from a component that is not a descendant of our <TabBarVisibilityProvider>.

// throw new Error(...): If the safety check fails, we throw an error. This immediately stops the app and gives the developer a very clear message explaining exactly what they did wrong. This prevents silent bugs.

// return context;: If the safety check passes, we know context is the object we provided in the value prop, and we return it. Now the component that called this hook has access to both isTabBarVisible and setIsTabBarVisible.