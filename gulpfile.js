/**
 * Created by Allen on 12/27/2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var autoprefix = require('gulp-autoprefixer');
var htmlreplace = require('gulp-html-replace');
var browsersync = require('browser-sync');
var purifyCSS = require('gulp-purifycss');
var del = require('del');
var ghPages = require('gulp-gh-pages');

// Styles Task
gulp.task('styles', function () {
  var allCSS = ['src/css/bootstrap.css','src/css/main.css', 'src/css/*.css'];
  return gulp.src(allCSS)
    .pipe(concat('ego.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(purifyCSS(['src/js/main.js', 'src/*.html']))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css/'));
});

// Scripts Task
gulp.task('scripts',function () {
  var allJS = ['src/js/jquery.js', 'src/js/bootstrap.js', 'src/js/*.js'];
  return gulp.src(allJS)
    .pipe(concat('ego.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

// move videos
gulp.task('videos', function () {
  return gulp.src('src/vid/*')
    .pipe(gulp.dest('dist/vid'));
});

// minify images
gulp.task('images', function () {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('dist/img'));
});

// html task
gulp.task('replace', function () {
  return gulp.src('src/*.html')
    .pipe(htmlreplace({
      'styles': 'css/ego.css',
      'js': 'js/ego.js'
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'));
});
// watch for file changes
gulp.task('watch', function () {
  var styles = ['styles', browsersync.reload];
  var scripts = ['scripts', browsersync.reload];
  var images = ['images', browsersync.reload];
  var html = ['replace', browsersync.reload];
  gulp.watch('src/css/*.css', styles);
  gulp.watch('src/js/*.js', scripts);
  gulp.watch('src/img/*', images);
  gulp.watch('src/*.html', html);
});

// Browser Sync Task
gulp.task('browsersync', function(cb) {
  return browsersync({
    server: {
      baseDir: './dist/'
    }
  }, cb);
});

// clean dist folder
gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// deploy to github
gulp.task('deploy', function () {
  return gulp.src('dist/')
    .pipe(ghPages());
});
// Default task
gulp.task('default',
  ['images', 'scripts', 'styles','videos', 'replace', 'browsersync','watch']
);
