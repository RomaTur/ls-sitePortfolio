var path = require('path');

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
        css: './build/css',
        js: './build/js',
        html: './build/',
        img: './build/img',
        fonts: './build/fonts',
        php: './build/php/'
    }
}

module.exports = {
 entry: paths.src.js + 'index.js',
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, paths.build.js)
 },
 devServer:{
    // contentBase: path.join(__dirname, "build"),
    compress: true,
    openPage: 'localhost:8888/ls-sitePortfolio/build',
    hot: true
 }
};
