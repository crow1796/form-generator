((window, document, $, angular) ->
	class FormGeneratorController
		constructor: (@formTemplateService) ->
			@template = @formTemplateService.convertSource(@src)
			@load()
		load: ->
			$ ->
				on
			on

	angular.module 'form-generator'
			.controller 'formGeneratorController', ['formTemplateService', FormGeneratorController]
	on
)(window, document, window.jQuery, window.angular)