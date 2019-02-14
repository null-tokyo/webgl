const config = require('../config').css;
const $ = require('../plugins');

const task = function(done){
    let isProd = process.env.NODE_ENV === 'production' ? true : false;

    const processors = [
        $.autoprefixer()
    ];

    if (isProd) {
        processors.push($.csswring());
    }

    let stream = $.gulp.src(config.src)
        .pipe($.plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe($.sassGlob())
        .pipe($.gulpif(!isProd, $.sourcemaps.init()))
        .pipe($.sass({
            outputStyle: 'expanded'
        }))
        .pipe($.postcss(processors))
        .pipe($.gulpif(!isProd, $.sourcemaps.write(`../maps`)))
        .pipe($.gulp.dest(config.dist))
        .pipe($.browserSync.stream());

    done();
    
    return stream;
}

$.gulp.task('css', task);