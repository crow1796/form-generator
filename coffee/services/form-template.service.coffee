((window, document, $, angular) ->
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
				# Set Control's attributes
				@checkAndSetAttributesFor(control[1], 'attributes')
				return off
			# Else it's an actual control
			@tmpControl['label'] = control[0]
			@tmpControl['model'] = control[1]
			@tmpControl['type'] = control[2]

			if @tmpControl['type'].indexOf('repeater') > -1 and @tmpControl['type'].indexOf(':') > -1
				tmpRepeater = @tmpControl['type'].split(':')
				if tmpRepeater[0] is 'repeater'
					@tmpControl['count'] = 1
					@tmpControl['type'] = tmpRepeater[0]
					@tmpControl['max'] = parseInt tmpRepeater[1]
				
			

			# Set control's attributes
			@checkAndSetAttributesFor(control[3], 'attributes')
			@checkAndSetAttributesFor(control[4], 'container_attributes')
			@checkAndSetAttributesFor(control[5], 'rules')
			return
		setAttributes: (property) ->
			(value) =>
				# Split attributes name and value by ':'
				attributeValue = value.split(':')
				@tmpControl[property][attributeValue[0]] = attributeValue[1]
				return

		extractSingleForm: (src) ->
			@walkTabs(src)
			@

		checkAndSetAttributesFor: (control, property) ->
			if control isnt undefined
				@tmpControl[property] = {}
				# Remove first '@'
				attributes = control.substring(1, (control.length - 1))
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
)(window, document, $, angular)