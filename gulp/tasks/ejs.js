const config = require('../config').ejs;
const $ = require('../plugins');
const fs = require('fs');
const jsonData = require('../plugins');

const task = function(done){
    let isProd = process.env.NODE_ENV === 'production' ? true : false;

    let json = JSON.parse(fs.readFileSync('./data.json'));

    let stream = $.gulp.src(config.src)
        .pipe($.plumber())
        .pipe($.ejs({data: json}, {}, {ext: '.html'}).on('error', $.log))
        .pipe($.htmlMinifier({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe($.gulp.dest(config.dist))

    done();
    
    return stream;
}

$.gulp.task('ejs', task);