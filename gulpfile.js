var gulp = require('gulp');
var rollup = require('gulp-rollup');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    gulp.src('src/main.js', {read: false})
        .pipe(rollup())
        .pipe(rename('iRouter.js'))
        .pipe(gulp.dest(__dirname))
        .pipe(uglify())
        .pipe(rename('iRouter.min.js'))
        .pipe(gulp.dest(__dirname));
})

gulp.task('js', function () {
    //irouter.js
    gulp.src('src/main.js', {read: false})
        .pipe(rollup({
            sourceMap: true
        }))
        .pipe(rename('iRouter.js'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./demo/lib'));
    //demo
    gulp.src('demo/main.js', {read: false})
        .pipe(browserify({
            debug:true
        }))
        .pipe(gulp.dest('./tmp'));
});
gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('serve', ['js'], function () {
    browserSync.init({
        server: {
            baseDir: ['./tmp','./demo']
        }
    });
    gulp.watch('@(src|demo)/**/*.js', ['js-watch']);
});