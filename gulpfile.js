/* eslint-disable */
/* REQUIRES --------------------*/

var gulp = require('gulp'),
    minifyHTML = require('gulp-htmlmin'),
    cache = require('gulp-cached'),
    changed = require('gulp-changed'),
    error = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-cssnano'),
    webpack = require('webpack-stream');

var src = './src/',
    dist = './dist/',
    css = 'css/',
    js = 'js/',
    img = 'img/',
    paths = {
      src: {
        base: src,
        css: src + css,
        js: src + js,
        img: src + img
      },
      dist: {
        base: dist,
        css: dist + css,
        js: dist + js,
        img: dist + img
      }
    };


/* SCRIPTS --------------------*/

// JS compiler
gulp.task('scripts', function() {
  gulp.src('/')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(paths.dist.js));
});


/* STYLES --------------------*/

// Sass compiler
gulp.task('sass', function () {
  gulp.src(paths.src.css + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', error.log))
    .pipe(sourcemaps.write())
    // .pipe(minifyCss())
    .pipe(gulp.dest(paths.dist.css));
});


/* MARKUP & ASSETS --------------------*/

// // minify html
// gulp.task('minifyHTML', function() {
// 	gulp.src(paths.src.base + '*.html')
// 		.pipe(changed(paths.dist.base))
// 		// .pipe(minifyHTML())
// 		.pipe(gulp.dest(paths.dist.base));
// });


/* UTILITY --------------------*/

// build out all paths that haven't yet been built
gulp.task('build', function() {
  gulp.src([paths.src.base + '*', paths.src.base + '**/*', '!' + paths.src.base + '**/*.scss', '!' + paths.src.base + '**/*.js'])
    .pipe(changed(paths.dist.base))
    .pipe(gulp.dest(paths.dist.base));
});


/* DEFAULT --------------------*/

// gulp.task('default', ['build', 'sass', 'minifyHTML', 'scripts']);
gulp.task('default', ['build', 'sass',  'scripts']);


/* WATCH --------------------*/
gulp.task('watch', function() {

  // build all
  gulp.watch([paths.src.base + '*', paths.src.base + '**/*', '!' + paths.src.base + '**/*.sass'], ['build'])

  // watch for JS changes
  gulp.watch(paths.src.js + '**/*.js', ['scripts']);

  // watch for CSS changes
  gulp.watch(paths.src.css + '*.scss', ['sass']);

  // watch for HTML changes
  // gulp.watch(paths.src.base + '*.html', ['minifyHTML']);
});
