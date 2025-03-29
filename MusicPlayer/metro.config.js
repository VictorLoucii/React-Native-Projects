const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = {};

// Merge default config with your custom config
const finalConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Wrap with Reanimated's metro config
module.exports = wrapWithReanimatedMetroConfig(finalConfig);
