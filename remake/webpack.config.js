var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    entry: './src/main.js',
    styles: './src/styles/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: [
              'vue-style-loader',
              'css-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    './src/components/sass/config/variables.sass',
                    './src/components/sass/config/extend.sass',
                    './src/components/sass/config/mixins.sass',
                    './src/components/sass/layout/fonts.sass',
                    './src/components/sass/layout/base.sass',
                    './src/components/sass/layout/adjustment.sass'
                  ]
                }
              }
            ]
          }
        }
      }]
    },
    {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader?indentedSyntax'
      ]
    },
    {
      test: /\.(png|jpeg|jpg|gif|woff|woff2|ico|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'img': path.resolve(__dirname, './src/assets/img'),
      'fonts': path.resolve(__dirname, './src/assets/fonts')
    },
    extensions: ['.js', '.vue'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/components')
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    open: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
