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

gulp.task('watch', watchBuild);

function buildPugTests(done) {
  pump(
    [
      gulp.src([
        path.join('tests', 'src', '**/*.pug')
      ]),
      rename({extname: '.html'}),
      pug(),
      gulp.dest(path.join('tests', 'public'))
    ],
    done
  );
}

function watchBuild(done) {
  gulp.watch(
    [
      path.join('includes', '**/*.pug'),
      path.join('layouts', '**/*.pug'),
      path.join('mixins', '**/*.pug'),
      path.join('views', '**/*.pug'),
      path.join('tests', 'src', '**/*.pug')
    ],
    gulp.parallel('build')
  );
  done();
}
