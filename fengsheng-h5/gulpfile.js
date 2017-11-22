/**
 * module dependencies
 */
const join = require('path').join,
fs = require('fs'),
pump = require('pump'),
minimist = require('minimist');

//argv
const argv = require('minimist')(process.argv.slice(2));
const jsFileName = argv.file || 'index';

/**
 * plugins
 */
const gulp = require('gulp'),
sourcemaps = require('gulp-sourcemaps'),
$ = require('gulp-load-plugins')();

//dist folder
const distDir = join(__dirname,'dist');
//src folder
const srcDir = join(__dirname,'src'),
//views folder
viewsDir = join(srcDir,'views'),
//www folder
wwwDir = join(srcDir,'www'),
//sass folder
sassDir = join(srcDir,'sass');

//complie pug template file to html
gulp.task('complie:pug', () => {
    return gulp.src(join(viewsDir,'index.pug'))
        .pipe($.pug({
            locals : require(join(srcDir,'data'))
        }))
        .pipe(gulp.dest(wwwDir))
});

//complie pug watch
gulp.task('complie:pug:watch',()=>{
    gulp.watch(join(viewsDir,'**/*.pug'), ['complie:pug']);
    gulp.watch(join(srcDir,'data/data.js'), ['complie:pug']);
});
//compile sass to css
gulp.task('complie:sass',()=>{
    // {outputStyle: 'compressed'}
    return gulp.src(join(sassDir,'/index.scss'))
        // {outputStyle: 'compressed'}
        .pipe(sourcemaps.init())
        .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join(wwwDir,'styles')));
});

//complie sass watch
gulp.task('complie:sass:watch', function () {
    gulp.watch(join(sassDir,'**/*.scss'), ['complie:sass']);
});

gulp.task('base64',function(){
    return gulp.src(join(wwwDir,'styles','index.css'))
    .pipe($.base64({
        // baseDir: 'public',
        extensions: ['svg', 'png', /\.jpg#datauri$/i],
        // exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
        maxImageSize: 15*1024, // bytes,
        deleteAfterEncoding: false,
        debug: true
    }))
    .pipe(gulp.dest('./src/www/styles'));
});

//complie sass watch
gulp.task('base64:watch', function () {
    gulp.watch(join(wwwDir,'styles','index.css'), ['base64']);
});

//web server
gulp.task('ws',['complie:sass:watch','complie:pug:watch','base64:watch'],err=>{
});

//rename file
gulp.task('rename',function(){
    gulp.src(join(distDir,`js/${jsFileName}.js`))
    .pipe($.rename(`js/${jsFileName}.min.js`))
    .pipe(gulp.dest(join(wwwDir)))
});

gulp.task('uglify', function (cb) {
    pump([
            gulp.src(join(srcDir,`www/js/${jsFileName}.js`)),
            $.uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );
});

gulp.task('compress',['uglify','rename'],err=>{
});