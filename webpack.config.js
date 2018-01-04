
'use strict';

const path              = require('path');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const isDev             = true;
const webpack           = require('webpack')

let paths = {
    src:{
        self: './src/',
        sass:'./src/sass/',
        pug: './src/pug/',
        img: './src/img/',
        js: './src/js/',
        fonts: './src/fonts/',
        php: './src/php/'
    },
    build:{
        self: './build/',
        css: './build/css/',
        js: './build/js/',
        html: './build/',
        img: './build/img/',
        fonts: './build/fonts/',
        php: './build/php/'
    },
    admin: {
        self: '.src/admin/',
        styles: './src/admin/styles',
        js: './src/admin/js'
    }
};


module.exports = {
    entry: paths.src.js+'app.js',
    output: {
      path: path.resolve(__dirname, ''),
      publicPath: paths.build.self,
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
                'svg-fill-loader/encodeSharp',
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      './src/styles/config/variables.sass',
                      './src/styles/config/extend.sass',
                      './src/styles/config/mixins.sass'
                    ]
                  }
                }
              ]
            }
          }
        }, 'eslint-loader']
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
        test: /\.(png|jpeg|jpg|gif|woff|woff2|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          'url-loader',
          {
            loader: 'svg-fill-loader?fill=white'
          }
        ]
      }]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
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
  
  if (process.env.NODE_ENV === 'production' || isDev === false) {
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
