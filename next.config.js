module.exports = {
    webpack: (config, { isServer }) => {
      // Agrega configuraciones personalizadas al webpack aquí
      config.module.rules.push(
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/_next',
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
        }
      );
  
      return config;
    },
  };
  