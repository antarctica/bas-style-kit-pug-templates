'use strict';
/*eslint-env node */

var path = require('path');

var gulp         = require('gulp'),
    pump         = require('pump'),
    pug          = require('gulp-pug'),
    rename       = require('gulp-rename');

gulp.task('build--pug--tests', buildPugTests);

gulp.task('build--pug', gulp.parallel(
  'build--pug--tests'
));

gulp.task('build', gulp.parallel(
  'build--pug'
));

function buildPugTests(done) {
  pump(
    [
      gulp.src([
        path.join('tests', 'layouts', 'bas-style-kit', '*.pug')
      ]),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join('tests', 'public', 'layouts'))
    ],
    done
  );
}
