import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

//vector icons:
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'

//constants:
// import { colors } from '../constants/colors';
import { iconSizes, spacing } from '../constants/dimensions';
import { useNavigation, useTheme } from '@react-navigation/native';

// Import the specific navigation type for a Drawer
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CustomTheme } from '../theme/CustomTheme';


type RootDrawerParamList = {
  HomeScreen_Drawer: undefined;
};

const Header = () => {

  const { colors } = useTheme() as CustomTheme;

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  // Now, TypeScript knows this 'navigation' object has a .toggleDrawer() method
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  }


  return (
    <View style={styles.vectorIcons}>
      <TouchableOpacity
        onPress={toggleDrawer}
      >
        <FontAwesome5
          name={"grip-lines"}
          color={colors.iconPrimary}
          size={iconSizes.large}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign
          name={'search1'}
          color={colors.iconPrimary}
          size={iconSizes.large}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  vectorIcons: {
    paddingTop: 50,
    paddingHorizontal: spacing.large,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,

  }
})