var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    paths = {
        angular: [
            'bower_components/angular/angular.js',
            'bower_components/angular/angular-route.js',
            'bower_components/angular/angular-touch.js'
        ],
        frontend: [
            'src/js/app.js', 
            'src/js/**/*.js'
        ],
        backend: [
            'app.js', 
            'controllers/**/*.js'
        ],
        sass: [
            'bower_components/foundation/scss/**/*.scss', 
            'src/scss/*.scss'
        ],
        dest: {
            css: 'public/css',
            js: 'public/js'
        }
    };

gulp.task('lint', function () {
    gulp.src(paths.backend.concat(paths.frontend))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('frontend', function() {
    gulp.src(paths.angular)
        .pipe(concat('angular.js', { newLine: ';' }))
        .pipe(gulp.dest(paths.dest.js));
    gulp.src(paths.frontend)
        .pipe(concat('app.js', { newLine: ';' }))
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('develop', function () {
    nodemon({ script: 'app.js', ext: 'jade js scss' })
        .on('change', ['lint', 'sass']);
});

gulp.task('default', ['lint', 'frontend', 'sass', 'develop']);
