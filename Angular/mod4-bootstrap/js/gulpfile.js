const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const del = require('del');

// Limpiar la carpeta dist
gulp.task('clean', function() {
    return del(['dist/**']);
});

// Compilar y minificar CSS
gulp.task('styles', function() {
    return gulp.src('css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

// Minificar JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Minificar HTML
gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

// Tarea por defecto: Ejecuta todo en orden
gulp.task('default', gulp.series('clean', gulp.parallel('styles', 'scripts', 'html')));