//config
const config = require('../config').copy;
//global
const gulp = require('gulp');

const task = function(done){
    gulp.src(config.src,{ base: config.base })
        .pipe(gulp.dest(config.dist));
    done();
}

gulp.task('copy', task);
