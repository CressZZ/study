const { src, dest, parallel, series, watch } = require('gulp');
const ftp = require('vinyl-ftp');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpNormalize = require('node-normalize-scss').includePaths;
const gulpBourbon = require('node-bourbon').includePaths;
const gulpCleanCSS = require('gulp-clean-css');

const ftpConnection = ftp.create({
  host: 'ui-static.korea.ncsoft.corp',
  user: 'uidev',
  password: 'abcde12#'
});
const path = {
  scssSrc: 'src/sass',
  ftpDest: '/project/name/' // ftp에 업로드 될 프로젝트 경로 입력 (수정 필요)
};

function scssToCss () {
  return src(`${path.scssSrc}/*.scss`)
  .pipe(gulpSourcemaps.init())
  .pipe(gulpSass({
    includePaths: [gulpNormalize, gulpBourbon]
  })).on('error', gulpSass.logError)
  .pipe(gulpAutoprefixer())
  .pipe(gulpCleanCSS({
      level: {
        2: { mergeSemantically: true }
      }
    })
  )
  .pipe(gulpSourcemaps.write('./'))
  .pipe(dest('dist/css'));
}

function ftpUpload (glob, base) {
  if (path.ftpDest === '/project/name/') throw 'You should enter project path!'; // 에러 처리 코드 (수정 금지)

  return src(glob, { base, buffer: false })
  .pipe(ftpConnection.newerOrDifferentSize(path.ftpDest))
  .pipe(ftpConnection.dest(path.ftpDest));
}

const deployJs = () => ftpUpload(['dist/js/**'], './dist');
const deployCss = () => ftpUpload(['dist/css/**'], './dist');
const deployImg = () => ftpUpload(['src/img/**'], './src');

const makeStyle = () => scssToCss();

exports.deployJs = deployJs;
exports.deployCss = deployCss;
exports.deployImg = deployImg;
exports.deployAll = parallel(deployJs, deployCss);

exports.makeStyle = makeStyle;

exports.watch = series(() => {
  // watch([`${path.scssSrc}/**/*.scss`], makeStyle);

  watch(['dist/js/**/*.js'], deployJs);
  watch(['dist/css/**/*.css'], deployCss);
  watch(['src/img/**/*.*'], deployImg);
});
