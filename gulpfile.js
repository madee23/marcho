const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const del = require('del');

// Функции

// Релодим, бравзерсинк
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
}

// Тасчим ЭСЦСС
function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

// Тасчим ДжиЭс
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// Картинки
function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

// Билдим проект
function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

// Чистим Дист
function clean() {
  return del('dist')
}

// следим за файлами
function watching() {
  watch(['app/scss/**/*.scss'], styles); //за цсс смотрим, выполняем styles
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts); //за джиэс смотрим, выполняем scripts
  watch(['app/**/*.html']).on('change', browserSync.reload);
}



// Экспортим таски, ЗАПУСКАЕМ ИХ
exports.styles = styles;
exports.browsersync = browsersync;
exports.watching = watching;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean; //чистим дист
exports.build = series(clean, images, build);

// Дефолтный таск, параллельно
exports.default = parallel(styles, scripts, browsersync, watching);