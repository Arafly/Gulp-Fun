const gulp = require ('gulp');
const imagemin = require('gulp-imagemin'); // A plugin for optimizing images 
const uglify = require('gulp-uglify'); // A plugin for minifying js 
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
    -- TOP LEVEL FXN --
    gulp.task - Define tasks
    gulp.src - Point at files to use
    gulp.dest - Points at folder to output
    gulp.watch - Watch files and folders for changes 
*/ 

//  Logs Message
gulp.task('message', function() {
    return console.log('Yeah! Gulp is live and running...');
});

//  Copy all HTML files
gulp.task('copyHtml', () =>
    gulp.src('src/*.html') // Recall: gulp.src points to all the folder we want to use. In this case, all folders with .html extension inside the src folder
    .pipe(gulp.dest('dist')) // dest is destination into a folder called "dist". Gulp creates the dist folder itself
);

//  Optimize images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

//  Minify JS
gulp.task('minify', () =>
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js-min'))
);

//  Compile Sass
gulp.task('sass', () =>
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
);

//   Scripts (This concatenate the js file1 and 2 into a folder main.js)
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify()) // The minify task was deleted from the array below bcos we dont want it to minify first. We want it to concatenate before minifying
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['message', 'copyHtml', 'sass', 'imageMin', 'scripts']);

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});