module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Correct way to pass options to a plugin:
    ['react-native-reanimated/plugin', {
      disableStrict: true,
    }],
  ],
};