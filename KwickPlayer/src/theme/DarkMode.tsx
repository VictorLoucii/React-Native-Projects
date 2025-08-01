import { DefaultTheme } from "@react-navigation/native";

export const DarkMode = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bkGroundClr: '#091227',
        textPrimary: '#EAF0FF',
        textSecondary: '#A5C0FF',
        iconPrimary: '#EAF0FF',
        iconSecondary: '#8996B8',
        minTintColor: '#FFFFFF',
        maxtTintColor: '#5B5E6A',
    },

}