import autoprefixer from 'autoprefixer';
import bemlinter from 'gulp-html-bemlinter';
import cssnano from 'cssnano';
import esbuild from 'gulp-esbuild';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import htmlnano from 'htmlnano';
import imagemin from 'gulp-imagemin';
import lintspaces from 'gulp-lintspaces';
import postcss from 'gulp-postcss';
import postcssReporter from 'postcss-reporter';
import posthtml from 'gulp-posthtml';
import rename from 'gulp-rename';
import sass from 'gulp-dart-sass';
import scssSyntax from 'postcss-scss';
import server from 'browser-sync';
import sortMediaQueries from 'postcss-sort-media-queries';
import stylelint from 'stylelint';
import svgo from 'imagemin-svgo';
import svgoConfig from './svgo.config.js';
import { deleteAsync } from 'del';
import { htmlValidator } from 'gulp-w3c-html-validator';
import { stacksvg } from 'gulp-stacksvg';

const { src, dest, series, parallel, watch } = gulp;
const isDev = process.argv.includes('dev');
const isTest = process.argv.includes('test');
const isBuild = !isDev && !isTest;
const Files = {
  BUILD: isBuild ? 'build' : 'dev',
  EDITORCONFIG: ['*.{js,json,md}', '{source,static}/**/*.{html,js,scss,svg,ts,twig}']
};

const lintEditorconfig = () =>
  src(Files.EDITORCONFIG)
    .pipe(lintspaces({ editorconfig: '.editorconfig' }))
    .pipe(lintspaces.reporter({ breakOnWarning: !isDev }));

// HTML

const postprocessHTML = () =>
  src('build/**/*.html')
    .pipe(posthtml([htmlnano({ collapseWhitespace: 'aggressive', minifySvg: false, minifyCss: false })]))
    .pipe(dest('build'));

const lintHtml = () =>
  src('static/**/*.html')
    .pipe(htmlValidator.analyzer({ ignoreMessages: /^Trailing slash/ }))
    .pipe(htmlValidator.reporter({ throwErrors: true }))
    .pipe(bemlinter());

// CSS

const buildStyles = () =>
  src('source/sass/*.scss', { sourcemaps: isDev })
    .pipe(
      sass({
        functions: {
          'isDev()'() {
            return sass.types.Boolean[isDev ? 'TRUE' : 'FALSE'];
          },
          'isTest()'() {
            return sass.types.Boolean[isTest ? 'TRUE' : 'FALSE'];
          }
        }
      }).on('error', function log(error) {
        sass.logError.bind(this)(error);

        if (isTest) {
          process.exitCode = 1;
        } else if (!isDev) {
          throw new Error('');
        }
      })
    )
    .pipe(postcss([sortMediaQueries(), autoprefixer()]))
    .pipe(
      gulpIf(
        isBuild,
        postcss([
          cssnano({
            preset: ['default', { cssDeclarationSorter: false }]
          })
        ])
      )
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(`${Files.BUILD}/css`, { sourcemaps: '.' }));

const lintStyles = () => {
  return src('source/sass/**/*.scss').pipe(
    postcss(
      [
        stylelint(),
        postcssReporter({
          clearAllMessages: true,
          throwError: !isDev
        })
      ],
      { syntax: scssSyntax }
    )
  );
};

// JS

const buildScripts = () =>
  src('source/js/*.js')
    .pipe(
      esbuild({
        bundle: true,
        format: 'iife',
        minify: isBuild
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(`${Files.BUILD}/js`));

const lintScripts = () =>
  src('source/{data,js}/**/*.{js,ts}')
    .pipe(eslint({ fix: false }))
    .pipe(eslint.format())
    .pipe(gulpIf(!isDev, eslint.failAfterError()));

// IMG

const createSprite = () =>
  src('source/sprite/**/*.svg')
    .pipe(imagemin([svgo(svgoConfig)]))
    .pipe(stacksvg({ output: 'sprite' }))
    .pipe(dest(`${Files.BUILD}/img`));

// BUILD

const copyStatic = () => src('static/**/*').pipe(dest('build'));

const cleanBuild = () => deleteAsync('build');

// START

const reload = (done) => {
  server.reload();
  done();
};

const start = () => {
  server.init({
    server: ['dev', 'static'],
    cors: true,
    notify: false,
    ui: false
  });

  watch('static/**/*.html', series(lintHtml, reload));
  watch('source/sass/**/*.scss', series(parallel(lintStyles, buildStyles), reload));
  watch('source/js/**/*.{js,ts}', series(parallel(lintScripts, buildScripts), reload));
  watch('source/sprite/**/*.svg', series(createSprite, reload));
  watch('static/**/*').on('change', server.reload);
  watch(Files.EDITORCONFIG, lintEditorconfig);
};

// SERIES

const compile = parallel(buildScripts, buildStyles, createSprite);
const lint = parallel(lintEditorconfig, lintHtml, lintScripts, lintStyles);

export const build = series(cleanBuild, compile, copyStatic, postprocessHTML);
export const dev = series(compile, parallel(lint, start));
