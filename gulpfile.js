// Core
var path = require('path');

// Frameworks
var gulp = require('gulp');
var assign = require('lodash.assign');

// Browserify
var buffer = require('vinyl-source-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var tsify = require('tsify');
var stringify = require('stringify');
var uglifyify = require('uglifyify');

// Browser Sync
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var reload = browserSync.reload;

// Config
var config = require('./gulpconfig');
var postProcessor = [
    require('postcss-zindex'),
    require('autoprefixer')({browsers: ['last 1 version']})
];

// Util
var del = require('del');
var sequence = require('run-sequence');
var mergeStream = require('merge-stream');
var $ = require('gulp-load-plugins')();

//////////////////////////////////////////
/// Util
//////////////////////////////////////////

gulp.task('clean', function () {
    return del.sync(['dist/*', '!dist/.git'], {dot: true});
});

//////////////////////////////////////////
/// Lint
//////////////////////////////////////////

gulp.task('scripts:lint', function () {
    gulp.src(config.paths.typescript.watch[0])
        .pipe($.tslint({
            configuration: "tslint.json"
        }))
        .pipe($.tslint.report($.tslintStylish, {
            emitError: false,
            sort: true,
            bell: true,
            fullPath: true
        }));
});

gulp.task('styles:lint', function () {
    return gulp.src(config.paths.styles.watch)
        .pipe($.plumber())
        .pipe($.postcss([
            require('stylelint')(),
            require('postcss-reporter')({clearMessages: true, throwError: false})
        ], {syntax: require('postcss-scss')}));
});

gulp.task('lint', function() {
    sequence('scripts:lint', 'styles:lint');
});

//////////////////////////////////////////
/// CSS
//////////////////////////////////////////

gulp.task('styles', ['styles:lint'], function () {
    return gulp.src(config.paths.styles.app)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(postProcessor))
        .pipe($.cleanCss({mediaMerging: false}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.styles.dist))
        .pipe($.size({title: 'styles'}));
});

//////////////////////////////////////////
/// JavaScript
//////////////////////////////////////////
var opts = assign({}, watchify.args, {
    entries: [config.paths.typescript.app + '/main.ts'],
    //debug: true
});

var bundler = watchify(browserify(opts))
    .transform(stringify, {appliesTo: {includeExtensions: ['.html']}})
    .transform(uglifyify, {global: true})
    .plugin(tsify, {
        typescript: require('typescript'),
        project: require('./tsconfig.json')
    });

gulp.task('typescript', ['scripts:lint'], function () {
    var bundled = bundler
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe($.plumber())
        .pipe(buffer('angular.js'))
        .pipe(gulp.dest(config.paths.typescript.dist))
        .pipe($.size({title: 'typescript'}));

    var files = gulp.src(config.paths.typescript.vendor)
        .pipe($.newer(config.paths.typescript.dist))
        .pipe($.uglify())
        .pipe(gulp.dest(config.paths.typescript.dist));

    return mergeStream(bundled, files);
});

//////////////////////////////////////////
/// Templates
//////////////////////////////////////////

gulp.task('templates', function () {
    return gulp.src(config.paths.templates.app)
        .pipe(gulp.dest(config.paths.templates.dist))
        .pipe($.size({title: 'templates'}));
});

//////////////////////////////////////////
/// Images
//////////////////////////////////////////

gulp.task('images', function () {
    return gulp.src(config.paths.images.app)
        .pipe($.plumber())
        .pipe($.newer(config.paths.images.dist))
        .pipe($.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.paths.images.dist))
        .pipe($.size({title: 'images'}));
});

//////////////////////////////////////////
/// Watch / Build
//////////////////////////////////////////

gulp.task('watch', function () {
    browserSync({
        notify: false,
        server: ['./dist'],
        middleware: [
            modRewrite([
                '!\\.\\w+$ /200.html [L]'
            ])
        ],
        tunnel: "mapvote",
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        }
    });

    gulp.watch(config.paths.typescript.watch, ['typescript', reload]);
    gulp.watch(config.paths.styles.watch, ['styles', reload]);
    gulp.watch(config.paths.images.watch, ['images', reload]);
    gulp.watch('index.html', ['templates', reload]);
});

gulp.task('default', ['clean'], function () {
    sequence(['typescript', 'styles', 'images', 'templates']);
});