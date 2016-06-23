((window, document, angular) ->

	class Validator
		constructor: () ->
		validate: (controls, controller) =>
			if _.has(controller, 'beforeValidation') then controller.beforeValidation()
			errors = []
			subErrors = []
			controls.map((control) =>
				control['errors'] = []
				if control['rules'] is undefined
					if control['type'] is 'repeater'
						subErrors = @validateRepeaterControls(control, controller)
						for i in [0...subErrors.length]
							errors.push(subErrors[i])
					return
				controlIndex = controller.template[controller.template['currentTabIndex'] - 1].findIndex((element, index) ->
					element['model'] is control['model']
					)
				controller.template[controller.template['currentTabIndex'] - 1][controlIndex]['errors'] = []
				ruleNames = Object.keys(control['rules'])
				for i in [0...ruleNames.length]
					errors.push(@checkControlRules(ruleNames[i], control, controller.templateModel[control['model']], controller.template[controller.template['currentTabIndex'] - 1][controlIndex]['errors']))

				# Validate repeater's controls
				subErrors = @validateRepeaterControls(control, controller) if control['type'] is 'repeater'
				for i in [0...subErrors.length]
					errors.push(subErrors[i])
				return
				)
			errors = @filterErrors(errors)
			# Return validation results
			if errors.length isnt 0 then errors else no
		validateRepeaterControls: (parentControl, controller) =>
			errors = []
			controls = controller.templateValues[parentControl['model']]
			console.log controls
			controls.map((control) => 
				return if control['rules'] is undefined
				control['errors'] = []
				controlIndex = controller.templateValues[parentControl['model']].findIndex((element, index) ->
					element['model'] is control['model']
					)
				ruleNames = Object.keys(control['rules'])
				for i in [0...ruleNames.length]
					for count in [0...parentControl['count']]
						errors.push(@checkControlRules(ruleNames[i], control, _.get(controller.templateModel, "[#{parentControl['model']}][#{control['model']}][#{count}]"), control['errors']))
				return
				)
			errors = @filterErrors(errors)
			errors
		checkControlRules: (rule, control, model, controlErrors) => 
			if rule is 'required' and (control['rules']['required'] > 0 or control['rules']['required'] is 'true')
				if model is undefined or model is '' or model is null
					label = (control['label']).replace /[^\w\s]+/g, ''
					controlErrors.push(label + ' field is required.')
					return label + ' field is required.'
			else if rule is 'min'
				return if model is undefined
				if model.length < control['rules']['min']
					label = (control['label']).replace /[^\w\s]+/g, ''
					controlErrors.push("#{label} must not be less than #{control['rules']['min']} characters.")
					return "#{label} must not be less than #{control['rules']['min']} characters."
			else if rule is 'max'
				return if model is undefined
				if model.length > control['rules']['max']
					label = (control['label']).replace /[^\w\s]+/g, ''
					controlErrors.push("#{label} must not be more than #{control['rules']['max']} characters.")
					return "#{label} must not be more than #{control['rules']['max']} characters."
			else if rule is 'email' and (control['rules']['email'] > 0 or control['rules']['email'] is 'true')
				return if model is undefined
				emailValidator = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
				if !emailValidator.test(model)
					label = (control['label']).replace /[^\w\s]+/g, ''
					controlErrors.push("#{label} must be a valid email address.")
					return "#{label} must be a valid email address."
			else if rule is 'dimension'
				return if model is undefined
				dimension = (control['rules']['dimension']).split(',')
				width = dimension[0]
				height = dimension[1]
				label = (control['label']).replace /[^\w\s]+/g, ''
				if model instanceof Array
					for i in [0...model.length]
						imageError = @validateDimension(model[i], width, height, label)
						if imageError isnt undefined
							controlErrors.push imageError
							return imageError
						
				else
					imageError = @validateDimension(model, width, height, label)
					if imageError isnt undefined
						controlErrors.push imageError
						return imageError
			return ''
		validateDimension: (model, width, height, label) ->
			image = new Image()
			image.src = model
			if image.width > width or image.height > height
				return "#{label} must be less than or equal to " + width + "px width and less than or equal to " + height + "px height."
			return
		filterErrors: (errors) ->
			for i in [0...errors.length]
				if errors.indexOf('') > -1
					errors.splice(errors.indexOf(''), 1)
				if errors.indexOf(undefined) > -1
					errors.splice(errors.indexOf(undefined), 1)
			errors = @removeErrorDuplicates(errors)
			errors
		removeErrorDuplicates: (errors) ->
			uniqueErrors = errors.filter((item, pos) ->
				return errors.indexOf(item) == pos
				)
			uniqueErrors

	angular.module 'form-generator'
			.service 'formValidator', [Validator]
	return
)(window, document, window.angular)