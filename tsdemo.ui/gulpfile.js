/// <binding BeforeBuild='clean' AfterBuild='compile' ProjectOpened='watch' />
// module definitions
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    typescript = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps")
project = require("./project.json");

// webroot path (wwwroot)
var paths = {
    webroot: "./" + project.webroot + "/"
};

// typescript paths
paths.typeScriptSrc = "TypeScript/**/*.ts"; // source folder
paths.typeScriptDest = paths.webroot + "ts" // destination folder

// gulp task to clean
gulp.task("clean:js", function (cb) {
    rimraf(paths.typeScriptDest, cb)
});

// gulp task to compile typescript
gulp.task("compile:js", function () {
    // tsconfig.json seems to be used by intellisense
    // check tsconfig.json has same options
    // https://github.com/Microsoft/TypeScript/wiki/tsconfig.json
    var tsResult = gulp.src(paths.typeScriptSrc)
        .pipe(sourcemaps.init())
        .pipe(typescript({
            noImplicitAny: false,
            noEmitOnError: true,
            removeComments: false,
            sourceMap: true,
            target: "es5",
            module: "amd"
        }));
    // put results
    return tsResult.js
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(paths.typeScriptDest));
});

// gulp task to watch changes in typescript to update output
// then when you modify scripts, you can just refresh browser
// and get the latest
gulp.task("watch:js", function () {
    gulp.watch(paths.typeScriptSrc, function () {
        gulp.run(["clean:js", "compile:js"]);
    });
});

// combined task defined in project, when you add more (js,css,...)
gulp.task("clean", ["clean:js"]);
gulp.task("compile", ["compile:js"]);
