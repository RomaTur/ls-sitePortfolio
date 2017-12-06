
'use strict';

const path              = require('path');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const isDev             = true;
// const ProvidePlugin     = require('webpack/lib/ProvidePlugin');
// const $                 = require('jquery');

let paths = {
    src:{
        sass:'./src/sass/',
        pug: './src/pug/',
        img: './src/img/',
        js: './src/js/',
        fonts: './src/fonts/',
        php: './src/php/'
    },
    build:{
        css: './build/css/',
        js: './build/js/',
        html: './build/',
        img: './build/img/',
        fonts: './build/fonts/',
        php: './build/php/'
    },
    dir:['','about/','blog/','admin/', 'works/']
};

module.exports = {
    entry: {
        // welcome: ['babel-polyfill', paths.src.js + 'index.js'],
        // about: ['babel-polyfill', paths.src.js + 'about/index.js'],
        // blog: ['babel-polyfill', paths.src.js + 'blog/index.js'],
        // admin: ['babel-polyfill', paths.src.js + 'admin/index.js'],
        // works: ['babel-polyfill', paths.src.js + 'works/index.js']
        welcome: [paths.src.js + 'index.js'],
        about: [paths.src.js + 'about/index.js'],
        blog: [paths.src.js + 'blog/index.js'],
        admin: [paths.src.js + 'admin/index.js'],
        works: [paths.src.js + 'works/index.js']
    },
    // devtool: isDev ? 'inline-source-map' : 'hidden-source-map',
    // devtool: isDev ? 'inline-source-map': '',
    output: {
        path: path.resolve(__dirname, paths.build.js),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: isDev ? [


    ] :[
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build')
    }
};
