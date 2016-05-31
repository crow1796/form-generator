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
		repeaterRemoveItem: (model, formControl) ->
			if @templateModel[model] isnt undefined
				if formControl['count'] is 1
					@templateModel[model] = {}
					
			if formControl['count'] > 1
				formControl['count'] = formControl['count'] - 1

			return if @templateModel[model] is undefined

			keys = Object.keys(@templateModel[model])
			for keyCounter in [0...keys.length]
				if Object.keys(@templateModel[model][keys[keyCounter]]).length >= formControl['count']
					delete @templateModel[model][keys[keyCounter]][formControl['count']]
			return
		repeaterAddItem: (model, formControl) ->
			formControl['count'] = formControl['count'] + 1
			return
		setOtherRadio: (model) ->
			if @templateModel[model] is undefined
				@templateModel[model] = {}
			@templateModel[model]['index'] = "#{model}_other"
			return
		clearOtherInput: (model) ->
			console.log model
			if @templateModel[model] is undefined
				@templateModel[model] = {}

			if @templateModel[model]['other_value'] isnt undefined
				delete @templateModel[model]['other_value']
			return


	angular.module 'form-generator'
			.controller 'formGeneratorController', ['formTemplateService', FormGeneratorController]
	return
)(window, document, window.jQuery, window.angular)