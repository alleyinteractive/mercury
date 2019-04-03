module.exports = {
    plugins: [
      'lodash',
      'react-hot-loader/babel',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
        {
          root: ['./client'],
          alias: {
            components: './components',
            hooks: './hooks',
            services: './services',
            stores: './stores',
          },
        },
      ],
    ],
    presets: [
      '@babel/env',
      '@babel/react',
    ],
  };
