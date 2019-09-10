const replace = require('gulp-manifest-replace');
const manifestJson = require('manifest.json');

gulp.task('replace', function(){
  gulp.src(['*.html'])
    .pipe(replace({ manifest: manifestJson }))
    .pipe(gulp.dest('output/'));
});