
var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')

gulp.task('build', () => {
  var b = browserify('src/main.js')
  b.transform(babelify, {presets: ['es2015', 'react']})

  return b.bundle().pipe(source('bundle.js')).pipe(gulp.dest('public/scripts'))
})

gulp.task('dev', () => gulp.watch('src/main.js', ['build']))

gulp.task('default', ['build', 'dev']);
