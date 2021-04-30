const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const autoprefixer = require("gulp-autoprefixer");
const CleanCSS = require("gulp-clean-css");
const UglifyJS = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const style = () => {
  return src("./src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 25 versions"],
        cascade: false,
      })
    )
    .pipe(CleanCSS())
    .pipe(dest("./dist/css/"))
    .pipe(browserSync.stream());
};
const scripts = () => {
  return src("./src/scripts/**/*.js").pipe(UglifyJS()).pipe(dest("./dist/js"));
};

const watching = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  watch("./src/styles/**/*.scss", style);
  watch("./*.html").on("change", browserSync.reload);
  watch("./src/scripts/**/*js").on("change", browserSync.reload);
  watch("./src/scripts/**/*.js", scripts);
  watch("./src/images/**", imgCompressor);
};

const cleaning = () => {
  return src("dist/*", { read: false }).pipe(clean());
};

const imgCompressor = () => {
  return src("./src/images/**")
    .pipe(imagemin({ progressive: true }))
    .pipe(dest(`./dist/images/`));
};

exports.build = series(cleaning, parallel(style, scripts), imgCompressor);
exports.dev = watching;
