var gulp = require('gulp');
var gulpBabel = require('gulp-babel');


var DIST_DIR = './dist';


gulp.task('build', function (){
  return gulp.src('**/*.es6')
    .pipe(gulpBabel())
    .pipe(gulp.dest(DIST_DIR))
  ;
});
