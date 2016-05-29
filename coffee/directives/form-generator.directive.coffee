((window, document, $, angular) ->

	FormGenerator = ($timeout) ->
		@restrict = 'E'
		@templateUrl = 'coffee/templates/form-generator.html'
		@controller = 'formGeneratorController'
		@controllerAs = 'formGeneratorVm'
		@bindToController = true
		@scope = {
			src: '=',
			templateModel: '=',
			templateValues: '=',
			submit: '='
		}

		@link = (scope, element, attr) ->

		@fetchFromObject = (obj, prop) ->
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
		@

	angular.module 'form-generator'
			.directive 'formGenerator', ['$timeout', FormGenerator]

	return
)(window, document, window.jQuery, window.angular)