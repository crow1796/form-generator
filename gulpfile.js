var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	merge2 = require('merge2'),
	concat = require('gulp-concat'),
	del = require('del'),
	clean = require('gulp-clean'),
	coffee = require('gulp-coffee');

gulp.task('coffee', function(){
	var js = gulp.src('./js/app.js');
	var coffeeScript = gulp.src([
				'./coffee/*.coffee',
				'./coffee/**/*.coffee'
				])
			  .pipe(coffee())
			  .on('error', function(error){
			  	console.log(error);
			  });
	merge2([coffeeScript, js])
		.pipe(concat('./js/app.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
	gulp.watch('./coffee/*.coffee', ['clean', 'coffee']);
	gulp.watch('./coffee/**/*.coffee', ['clean', 'coffee']);
});

gulp.task('clean', function(){
	del.sync(['./js/app.js']);
	gulp.src('./js/app.js');
});