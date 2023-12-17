const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: "inline-source-map",
  entry: {
    shared: 'jquery',
    header: {
      import: "./modules/header/header.js",
      dependOn: "shared",
    },
    body: {
      import: "./modules/body/body.js",
      dependOn: "shared",
    },
    footer: {
      import: "./modules/footer/footer.js",
      dependOn: "shared",
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    port: 8564,
    client: {
      logging: 'none',
    },
    onListening: (server) => {
      const address = server.listeningApp?.address();
      if (address) {
        const port = address.port;
        const host = address.host;
        console(`Runnig webpack server on ${host}:${port}`);
      } else {
        console.log("Running webpack server");
      }
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000009,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(?:ico|gif|jpeg|jpg|png)$/i,
        type: "asset/resource",
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Output",
    }),
    new CleanWebpackPlugin(),
  ],
}
