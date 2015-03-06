var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');
var mainBowerFiles = require('main-bower-files');
var del = require('del');

var paths = {
  scripts: mainBowerFiles('**/*.js').concat(
           ['js/colors.js', 
            'js/CanvasLayer.js', 
            'js/DemLayer.js', 
            'js/BilDem.js', 
            'js/OptionsControl.js']),
  styles: mainBowerFiles('**/*.css'),
  dest: 'dist',
  destName: 'leaflet-raw-dem'
};

gulp.task('minify', function() {
  return gulp.src(paths.scripts)
/*  
    .pipe(concat(paths.destName + '.js'))
    .pipe(gulp.dest(paths.dest))
    .pipe(rename({ suffix: '.min' })) 
*/
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat(paths.destName + '.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('concat', function() {
  return gulp.src(paths.scripts)
    .pipe(concat(paths.destName + '.js'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('debug', function() {
  //return gulp.src(mainBowerFiles())
  //return gulp.src(paths.scripts)
  return gulp.src(paths.styles)
    .pipe(debug());
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concatCss(paths.destName + '.css'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('clean', function(cb) {
  del(paths.dest + '/' + paths.destName + '*' , cb);
}); 

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['minify']);
});

gulp.task('default', ['clean', 'minify', 'concat', 'styles']);
