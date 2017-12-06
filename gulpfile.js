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
const webpack       = require('gulp-webpack');
const gutil         = require('gulp-util');
const notifier      = require('node-notifier');
// const babel         = require('gulp-babel');


let webpackConfig = require('./webpack.config.js');
let statsLog      = { // для красивых логов в консоли
  colors: true,
  reasons: true
};

const paths =  {
  src: 'src/',              // paths.src
  build: 'build/',           // paths.build
  project: 'ls-sitePortfolio/' // paths.project - name of project
};


////////////////////////////////////
////////////WATCH///////////////////
////////////////////////////////////
gulp.task('sass-watch', function(){

    return gulp.src(paths.src+'sass/*.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build + 'css/'))
        .pipe(browserSync.reload({stream: true}))

});

gulp.task('scripts-watch', function(){
    return gulp.src(paths.src + 'js/**/*.js')
            .pipe(plumber())
            .pipe(concat('app.js'))
            .pipe(gulp.dest(paths.build + 'js/'))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('html-watch',function(){
  return gulp.src(paths.src + 'pug/**/index.pug')
    .pipe(plumber())
    .pipe(pug({pretty:true}))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.reload({stream: true}));
});

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////



////////////////////////////////////
////////////BUILD///////////////////
////////////////////////////////////

gulp.task('img:build',function(){
    return gulp.src([paths.src + 'img/**/*.{jpg,png,jpeg}'])
            .pipe(plumber())
            .pipe(imagemin({
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(paths.build + 'img/'))
            .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts:build',function(){
    return gulp.src(paths.src + 'fonts/**/*.*')
                .pipe(plumber())
                .pipe(gulp.dest(paths.build + 'fonts/'));
});

gulp.task('favicon:build',function(){
    return gulp.src(paths.src + 'favicon.ico')
                .pipe(plumber())
                .pipe(gulp.dest(paths.build ));
});

gulp.task('php:build',function(){
    return gulp.src(paths.src + 'php/**/*.php')
                .pipe(plumber())
                .pipe(gulp.dest(paths.build + 'php/'));
});

gulp.task('sprites:build', function () {
    return gulp.src(paths.src+'img/**/*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            }
        }))
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest(paths.build+'img/'));
});


gulp.task('sass:build', function(){

    return gulp.src(paths.src+'sass/*.sass')
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        // .pipe(groupMediaQueries())
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.build + 'css/'))

});



gulp.task('scripts:build', () => {
    // run webpack
    return gulp.src(paths.src + 'js/**/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.build + 'js/'))
        .pipe(browserSync.reload({stream: true}));
  });


gulp.task('html:build',function(){
  return gulp.src([paths.src + 'pug/index.pug', paths.src + 'pug/*/index.pug'])
    .pipe(plumber())
    .pipe(pug())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(paths.build));
});


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

gulp.task('prebuild', gulp.series(
    gulp.parallel('img:build', 'fonts:build', 'favicon:build', 'php:build', 'sprites:build')
  ));

gulp.task('clean', function(){
    return del(paths.build)
});


gulp.task('watch', function(){
    gulp.watch(paths.src + 'sass/**/*.sass', gulp.series('sass-watch'));
    gulp.watch(paths.src + 'js/**/*.js', gulp.series('scripts:build'));
    gulp.watch(paths.src + 'pug/**/*.pug', gulp.series('html-watch'));
    gulp.watch([paths.src + 'img/**/*.*', paths.src + 'fonts/**/*.*', paths.src + 'favicon.ico', paths.src + 'js/**/*.json', paths.src + 'php/**/*.*'], gulp.series('prebuild'));
});

gulp.task('serve', function() {
    browserSync({
        notify:false,
        open:true,
        port:8889,
        proxy: "http://localhost:8888/"+paths.project+paths.build
    });
    // browserSync.watch(paths.build + '**/*.*', browserSync.reload({stream: true}));
});
///////////////////////////////////////////////////////////
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('sass:build', 'scripts:build', 'html:build', 'prebuild')
));
////////////////////////////////////////////////////////////
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('sass-watch', 'scripts:build', 'html-watch', 'prebuild'),
  gulp.parallel('watch', 'serve')
));
