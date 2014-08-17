var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    paths = {
        libs: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-touch/angular-touch.min.js',
            'bower_components/lodash/dist/lodash.min.js'
        ],
        js: {
            backend: ['app.js', 'controllers/*.js'],
            frontend: ['src/js/**/*.js']
        },
        sass: [
            'bower_components/foundation/scss/**/*.scss',
            'src/scss/*.scss'
        ],
        dest: {
            css: 'public/css',
            js: 'public/js'
        },
        livereload: [
            'public/css/main.css',
            'public/js/app.js',
            'views/**/*.jade'
        ]
    };

gulp.task('lint', function () {
    gulp.src(paths.js.backend.concat(paths.js.frontend))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', function() {
    gulp.src(paths.libs)
        .pipe(concat('libs.js', { newLine: ';\n' }))
        .pipe(gulp.dest(paths.dest.js));
    gulp.src(paths.js.frontend)
        .pipe(concat('app.js', { newLine: ';\n' }))
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('reload', function() {
    setTimeout(function() {
        livereload.changed();
    }, 2000);
});

gulp.task('develop', function () {
    livereload.listen();
    nodemon({
            script: 'app.js', 
            ext: 'jade js scss', 
            ignore: ['gulpfile.js', 'public/js/*.js'] 
        })
        .on('change', ['lint', 'js', 'sass', 'reload']);
});

gulp.task('default', ['lint', 'js', 'sass', 'develop']);
