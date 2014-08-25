var gulp = require('gulp');
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemap = require("gulp-sourcemaps");
var traceur = require("gulp-traceur");
var mocha = require('gulp-mocha');

require("chai");
require("mocha-traceur");

var paths = {
    sass: {
        watch: 'assets/**/*.sass',
        src: 'assets/**/main.sass',
        dest: 'build/'
    },
    javascript: {
        src: 'src/**/*.js',
        dest: 'build/'
    },
    test: {
        src: 'test/**/*.js'
    }
};

gulp.task('test', function() {
      return gulp
        .src(paths.test.src, {read: false})
        .pipe(mocha());
});

gulp.task('sass', function() {
    return gulp.src(paths.sass.src)
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('javascript', ['test'], function() {
    return gulp.src(paths.javascript.src)
        .pipe(sourcemap.init())
        .pipe(traceur({modules: 'amd', moduleName: true}))
        .pipe(concat('gifpuzzle.js'))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(paths.javascript.dest));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass.watch, ['sass']);
    gulp.watch(paths.javascript.src, ['javascript']);
    gulp.watch(paths.test.src, ['test']);
});

gulp.task('server', ['sass', 'javascript', 'watch']);
gulp.task('default', ['sass', 'javascript']);