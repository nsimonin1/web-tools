var gulp = require('gulp'); 
var minifyCSS = require('gulp-csso');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var image = require('gulp-image');
var newer = require('gulp-newer');
var size  = require('gulp-size');
var uglify = require('gulp-uglify');
var plumber = require("gulp-plumber");
var eslint = require("gulp-eslint");

var webpack = require("webpack");
var webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

var del = require('del');

const 
  dir= {
  src: 'src/',
  target: 'dist/'
},
imgConfig = {
  src: dir.src+'assets/images/**/*',
  target: dir.target+'images'
},
cssConfig = {
  src: dir.src+'assets/css/**/*.css',
  target: dir.target+'css',
  filter: dir.src+'assets/css/**/*.min.css'
},
jsConfig = {
  src: dir.src+'assets/js/**/*.js',
  target: dir.target+'js',
  filter: dir.src+'assets/js/**/*.min.js'
};

gulp.task('clean', ()=> del([dir.target]));

gulp.task('image',  ()=> 
  gulp.src(imgConfig.src)
    .pipe(newer(imgConfig.target))
    .pipe(image())
    .pipe(size({showFiles: true, showTotal: true}))
    .pipe(gulp.dest(imgConfig.target))
);
gulp.task('css', ()=>{
  const filtre = filter(['**', '!*'+cssConfig.filter], {restore: true});
  return gulp.src(cssConfig.src) 
    .pipe(filtre)
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'})) 
    .pipe(filtre.restore)
    .pipe(gulp.dest(cssConfig.target))
});




gulp.task('scriptsLint', ()=>{
  const filtre = filter(['**', '!*'+jsConfig.filter], {restore: true});
  return gulp.src(jsConfig.src)
    pipe(filtre)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
    //.pipe(uglify())
    //.pipe(sourcemaps.init())
    //.pipe(rename({suffix: '.min'}))
    //.pipe(sourcemaps.write()) 
    //.pipe(filtre.restore)
    //.pipe(gulp.dest(jsConfig.target));
}
);

gulp.task('scripts', ()=>{
  const filtre = filter(['**', '!*'+jsConfig.filter], {restore: true});
  return gulp.src(jsConfig.src)
    pipe(filtre)
    .pipe(plumber())
    .pipe(webpackstream(webpackconfig, webpack))
    .pipe(gulp.dest(jsConfig.target));
}
);

const js = gulp.series('scriptsLint', 'scripts');

exports.default= gulp.series('clean',gulp.parallel('css',js));

exports.dist = gulp.series('clean',gulp.parallel('css',js,'image'));