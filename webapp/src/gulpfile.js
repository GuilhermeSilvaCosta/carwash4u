var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var del = require('del');
var ngAnnotate = require('gulp-ng-annotate');
var htmlreplace = require('gulp-html-replace');

var filesJS = ['app.js',
               'controllers/*.js'];
var indexHTML = 'index.html'
var favicon = ['favicon.ico'];
var filesCSS = 'content/css/*.css';
var fileImages = 'content/images/*.*';
var filesViews = 'views/*.*';
var googleFile = 'google4b4f3cc36c0096c9.html';
var vendors = 'vendor/**';
var certificados = '*.pem';
var ngMap = 'node_modules/ngmap/build/scripts/**';

gulp.task('lint', function() {
    gulp.src(filesJS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('del',function(){
    return del.sync('../dist/**', {force:true}); 
})

gulp.task('dist', function() {      

    gulp.src(filesJS)
    .pipe(concat('/dist/controllers'))
    .pipe(ngAnnotate({
        add: true
    }))    
    .pipe(rename('dist.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../dist'));

    gulp.src(indexHTML)
    .pipe(htmlreplace({
        'js': 'dist.min.js',
        'css': 'content/css/style.min.css'
    }))
    .pipe(gulp.dest('../dist'));

    gulp.src(googleFile)
    .pipe(gulp.dest('../dist'));

    gulp.src(favicon)
    .pipe(gulp.dest('../dist'));

    gulp.src(filesCSS)
    .pipe(concat('/dist/content/css'))
    .pipe(rename('style.min.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('../dist/content/css'));

    gulp.src(fileImages)
    .pipe(gulp.dest('../dist/content/images'));

    gulp.src(filesViews)
    .pipe(gulp.dest('../dist/views'));

    gulp.src(certificados)
    .pipe(gulp.dest('../dist'));    

    gulp.src(vendors)
    .pipe(gulp.dest('../dist/vendor'));

    gulp.src(ngMap)
    .pipe(gulp.dest('../dist/node_modules/ngmap/build/scripts'));

});


gulp.task('default', ['lint','del','dist'], function() {

});