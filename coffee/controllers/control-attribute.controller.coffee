((window, document, $, angular) ->
	class ControlAttributeController
		constructor: ->
			@load()
		load: ->
			$ ->
				return
			return

	angular.module 'form-generator'
			.controller 'controlAttributeController', [ControlAttributeController]
	return
)(window, document, window.jQuery, window.angular)