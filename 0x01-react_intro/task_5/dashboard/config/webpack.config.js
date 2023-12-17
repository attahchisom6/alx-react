const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
  },

  devServer: {
    static: './dist',
    compress: true,
    open: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:svg|gif|jpg|png|jpeg)$/i,
        // type: 'asset/resource',
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
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx' ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      name: "index.html",
      inject: false,
      template: './dist/index.html',
    }),
  ],
}
