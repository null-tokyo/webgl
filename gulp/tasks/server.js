//config
const config = require('../config').server;
//global
const gulp = require('gulp');
const browserSync = require('browser-sync');

const task = function(done){
    browserSync.init(config);
    done();
}

gulp.task('server', task);