import { DefaultTheme } from "@react-navigation/native";

export const LightMode = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bkGroundClr: '#FFFFFF',
        textPrimary: '#000000',  //black
        textSecondary: '#FFFFFF',  //white
        icon: '#000000',  //black
        settingsBGC: '#F5F6FA',
        mediaBGC: '#F5F6FA',
        settingOptionsBGC: '#FFFFFF',

        // --- ADDED FOR TAB BAR ---
        border: '#A96F00', // goldish color
        tabBarBGC: '#F5F6FA',
        tabBarIconActive: '#A96F00',
        tabBarIconInactive: '#000000',  //black
        searchInputBGC: '#F2F6FA',
        notifiBGC: '#F5F6FA',
        notifiIcon: '#000000',
       

    },
}