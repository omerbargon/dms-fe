module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path:
          process.env.NODE_ENV === 'production'
            ? '.env.production'
            : '.env.development',
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
