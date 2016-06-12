####################################
# Required dependencies:
#  - Form Generator HTML Template
#  - AngularJS
#  - Bootstrap
#  - Loadash
#  
#  - Events
#   - load
#   - beforePrevious
#   - afterPrevious
#   - beforeNext
#   - afterNext
#   - onValidationSuccess
#   - onValidationFailed
#   - onSubmit
#   - onAfterSubmit
####################################
((window, document, $, angular) ->
	class FormGeneratorController
		constructor: (@formTemplateService, @scope) ->
			@converter = @formTemplateService.convertSource(@src, @templateValues)
			@template = @converter.getTemplate()
			@formType = @converter.getFormType()
			@registerEvents()
			@template['currentTabIndex'] = 1
			@clickedTabs = [@template['currentTabIndex']];
			@errors = []
			if _.has(@, 'load') then @load()
		registerEvents: ->
			if @src['displayErrors'] isnt undefined then @template['displayErrors'] = @src['displayErrors']
			if @src['load'] isnt undefined then @load = @src['load']
			if @src['beforePrevious'] isnt undefined then @beforePrevious = @src['beforePrevious']
			if @src['afterPrevious'] isnt undefined then @afterPrevious = @src['afterPrevious']
			if @src['beforeNext'] isnt undefined then @beforeNext = @src['beforeNext']
			if @src['afterNext'] isnt undefined then @afterNext = @src['afterNext']
			if @src['onValidationSuccess'] isnt undefined then @onValidationSuccess = @src['onValidationSuccess']
			if @src['onValidationFailed'] isnt undefined then @onValidationFailed = @src['onValidationFailed']
			if @src['onSubmit'] isnt undefined then @onSubmit = @src['onSubmit']
			if @src['onAfterSubmit'] isnt undefined then @onAfterSubmit = @src['onAfterSubmit']
			return
		sendForm: (event) =>
			event.preventDefault()
			@errors = []
			controls = @template[@template.length - 1]
			@errors = @validate(controls)
			if !@errors
				if _.has(@, 'onValidationSuccess') then @onValidationSuccess()
				if _.has(@, 'onSubmit') then @onSubmit(event, @template)
				if _.has(@, 'onAfterSubmit') then @onAfterSubmit()
			else
				if _.has(@, 'onValidationFailed') then @onValidationFailed(@errors)
			return
		handleOtherInput: (model) ->
			model = model + '_other'
			return
		changeCurrentTabIndex: (event, index) ->
			event.preventDefault()
			if @clickedTabs.indexOf(index + 1) > -1 then @template['currentTabIndex'] = (index + 1)
			return
		next: (controls) =>
			if _.has(@, 'beforeNext') then @beforeNext()
			@errors = []
			# validate(@template['currentTabIndex'])
			if @template['currentTabIndex'] < @template.length
				# If validation has no errors
				@errors = @validate(controls)
				if !@errors
					if _.has(@, 'onValidationSuccess') then @onValidationSuccess()
					@template['currentTabIndex'] = @template['currentTabIndex'] + 1
					if @clickedTabs.indexOf(@template['currentTabIndex']) == -1 then @clickedTabs.push(@template['currentTabIndex'])
					if _.has(@, 'afterNext') then @afterNext()
				else
					if _.has(@, 'onValidationFailed') then @onValidationFailed(@errors)
			return
		previous: ->
			if _.has(@, 'beforePrevious') then @beforePrevious()
			if @template['currentTabIndex'] > 1
				@template['currentTabIndex'] = @template['currentTabIndex'] - 1
				if _.has(@, 'afterPrevious') then @afterPrevious()
			return
		undo: (model) =>
			if model instanceof Array
				model = model.join('.')

			_.unset(this.templateModel, model)
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
			if formControl['max'] isnt undefined
				if formControl['count'] < formControl['max']
					formControl['count'] = formControl['count'] + 1
					return off
				return off
			formControl['count'] = formControl['count'] + 1
			return
		setOtherRadio: (model, value) ->
			joined = model.join('.')
			_.unset(@templateModel, joined)

			model.push('index')
			joined = model.join('.')
			_.update(@templateModel, joined, (originalValue) =>
				value
				)
			return
		setWithRadio: (model, value) ->
			joined = model.join('.')
			if _.has(@templateModel, joined + '.with_value') 
				if _.get(@templateModel, joined + '.index') is value
					return off
			_.unset(@templateModel, joined)

			model.push('index')
			joined = model.join('.')
			_.update(@templateModel, joined, (originalValue) =>
				value
				)
			return
		clearOtherInput: (model, value) ->
			joined = model.join('.')
			trim = joined.substring(0, joined.indexOf('.index'))
			_.unset(@templateModel, trim)
			_.update(@templateModel, joined, (originalValue) =>
				value
				)
			return
		clearCheckboxWithInputs: (model) ->
			joined = model.join('.')
			if _.get(@templateModel, model)['status'] is false
				_.unset(@templateModel, model)
			return
		validate: (controls) =>
			if _.has(@, 'beforeValidation') then @beforeValidation()
			hasErrors = []
			hasSubErrors = []
			controls.map((control) =>
				control['errors'] = []
				return if control['rules'] is undefined
				controlIndex = @template[@template['currentTabIndex'] - 1].findIndex((element, index) ->
					element['model'] is control['model']
					)
				@template[@template['currentTabIndex'] - 1][controlIndex]['errors'] = []
				ruleNames = Object.keys(control['rules'])
				for i in [0...ruleNames.length]
					if ruleNames[i] is 'required' and (control['rules']['required'] > 0 or control['rules']['required'] is 'true')
						if @templateModel[control['model']] is undefined or @templateModel[control['model']] is '' or @templateModel[control['model']] is null
							@template[@template['currentTabIndex'] - 1][controlIndex]['errors'].push(control['label'] + ' field is required.')
							hasErrors.push(control['label'] + ' field is required.')
					else if ruleNames[i] is 'min'
						return if @templateModel[control['model']] is undefined
						if @templateModel[control['model']].length < control['rules']['min']
							@template[@template['currentTabIndex'] - 1][controlIndex]['errors'].push("#{control['label']} must not be less than #{control['rules']['min']} characters.")
							hasErrors.push("#{control['label']} must not be less than #{control['rules']['min']} characters.")
					else if ruleNames[i] is 'max'
						return if @templateModel[control['model']] is undefined
						if @templateModel[control['model']].length > control['rules']['max']
							@template[@template['currentTabIndex'] - 1][controlIndex]['errors'].push("#{control['label']} must not be more than #{control['rules']['max']} characters.")
							hasErrors.push("#{control['label']} must not be more than #{control['rules']['max']} characters.")

				hasSubErrors = @validateSubControls(control) if control['type'] is 'repeater'
				for i in [0...hasSubErrors.length]
					hasErrors.push(hasSubErrors[i])
				return
				)
			# Return validation results
			if hasErrors.length isnt 0 then hasErrors else no
		validateSubControls: (parentControl) =>
			hasErrors = []
			controls = @templateValues[parentControl['model']]
			controls.map((control) => 
				return if control['rules'] is undefined
				control['errors'] = []
				controlIndex = @templateValues[parentControl['model']].findIndex((element, index) ->
					element['model'] is control['model']
					)
				ruleNames = Object.keys(control['rules'])
				for i in [0...ruleNames.length]
					for count in [0...parentControl['count']]
						if ruleNames[i] is 'required' and (control['rules']['required'] > 0 or control['rules']['required'] is 'true')
							if _.get(@templateModel, parentControl['model']) is undefined or _.get(@templateModel, "[#{parentControl['model']}][#{control['model']}][#{count}]") is undefined or _.get(@templateModel, "[#{parentControl['model']}][#{control['model']}][#{count}]") is '' or _.get(@templateModel, "[#{parentControl['model']}][#{control['model']}][#{count}]") is null
								# console.log "[#{parentControl['model']}][#{control['model']}][#{count}]", @templateModel[parentControl['model']]
								control['errors'].push(control['label'] + ' field is required.')
								# console.log(control['errors']);
								hasErrors.push(control['label'] + ' field is required.')
				return
				)
			hasErrors

	angular.module 'form-generator'
			.controller 'formGeneratorController', ['formTemplateService', '$scope', FormGeneratorController]
	return
)(window, document, window.jQuery, window.angular)