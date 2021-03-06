var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	merge2 = require('merge2'),
	concat = require('gulp-concat'),
	del = require('del'),
	clean = require('gulp-clean'),
	plumber = require('gulp-plumber'),
	coffee = require('gulp-coffee');

gulp.task('coffee', function(){
	var js = gulp.src('./js/app.js');
	var coffeeScript = gulp.src([
				'./coffee/*.coffee',
				'./coffee/**/*.coffee'
				])
				.pipe(plumber({
					errorHandler: function(err){
						console.log(err)
					}
				}))
				.pipe(coffee({bare: true}));
	merge2([coffeeScript, js])
		.pipe(plumber())
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