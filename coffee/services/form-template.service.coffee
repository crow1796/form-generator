((window, document, angular) ->
	class FormTemplateService
		constructor: ->
			@template = []
			@tmpControl = {}
			@singleTabTemplate = []
			@formType = ''
		convertSource: (src, @templateValues) ->
			#Create tabbed form
			if src[0] instanceof Array
				# If src is 2-dimensional arrays
				# then it's a tabbed form
				@formType = 'tabbed'
				@extractTabbedForm(src)
				return @
			# Else it's a single form
			@formType = 'single'
			@extractSingleForm(src)
			@
		extractTabbedForm: (src) ->
			# Walk through steps/tabs
			src.map(@walkTabs)
			return
		walkTabs: (formControls) =>
			return if formControls.length is 0
			# walk through steps'/tabs' controls
			formControls.map(@extractFormControl)
			# Push single tab template to actual template
			return if @formType is 'single'
			@template.push(@singleTabTemplate)
			# Reset singletab template
			@singleTabTemplate = []
			return
		extractFormControl: (singleControl) =>
			# Split Controls' values
			splitControl = singleControl.split('|')
			# Check control's values/attributes
			@checkControl(splitControl)
			# Push tmpControl to singleTab template
			@singleTabTemplate.push(@tmpControl)
			# Reset tmpControl
			@tmpControl = {}
			return
		checkControl: (control) ->
			# Reset tmpControl props
			@resetTmpControl
			# If item on index 0 has '%' as first character
			# Then it's a plain text or legend
			if control[0].indexOf('%') is 0
				@tmpControl['type'] = 'legend'
				@tmpControl['label'] = control[0].substring(1)
				if control[2] isnt undefined
					@tmpControl['model'] = control[2]
				# Set Control's attributes
				@checkAndSetAttributesFor(control[1], 'attributes')
				return off
			# Else it's an actual control
			@tmpControl['label'] = control[0]
			@tmpControl['model'] = control[1]
			@tmpControl['type'] = control[2]

			if @tmpControl['type'] is 'repeater'
				@tmpControl['count'] = 1

			if @tmpControl['type'].indexOf('repeater') > -1 and @tmpControl['type'].indexOf(':') > -1
				tmpRepeater = @tmpControl['type'].split(':')
				if tmpRepeater[0] is 'repeater'
					@tmpControl['count'] = if tmpRepeater[1] isnt undefined then parseInt tmpRepeater[1] else 1
					@tmpControl['type'] = tmpRepeater[0]
					@tmpControl['max'] = if tmpRepeater[2] isnt undefined then parseInt tmpRepeater[2]
			else if @tmpControl['type'].indexOf('number') > -1 and @tmpControl['type'].indexOf(':') > -1
				tmpNumber = @tmpControl['type'].split(':');
				if tmpNumber[0] is 'number'
					@tmpControl['type'] = tmpNumber[0]
					@tmpControl['min_value'] = if tmpNumber[1] isnt undefined then parseInt tmpNumber[1]
					@tmpControl['max_digits'] = if tmpNumber[2] isnt undefined then parseInt tmpNumber[2]
					@tmpControl['max_value'] = if tmpNumber[3] isnt undefined then parseInt tmpNumber[3]
			else if @tmpControl['type'].indexOf('text') > -1 and @tmpControl['type'].indexOf(':') > -1
				tmpNumber = @tmpControl['type'].split(':');
				if tmpNumber[0] is 'text'
					@tmpControl['type'] = tmpNumber[0]
					@tmpControl['sub_type'] = if tmpNumber[1] isnt undefined then tmpNumber[1]
					@tmpControl['currency_prefix'] = if tmpNumber[2] isnt undefined then tmpNumber[2]

			# Set control's attributes
			@checkAndSetAttributesFor(control[3], 'attributes')
			@checkAndSetAttributesFor(control[4], 'container_attributes')
			@checkAndSetAttributesFor(control[5], 'rules', control[1])
			return
		setAttributes: (property, optionalControl) ->
			(value) =>
				# Split attributes name and value by ':'
				attributeValue = value.split(':')
				@tmpControl[property][attributeValue[0]] = attributeValue[1]
				return

		extractSingleForm: (src) ->
			@walkTabs(src)
			@

		checkAndSetAttributesFor: (control, property, model) ->
			if control isnt undefined
				@tmpControl[property] = {}
				# Remove first '@'
				attributes = control.substring(1, (control.length - 1))
				# console.log control, attributes.indexOf 'children' isnt -1
				if /children/g.test attributes
					childAttributes = (/\[([\w\W]+)\]/g.exec attributes)
					return if childAttributes is null or childAttributes is undefined
					childrenRules = childAttributes[1]
					splitAttributes = childrenRules.split('@')
					for i in [0...splitAttributes.length]
						childControlModel = splitAttributes[i].split(':')[0]
						childRules = splitAttributes[i].replace "#{childControlModel}:", ''
						childRules = [childRules]
						childControl = _.find(_.get(@templateValues, "#{model}"), {'model': childControlModel})
						for x in [0...childRules.length]
							splitAttr = childRules[x].split(':')
							_.set(childControl, "#{property}.#{splitAttr[0]}", splitAttr[1])
						# childRules.map(@setAttributes(property, childControl))
				if !/children/g.test attributes
					# Split attributes by '@'
					splitAttributes = attributes.split('@')
					splitAttributes.map(@setAttributes(property))
			return

		resetTmpControl: ->
			@tmpControl['type'] = ''
			@tmpControl['label'] = ''
			@tmpControl['attributes'] = ''
			@tmpControl['container_attributes'] = ''
			@tmpControl['count'] = ''
			return

		getTemplate: ->
			return @singleTabTemplate if @formType is 'single'
			for i in [0...@template]
				if @template[i].length is 0
					delete @template[i]
			@template

		getFormType: ->
			@formType

	angular.module 'form-generator'
			.service 'formTemplateService', [FormTemplateService]
	return
)(window, document, angular)