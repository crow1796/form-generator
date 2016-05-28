((window, document, $, angular) ->

	FormGenerator = ($timeout) ->
		@restrict = 'E'
		@templateUrl = 'coffee/templates/form-generator.html'
		@controller = 'formGeneratorController'
		@controllerAs = 'formGeneratorVm'
		@generatorHelper = new window.App.Helpers.Generator()
		@scope = {
			src: '='
		}
		
		@link = (scope, element, attrs) ->
			console.log scope.src
			on
		@

	angular.module 'form-generator'
			.directive 'formGenerator', ['$timeout', FormGenerator]

	on
)(window, document, window.jQuery, window.angular)