import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

//vector icons:
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'

//constants:
// import { colors } from '../constants/colors';
import { FONTsize, iconSizes, spacing } from '../constants/dimensions';
import { useNavigation, useTheme } from '@react-navigation/native';

// Import the specific navigation type for a Drawer
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CustomTheme } from '../theme/CustomTheme';
import useSearchStore from '../ZustandStore/SearchStore';
import { fonts } from '../constants/fonts';


type RootDrawerParamList = {
  HomeScreen_Drawer: undefined;
};

const Header = () => {

  const { isSearchActive, searchQuery, toggleSearch, setSearchQuery } = useSearchStore();

  const { colors } = useTheme() as CustomTheme;

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  // Now, TypeScript knows this 'navigation' object has a .toggleDrawer() method
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  }

  return (
    // Use a <View> or a Fragment <>...</> around the conditional blocks:
    <View>
      {/* conditional rendering */}
      {/* This is the "Normal View" UI when isSearchActive is false */}
      {!isSearchActive && (
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
          <TouchableOpacity
            onPress={()=>toggleSearch(true)}
          >
            <AntDesign
              name={'search1'}
              color={colors.iconPrimary}
              size={iconSizes.large}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* This is the "Search View" UI (when isSearchActive = true) */}
      {isSearchActive && (
        <View style={styles.searchContainer}>
          {/* The back arrow to exit search mode */}
          <TouchableOpacity onPress={() => toggleSearch(false)}>
            <AntDesign
              name={'arrowleft'}
              color={colors.iconPrimary}
              size={iconSizes.large}
            />
          </TouchableOpacity>

          {/* The text input for searching */}
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary, borderColor: colors.textPrimary }]}
            placeholder="Search for songs or artists..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            autoFocus={true} // Automatically focus the input when it appears
          />
        </View>
      )}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  vectorIcons: {
    // paddingTop: 50,
    paddingHorizontal: spacing.large,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingBottom: 20,

  },
  searchContainer: {
    // paddingHorizontal: spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 20,
    height: 50, // Give it the same fixed height
    gap: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.medium,
    borderBottomWidth: 1,
    paddingVertical: spacing.small,
    fontFamily: fonts.Regular,
    fontSize: FONTsize.medium,
  },
})