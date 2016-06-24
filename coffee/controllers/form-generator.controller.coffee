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
#   - beforeUndo
#   - afterUndo
#   - onValidationSuccess
#   - onValidationFailed
#   - onSubmit
#   - onAfterSubmit
####################################
((window, document, angular) ->
	class FormGeneratorController
		constructor: (@formTemplateService, @formValidator, @scope, @filter) ->
			@converter = @formTemplateService.convertSource(@src, @templateValues)
			@template = @converter.getTemplate()
			@formType = @converter.getFormType()
			@registerEvents()
			@template['currentTabIndex'] = 1
			@clickedTabs = [@template['currentTabIndex']];
			if @template['editMode'] is on
				for i in [0...@template.length]
					@clickedTabs.push(i + 1)
			@errors = []
			if _.has(@, 'load') then @load(@template)
		registerEvents: ->
			if @src['displayErrors'] isnt undefined then @template['displayErrors'] = @src['displayErrors']
			if @src['editMode'] isnt undefined then @template['editMode'] = @src['editMode']
			if @src['load'] isnt undefined then @load = @src['load']
			if @src['beforePrevious'] isnt undefined then @beforePrevious = @src['beforePrevious']
			if @src['afterPrevious'] isnt undefined then @afterPrevious = @src['afterPrevious']
			if @src['beforeNext'] isnt undefined then @beforeNext = @src['beforeNext']
			if @src['afterNext'] isnt undefined then @afterNext = @src['afterNext']
			if @src['beforeUndo'] isnt undefined then @beforeUndo = @src['beforeUndo']
			if @src['afterUndo'] isnt undefined then @afterUndo = @src['afterUndo']
			if @src['afterPreviewRemoved'] isnt undefined then @afterPreviewRemoved = @src['afterPreviewRemoved']
			if @src['onValidationSuccess'] isnt undefined then @onValidationSuccess = @src['onValidationSuccess']
			if @src['onValidationFailed'] isnt undefined then @onValidationFailed = @src['onValidationFailed']
			if @src['onSubmit'] isnt undefined then @onSubmit = @src['onSubmit']
			if @src['onAfterSubmit'] isnt undefined then @onAfterSubmit = @src['onAfterSubmit']
			return
		sendForm: (event) =>
			event.preventDefault()
			@errors = []
			controls = @template[@template.length - 1]
			@errors = @formValidator.validate(controls, @)
			if !@errors
				if _.has(@, 'onValidationSuccess') then @onValidationSuccess()
				if _.has(@, 'onSubmit') then @onSubmit(event, @template)
				if _.has(@, 'onAfterSubmit') then @onAfterSubmit()
			else
				if _.has(@, 'onValidationFailed') then @onValidationFailed(@errors)
				return off
			return
		removePreview: (event, model, index) ->
			event.preventDefault()
			@templateModel[model].splice(index, 1)
			if _.has(@, 'afterPreviewRemoved') then @afterPreviewRemoved(model, index, @template)
			return
		watchControl: (control, model) =>
			return if !_.has(@templateModel, model) or _.get(@templateModel, model) is null
			model = if model instanceof Array then model.join('.') else model
			if control['type'] is 'number'
				if control['min_value'] isnt undefined
					minVal = parseInt control['min_value']
					if _.get(@templateModel, model) < minVal
						_.set(@templateModel, model, minVal)
				if control['max_digits'] isnt undefined
					maxDigits = parseInt control['max_digits']
					if _.get(@templateModel, model) and (_.get(@templateModel, model)).toString().length > maxDigits
						value = ((_.get(@templateModel, model)).toString()).substring(0, maxDigits)
						_.set(@templateModel, model, parseInt(value))
				if control['max_value'] isnt undefined
					maxVal = parseInt control['max_value']
					if _.get(@templateModel, model) > maxVal
						_.set(@templateModel, model, maxVal)
			if control['type'] is 'text'
				if control['sub_type'] isnt undefined and control['sub_type'] is 'currency'
					value = (_.get(@templateModel, model)).replace(/,|\./g, '')
					newValue = @filter('currency')(value, '', 0)
					_.set(@templateModel, model, newValue)
					# if /([^\d|,|\.{1}])/g.test _.get(@templateModel, model)
					# 	value = ((_.get(@templateModel, model)).toString()).substring(0, ((_.get(@templateModel, model)).toString()).length - 1)
					# 	_.set(@templateModel, model, value)
					# else if /[^\d|,|\.{1}]/g.test _.get(@templateModel, model) or _.get(@templateModel, model) is ''
					# 	return off
					# # newValue = (_.get(@templateModel, model)).replace(/(\d)(?=(\d{3})+)/g, '$1,')
					# value = (_.get(@templateModel, model)).replace(/,/g, '')
					# if value.indexOf('.') > -1
					# 	decimal = (/^\D*(\d+(\.\d+)?)/g.exec(value))[2]
					# value = (parseFloat (value).replace(/[^\d]/g, ''))
					# newValue = value.toLocaleString()
					# _.set(@templateModel, model, (_.get(@templateModel, model)).replace(/[^\d]/g,'').replace(/(\d\d?)$/,'.$1'))
			if control['type'] is 'text'
				if control['sub_type'] isnt undefined and control['sub_type'] is 'tel'
					value = (_.get(@templateModel, model))
					hasLetter = /[^\d|\+|(|)|\s|\-|\.]/g.test value
					if hasLetter is yes
						_.set(@templateModel, model, value.substring 0, value.length - 1)
			return
		handleOtherInput: (model) ->
			model = model + '_other'
			return
		changeCurrentTabIndex: (event, index, controls) ->
			event.preventDefault()
			if(index >= @template['currentTabIndex']) then @errors = @formValidator.validate(controls, @) else @errors = null
			if !@errors
				if _.has(@, 'onValidationSuccess') then @onValidationSuccess()
				if @clickedTabs.indexOf(index + 1) > -1 then @template['currentTabIndex'] = (index + 1)
				if _.has(@, 'afterNext') then @afterNext()
			else
				if _.has(@, 'onValidationFailed') then @onValidationFailed(@errors)
			
			return
		next: (controls) =>
			if _.has(@, 'beforeNext') then @beforeNext()
			@errors = []
			# validate(@template['currentTabIndex'])
			if @template['currentTabIndex'] < @template.length
				# If validation has no errors
				@errors = @formValidator.validate(controls, @)
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
				@errors = []
				if _.has(@, 'afterPrevious') then @afterPrevious()
			return
		undo: (model, control) =>
			if model instanceof Array
				model = model.join('.')
			if _.has(@, 'beforeUndo') then @beforeUndo(model, control)
			_.unset(@templateModel, model)
			_.unset(control, 'errors')
			if _.has(@, 'afterUndo') then @afterUndo(model, control)
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

	angular.module 'form-generator'
			.controller 'formGeneratorController', ['formTemplateService', 'formValidator', '$scope', '$filter', FormGeneratorController]
	return
)(window, document, window.angular)