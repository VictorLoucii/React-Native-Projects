//defining custom theme:

export interface CustomColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  bkGroundClr: string;
  textPrimary: string;
  textSecondary: string;
  iconPrimary: string;
  iconSecondary: string;
  minTintColor: string;
  maxtTintColor: string;
  icon: string;
  settingsBGC: string;
  mediaBGC: string;
  settingOptionsBGC: string;
  tabBarBGC: string;
  tabBarIconActive: string;
  tabBarIconInactive: string;
  searchInputBGC: string,
  notifiBGC: string,
  notifiIcon: string;
 
}

export interface CustomTheme {
  dark: boolean;
  colors: CustomColors;
}


// i am using CustomTheme.ts file because of the reason:
// i can't access colors. properties which i have defined in DarkMode.tsx and LightMode.tsx files. i am only able to get the default values.

// to use the CustomTheme.ts files in my components i have to do this:
// import { useTheme } from '@react-navigation/native'
// import { CustomTheme } from 'src/theme/CustomTheme

// const { isDarkMode, toggleTheme} = useThemeStore();

//NOTE: when i tried using navigation.d.ts file i still wasn't able to get colors.  properties from my DarkMode.tsx and LightMode.tsx files, was only getting the DefaultTheme.colors object properties thus i switched to CustomTheme.ts approach which was working at the moment.



// Future Considerations for CustomTheme.ts :

// Your current approach works well by explicitly defining the shape of your theme. However, this means you need to be aware of how changes, particularly from external libraries, might affect your custom type definitions.

// 1. React Navigation Updates (@react-navigation/native):

// Scenario: React Navigation might release updates where they add new standard color properties to their DefaultTheme.colors object (e.g., they might introduce shadowColor, overlayColor, etc.).

// Impact on your CustomColors:

// Your CustomColors interface currently explicitly lists all standard and custom properties.

// If React Navigation adds a new standard color (e.g., newStandardColor: string), your CustomColors interface will not automatically include it.

// When you use useTheme() as CustomTheme, TypeScript will then try to assert that the Theme object (which does contain newStandardColor in an updated React Navigation version) is compatible with your CustomTheme (which doesn't).

// What you'll see: You will likely get a TypeScript error in your IDE (and potentially during compilation) stating that Type 'Theme' is not assignable to type 'CustomTheme' or Property 'newStandardColor' is missing in type 'CustomColors' but required in type 'ThemeColors'.

// Action Required: If you encounter such an error after updating @react-navigation/native, you will need to manually add any new standard color properties defined by React Navigation into your CustomColors interface in CustomTheme.ts.

// Scenario: Less common, but React Navigation could potentially remove or rename an existing standard color property.

// Impact on your CustomColors: Your CustomColors interface would still define the removed/renamed property. TypeScript might not complain immediately if you don't use it, but it could lead to runtime issues or dead code if you're trying to set that property in your DarkMode.tsx/LightMode.tsx and it's no longer expected by the library.

// Action Required: Review React Navigation's release notes for breaking changes to theme properties. If a property is removed/renamed, you'll need to update your CustomColors interface accordingly.

// 2. Your Own Custom Color Additions/Removals:

// Scenario: You decide to add a new custom color (e.g., brandAccent) or remove an old one from your palette.

// Impact: You need to perform a two-step update for consistency:

// Update CustomColors: Add/remove the property in src/theme/CustomTheme.ts.

// Update Theme Objects: Add/remove the corresponding value in src/theme/DarkMode.tsx and src/theme/LightMode.tsx.

// Action Required: Be diligent about keeping your CustomColors interface in CustomTheme.ts perfectly in sync with the actual properties you define and use in your DarkMode.tsx and LightMode.tsx theme objects.

// 3. maxtTintColor vs maxTintColor:

// This is a minor point we discussed, but a good example of consistency. While maxtTintColor works because you've defined it consistently, the standard camelCase is maxTintColor. If you ever decide to refactor to the standard name, you'll need to change it in:

// CustomColors interface in CustomTheme.ts.

// DarkMode.tsx.

// LightMode.tsx.

// In essence:

// Your chosen method requires you to be more proactive in manually synchronizing your CustomColors interface with any changes to the underlying DefaultTheme.colors from React Navigation, as well as with your own custom palette changes. This is the trade-off compared to module augmentation, which automatically "inherits" new standard properties.

// As long as you are mindful of these points and review release notes for @react-navigation/native during updates, your current setup is perfectly maintainable.