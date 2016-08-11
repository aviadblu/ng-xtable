'use strict';

var gulp = require('gulp');
var path = require('path');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');

var appFolders = {
    src: './src',
    vendor: './vendor',
    dest: './dist',
    example: './example/public/bower_components/ng-xtable/dist'
};

function buildPaths() {
    return {
        js: {
            src: [appFolders.src + '/*.js', '!' + appFolders.src + '/**/*.spec.js'],
            dest: [appFolders.dest + '/*.js']
        },
        html: {
            src: [appFolders.src + '/*.html'],
            dest: [appFolders.dest + '/*.html']
        }
    };
}

var paths = buildPaths();

gulp.task('watch', function () {
    livereload.listen(4000);
    // watch for single js file changes
    gulp.watch(paths.js.src).on('change', function (file) {
        var fnameArr = file.path.split('/');
        gutil.log(gutil.colors.green('JS changed' + ' (' + fnameArr[fnameArr.length - 1] + ')'));
        copyFile(file.path);
    });

    // watch for single html file changes
    gulp.watch(paths.html.src).on('change', function (file) {
        var fnameArr = file.path.split('/');
        gutil.log(gutil.colors.green('HTML changed' + ' (' + fnameArr[fnameArr.length - 1] + ')'));
        copyFile(file.path);
    });

});

function copyFile(src) {
    gulp.src(src, {base: appFolders.src + '/'})
        .pipe(gulp.dest(appFolders.dest))
        .pipe(gulp.dest(appFolders.example))
        .pipe(livereload());
}

gulp.task('js-copy', function () {
    gulp.src(paths.js.src, {base: appFolders.src + '/'})
        .pipe(gulp.dest(appFolders.dest))
        .pipe(gulp.dest(appFolders.example))
        .pipe(livereload());
});

gulp.task('html-copy', function () {
    gulp.src(paths.html.src, {base: appFolders.src + '/'})
        .pipe(gulp.dest(appFolders.dest))
        .pipe(gulp.dest(appFolders.example))
        .pipe(livereload());
});

gulp.task('build', ['html-copy', 'js-copy']);

gulp.task('default', ['html-copy', 'js-copy', 'watch']);