import { DefaultTheme } from "@react-navigation/native";

export const LightMode = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        bkGroundClr: '#F7FAFF',
        textPrimary: '#091127',
        textSecondary: '#899688',
        iconPrimary: '#091127',
        iconSecondary: '#8996B8',
        minTintColor: '#091227',
        maxtTintColor: '#D3D7DF',
    },

}