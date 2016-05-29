((window, document, $, angular) ->

	ControlAttributeManager = ($parse) ->
		@restrict = 'A'
		@controller = 'controlAttributeController'
		@controllerAs = 'controlAttributeVm'
		@bindToController = true
		@scope = {
			controlAttrs: '='
		}

		@compile = (element, attrs) ->
			return {
				post: (scope, element, attrs) ->
					return if attrs.controlAttrs is undefined
					controlAttrs = JSON.parse(attrs.controlAttrs)
					delete controlAttrs['class']
					attributeNames = Object.keys(controlAttrs)
					for i in [0...attributeNames.length]
						element.bind attributeNames[i], controlAttrs[attributeNames[i]]
					return
			}

		
		@

	angular.module 'form-generator'
			.directive 'controlAttributeManager', ['$parse', ControlAttributeManager]
	return
)(window, document, window.jQuery, window.angular)