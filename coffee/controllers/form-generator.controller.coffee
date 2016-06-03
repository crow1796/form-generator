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
			return
		changeCurrentTabIndex: (event, index) ->
			event.preventDefault()
			# @currentTabIndex = (index + 1)
			return
		next: (controls) =>
			
			# validate(@currentTabIndex)
			if @currentTabIndex < @template.length
				# If validation has no errors
				hasErrors = @validate(controls)
				if hasErrors is off
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
			if @templateModel[model] is undefined
				@templateModel[model] = {}

			if @templateModel[model]['other_value'] isnt undefined
				delete @templateModel[model]['other_value']
			return
		validate: (controls) =>
			hasErrors = off
			controls.map((control) =>
				control['errors'] = []
				return if control['rules'] is undefined
				controlIndex = @template[@currentTabIndex - 1].findIndex((element, index) ->
					element['model'] is control['model']
					)
				@template[@currentTabIndex - 1][controlIndex]['errors'] = []
				ruleNames = Object.keys(control['rules'])
				for i in [0...ruleNames.length]
					if ruleNames[i] is 'required' and (control['rules']['required'] > 0 or control['rules']['required'] is 'true')
						if @templateModel[control['model']] is undefined or @templateModel[control['model']] is '' or @templateModel[control['model']] is null
							@template[@currentTabIndex - 1][controlIndex]['errors'].push(control['label'] + ' field is required.')
							hasErrors = on
					else if ruleNames[i] is 'min'
						return if @templateModel[control['model']] is undefined
						if @templateModel[control['model']].length < control['rules']['min']
							@template[@currentTabIndex - 1][controlIndex]['errors'].push("#{control['label']} must not be less than #{control['rules']['min']} characters.")
							hasErrors = on
					else if ruleNames[i] is 'max'
						return if @templateModel[control['model']] is undefined
						if @templateModel[control['model']].length > control['rules']['max']
							@template[@currentTabIndex - 1][controlIndex]['errors'].push("#{control['label']} must not be more than #{control['rules']['max']} characters.")
							hasErrors = on
				return
				)
			hasErrors


	angular.module 'form-generator'
			.controller 'formGeneratorController', ['formTemplateService', FormGeneratorController]
	return
)(window, document, window.jQuery, window.angular)