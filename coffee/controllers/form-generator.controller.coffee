((window, document, $, angular) ->
	class FormGeneratorController
		constructor: (@formTemplateService) ->
			@converter = @formTemplateService.convertSource(@src, @templateValues)
			@template = @converter.getTemplate()
			@formType = @converter.getFormType()
			@currentTabIndex = 1
			@load()
		load: ->
			$ ->
				return
			return
		handleOtherInput: (model) ->
			model = model + '_other'
			console.log model
			return
		next: ->
			if @currentTabIndex < @template.length
				@currentTabIndex = @currentTabIndex + 1
			return
		previous: ->
			if @currentTabIndex > 1
				@currentTabIndex = @currentTabIndex - 1
			return
		range: (min, max, step) ->
			step = step || 1
			input = []
			for i in [min...max]
				input.push(i)
			input

	angular.module 'form-generator'
			.controller 'formGeneratorController', ['formTemplateService', FormGeneratorController]
	return
)(window, document, window.jQuery, window.angular)