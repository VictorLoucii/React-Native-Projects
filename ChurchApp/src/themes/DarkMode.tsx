import { DefaultTheme } from "@react-navigation/native";

export const DarkMode = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bkGroundClr: '#131314',
        textPrimary: '#FFFFFF',  //white
        textSecondary: '#000000',   //black
        icon: "#FFFFFF",  //white
        settingsBGC: '#131314',
        mediaBGC:'#131314',
        settingOptionsBGC: '#FFFFFF',

              // --- ADDED FOR TAB BAR ---
        border: '#A96F00', // For the top border line
        tabBarBGC: '#131314',
        tabBarIconActive: '#A96F00',
        tabBarIconInactive: '#FFFFFF',
        searchInputBGC:'#FFFFFF',
        notifiBGC: '#F5F6FA',
         notifiIcon: '#000000',
      
    },
}
