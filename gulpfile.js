var gulp = require('gulp');
var concat = require('gulp-concat');
var gls = require('gulp-live-server');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('imgs', function(){
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('html', function(){
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function(){
    return gulp.src(['app/**/*.js'])
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('serve', function(){
    var server = gls.static(['build']);
    server.start();

    return watch(['build/**/*.css', 'build/**/*.html'], function(file){
        server.notify.apply(server, [file]);
    });
});

gulp.task('watch', function(){
    return gulp.watch('app/**/*', ['imgs', 'html', 'sass', 'scripts'])
    .on('change', function(event){
        console.log('File' + event.path + ' was ' + event.type + '.')
    });
});

gulp.task('default', ['imgs', 'html' ,'sass', 'scripts', 'serve', 'watch']);
