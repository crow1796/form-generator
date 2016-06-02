((window, document, $, angular) ->	
	class Validator
		constructor: ->
			@restrict = 'A'
			@scope = {
				displayErrors: '='
			}

		link: (scope, element, attrs) ->
			console.log scope.displayErrors
			return

	angular.module 'form-generator'
			.directive 'validation', ->
				new Validator()
	return
)(window, document, window.jQuery, window.angular)