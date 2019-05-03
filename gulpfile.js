var gulp = require('gulp'); 
var minifyCSS = require('gulp-csso');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
const image = require('gulp-image');
const build_dir='dist';

gulp.task('image', function () {
  gulp.src('src/assets/images/*')
    .pipe(image())
    .pipe(gulp.dest('dist/images'));
});
gulp.task('css', function(){
  const f = filter(['**', '!*src/assets/css/**/*.min.css']);
  return gulp.src('src/assets/css/**/*.css') 
    .pipe(cssmin())
	.pipe(rename({suffix: '.min'})) 
    .pipe(gulp.dest('dist/css'))
});

gulp.task('css-site', function(){
  const f = filter(['**', '!*src/assets/sites/css/**/*.min.css']);
  return gulp.src('src/assets/sites/css/**/*.css') 
    .pipe(f)
    .pipe(cssmin())
	.pipe(rename({suffix: '.min'})) 
    .pipe(gulp.dest('dist/sites/css'))
});

gulp.task('js-site', function(){
  const f = filter(['**', '!*src/assets/sites/js/**/*.min.js']);
  return gulp.src('src/assets/sites/js/**/*.js')
    .pipe(f)
    //.pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    //.pipe(sourcemaps.write()) 
    .pipe(gulp.dest('dist/sites/js'))
});


gulp.task('js', function(){
  return gulp.src('src/assets/js/*.js')
    //.pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    //.pipe(sourcemaps.write()) 
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', [ 'css', 'js' ]);
gulp.task('images', [ 'css', 'js','image' ]);