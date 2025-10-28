const { src, dest, watch, parallel, series } = require('gulp');


const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const file_include = require('gulp-file-include');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


const html_task = () => {
    return src('src/app/index.html')
        .pipe(file_include({
            prefix: '@@',
            basepath: '@root'
        }))
        .pipe(dest('dist/'))
        .pipe(browserSync.stream());
}


const js_task = () => {
    return src('src/app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}



const scss_task = () => {
    return src('src/app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min', extname: '.css' }))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
};


const img_task = () => {
    return src('src/app/imgs/**/*.{png,jpg,jpeg,svg}', {encoding: false})
        .pipe(imagemin())
        .pipe(dest('dist/imgs/'));
}


const browsersync_task = () => {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        notify: false
    });
}


const watch_task = () => {
    watch('src/app/**/*.html', html_task);
    watch('src/app/js/*.js', js_task);
    watch('src/app/scss/**/*.scss', scss_task);
    watch('src/app/imgs/**/*.{png,jpg,jpeg,svg}', series(img_task, browserSync.reload));
}


const build = series(html_task, parallel(scss_task, js_task, img_task));

exports.default = series(
    build,
    parallel(browsersync_task, watch_task)
);