((window, document, $, angular) ->

	FormGenerator = ->
		generator = {}

		generator.restrict = 'E'
		generator.templateUrl = 'coffee/templates/form-generator.html'

		generator

	angular.module 'form-generator'
			.directive 'formGenerator', [FormGenerator]

	on
)(window, document, window.jQuery, window.angular)