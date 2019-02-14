const config = require('../config').script;
const $ = require('../plugins');
const webpackConfig = require('../../webpack.config');
webpackConfig.mode = process.env.NODE_ENV;

const task = function(done){
    let stream = $.gulp.src(config.src)
        .pipe($.plumber())
        .pipe($.webpackStream(webpackConfig, $.webpack))
        .pipe($.gulp.dest(config.dist))
        .pipe($.browserSync.stream());

    done();
    
    return stream;
}

$.gulp.task('script', task);