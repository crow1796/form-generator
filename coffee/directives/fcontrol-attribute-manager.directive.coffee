((window, document, $, angular) ->
	ControlAttributeManager = ($parse) ->
		@restrict = 'A'
		@controller = 'controlAttributeController'
		@controllerAs = 'controlAttributeVm'
		@bindToController = true
		@scope = {
			controlAttributeManager: '='
		}

		@compile = (element, attrs) ->
			return {
				post: (scope, element, attrs) ->
					console.log attrs.controlAttributeManager
					return if attrs.controlAttributeManager is undefined
					controlAttributeManager = JSON.parse(attrs.controlAttributeManager)
					delete controlAttributeManager['class']
					attributeNames = Object.keys(controlAttributeManager)
					for i in [0...attributeNames.length]
						element.bind attributeNames[i], controlAttributeManager[attributeNames[i]]
					return
			}
		
		@

	angular.module 'form-generator'
			.directive 'controlAttributeManager', ['$parse', ControlAttributeManager]
	return
)(window, document, window.jQuery, window.angular)