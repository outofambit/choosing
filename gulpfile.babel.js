
var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')

gulp.task('build', () => {
  var b = browserify('main.js')
  b.transform(babelify, {presets: ['es2015', 'react']})

  return b.bundle().pipe(source('bundle.js')).pipe(gulp.dest('public/scripts'))
})

gulp.task('dev', () => gulp.watch('main.js', ['build']))


gulp.task('default', () => {
  // place code for your default task here
});
