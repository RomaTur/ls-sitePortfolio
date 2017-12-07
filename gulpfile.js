'use strict';

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sassGlob      = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS      = require('gulp-cleancss');
const imagemin      = require('gulp-imagemin');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');
const sourcemaps    = require('gulp-sourcemaps');
const replace       = require('gulp-replace');
const del           = require('del');
const plumber       = require('gulp-plumber');
const browserSync   = require('browser-sync');
const autoprefixer  = require('gulp-autoprefixer');
const pug           = require('gulp-pug');
const svgSprite     = require('gulp-svg-sprites');
const svgmin        = require('gulp-svgmin');
const cheerio       = require('gulp-cheerio');
const gulpWebpack   = require('gulp-webpack');
const webpack       = require('webpack');
// const gutil         = require('gulp-util');
// const notifier      = require('node-notifier');
// const babel         = require('gulp-babel');


let webpackConfig = require('./webpack.config.js');
// let statsLog      = { // для красивых логов в консоли
//   colors: true,
//   reasons: true
// };

const paths =  {
    src:{
        self: 'src',
        sass:'./src/sass/',
        pug: './src/pug/',
        img: './src/img/',
        js: './src/js/',
        fonts: './src/fonts/',
        php: './src/php/'
    },
    build:{
        self: 'build',
        css: './build/css/',
        js: './build/js/',
        html: './build/',
        img: './build/img/',
        fonts: './build/fonts/',
        php: './build/php/'
    },
    all: '**/*.*',
    project: 'ls-sitePortfolio/' // paths.project - name of project
};


////////////////////////////////////
////////////BUILD///////////////////
////////////////////////////////////

////Обработка jpg,png,jpeg 
gulp.task('img:build',function(){
    return gulp.src([paths.src.img + '**/*.{jpg,png,jpeg}'])
            .pipe(plumber())
            .pipe(imagemin({ // скудное сжатие
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(paths.build.img))
            .pipe(browserSync.reload({stream: true})); //перезагрузка браузера
});

//Просто перетаскивание шрифтов( потом добавлю их обработку )
gulp.task('fonts:build',function(){
    return gulp.src(paths.src.fonts + paths.all)
                .pipe(plumber())
                .pipe(gulp.dest(paths.build.fonts))
                .pipe(browserSync.reload({stream: true}));
});

//Просто перетаскивание favicon
gulp.task('favicon:build',function(){
    return gulp.src(paths.src + 'favicon.ico')
                .pipe(plumber())
                .pipe(gulp.dest(paths.build.self))
                .pipe(browserSync.reload({stream: true}));
});

//Пока что только перетаскивание php шрифтов
gulp.task('php:build',function(){
    return gulp.src(paths.src.php + '**/*.php')
                .pipe(plumber())
                .pipe(gulp.dest(paths.build.php))
                .pipe(browserSync.reload({stream: true}));
});

// Создание спрайта из иконок
gulp.task('sprites:build', function () {
    return gulp.src(paths.src.img + 'icons/*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');// удаляем инлайновое назначение цвета чтобы в css задать
            }
        }))
        .pipe(svgSprite({mode: "symbols"}))//к иконке теперь можно обращаться img/svg/symbols.svg#icon
        .pipe(gulp.dest(paths.build.img))
        .pipe(browserSync.reload({stream: true}));
});

// Компиляция препроцессора SASS
gulp.task('sass:build', function(){

    return gulp.src(paths.src.sass + '*.sass')
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass())// компиляция
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(groupMediaQueries())// группировка медиазапросов
        .pipe(cleanCSS()) //минификация
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.reload({stream: true}));

});


// Webpack
gulp.task('scripts:build', () => {
    // run webpack
    return gulp.src(paths.src.js + 'app.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.build.js))
        .pipe(browserSync.reload({stream: true}));
  });

// Компиляция Pug
gulp.task('html:build',function(){
  return gulp.src(paths.src.pug + 'pages/*.pug')
    .pipe(plumber())
    .pipe(pug())// 
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, '')) //удаление коммнтариев вида <!--DEV * -->
    .pipe(gulp.dest(paths.build.self))
    .pipe(browserSync.reload({stream: true}));
});


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

//сборка мелочей
gulp.task('prebuild', gulp.series(
    gulp.parallel('img:build', 'fonts:build', 'favicon:build', 'php:build', 'sprites:build')
  ));

// Удаление build
gulp.task('clean', function(){
    return del(paths.build.self)
});

// Наблюдение за файлами
gulp.task('watch', function(){
    gulp.watch(paths.src.sass + paths.all, gulp.series('sass:build'));
    gulp.watch(paths.src.js + paths.all, gulp.series('scripts:build'));
    gulp.watch(paths.src.pug + paths.all, gulp.series('html:build'));
    gulp.watch([paths.src.img + paths.all, paths.src.fonts + paths.all, paths.src + 'favicon.ico', paths.src.js + '**/*.json', paths.src.php + paths.all], gulp.series('prebuild'));
});

// Запуск сервера
gulp.task('serve', function() {
    browserSync({
        notify:false,
        open:true,
        port:8889,
        proxy: "http://localhost:8888/"+paths.project + paths.build.self
    });
});
///////////////////////////////////////////////////////////
// Просто сборка
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('sass:build', 'scripts:build', 'html:build', 'prebuild')
));
////////////////////////////////////////////////////////////
// Сборка и наблюдение и сервак
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('sass:build', 'scripts:build', 'html:build', 'prebuild'),
  gulp.parallel('watch', 'serve')
));
