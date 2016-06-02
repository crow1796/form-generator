((window, document, $, angular) ->

	class FormGenerator
		constructor: (@timeout) ->
			@controller = 'formGeneratorController'
			@controllerAs = 'formGeneratorVm'
			@restrict = 'E'
			@bindToController = true
			@scope = {
				src: '=',
				templateModel: '=',
				templateValues: '=',
				submit: '='
			}
			@templateUrl = 'coffee/templates/form-generator.html'
		link: (scope, element, attrs) ->

		fetchFromObject: (obj, prop) ->
			#property not found
			if typeof obj is 'undefined'
				return false
			#index of next property split
			_index = prop.indexOf('.')
			#property split found; recursive call
			if _index > -1
				#get object at property (before split), pass on remainder
				return @fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1))
			#no split; get property
			obj[prop]

	angular.module 'form-generator'
			.directive 'formGenerator', ($timeout) ->
				new FormGenerator($timeout)

	return
)(window, document, window.jQuery, window.angular)