
var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var connect = require('gulp-connect')

gulp.task('heroku', ['sass', 'js'], () => {
  connect.server({
    root: 'public',
    port: process.env.PORT
  });
})

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "public/"
        }
    });
});

gulp.task('js', () => {
  var b = browserify('src/main.js')
  b.transform(babelify, {presets: ['es2015', 'react']})

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/scripts'))
    .pipe(browserSync.reload({stream:true}))
})

gulp.task('sass', () => {
  return gulp.src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('dev', () => {
  gulp.watch('src/main.js', ['js'])
  gulp.watch('src/*.scss', ['sass'])
})

gulp.task('default', ['sass', 'js', 'browser-sync', 'dev']);
