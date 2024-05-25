module.exports = {
  webpack: (config, { isServer }) => {
    // Desactivar la resolución de enlaces simbólicos
    config.resolve.symlinks = false;

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

    if (!isServer) {
      // Configura el nombre del archivo de salida del chunk para que coincida con el nombre del archivo de origen
      config.output.chunkFilename = '[name].js';
    }

    return config;
  },
};
