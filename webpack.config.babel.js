import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import RobotstxtPlugin from 'robotstxt-webpack-plugin';
import path from 'path';

// postcss
import cssimport from 'postcss-import';
import cssnano from 'cssnano';
import cssnext from 'postcss-cssnext';
import cssreporter from 'postcss-reporter';
import stylelint from 'stylelint';

export default {
  context: path.resolve(__dirname, './src'),
  entry: {
    'bundle': './index.js',
  },
  output: {
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader',
        include: path.resolve(__dirname, 'src', 'shaders'),
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                stylelint(),
                cssimport({plugins: [stylelint()]}),
                cssnext({browsers: 'last 2 versions'}),
                cssnano({autoprefixer: false}),
                cssreporter({clearReportedMessages: true}),
              ],
            },
          }],
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp3)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[name]_[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
    }),
    new webpack.ProvidePlugin({
      'THREE': 'three',
    }),
    new ExtractTextPlugin({
      filename: 'style_[hash].css',
      allChunks: true,
    }),
    new FaviconsWebpackPlugin('favicon.png'),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      title: 'Le Mab',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new RobotstxtPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
