((window, document, $, angular) ->

	FormGenerator = ->
		@restrict = 'E'
		@templateUrl = 'coffee/templates/form-generator.html'
		@controller = 'formGeneratorController'
		@generatorHelper = new window.App.Helpers.Generator()
		@link = (scope, element, attrs) ->
			source = @generatorHelper
						.getSourceFrom(scope, attrs.src)
			on
		@
	angular.module 'form-generator'
			.directive 'formGenerator', [FormGenerator]

	on
)(window, document, window.jQuery, window.angular)