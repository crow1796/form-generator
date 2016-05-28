((window, document, $, angular) ->
	class FormTemplateService
		constructor: ->
			@template = []
			@tmpControl = {}
			@singleTabTemplate = []
		convertSource: (src) ->
			#Create tabbed form
			if src[0] instanceof Array
				# If src is 2-dimensional arrays
				# then it's a tabbed form
				@extractTabbedForm(src)
				return @template
			# Else it's a single form
			@template
		extractTabbedForm: (src) ->
			# Walk through steps/tabs
			src.map(@walkTabs)
			on
		walkTabs: (formControls) =>
			# walk through steps'/tabs' controls
			formControls.map(@extractFormControl)
			# Push single tab template to actual template
			@template.push(@singleTabTemplate)
			# Reset singletab template
			@singleTabTemplate = []
			on
		extractFormControl: (singleControl) =>
			# Split Controls' values
			splitControl = singleControl.split('|')
			# Check control's values/attributes
			@checkControl(splitControl)
			# Push tmpControl to singleTab template
			@singleTabTemplate.push(@tmpControl)
			# Reset tmpControl
			@tmpControl = {}
			on
		checkControl: (control) ->
			# If item on index 0 has '%' as first character
			# Then it's a plain text
			if control[0].indexOf('%') is 0
				@tmpControl['type'] = 'plain_text'
				@tmpControl['label'] = control[0].substring(1)
				return off
			# Else it's an actual control
			@tmpControl['label'] = control[0]
			@tmpControl['model'] = control[1]

			# If column has ':'
			# then it has default value
			if control[2].indexOf(':') > -1
				typeValue = control[2].split(':')
				@tmpControl['type'] = typeValue[0]
				@tmpControl['value'] = typeValue[1]

			# If column is 'undefined'
			# Then, set attributes
			if control[3] isnt 'undefined'
				@tmpControl['attributes'] = {}
				# Remove first '@'
				attributes = control[3].substring(1, (control[3].length - 1))
				# Split attributes by '@'
				splitAttributes = attributes.split('@')
				splitAttributes.map(@setAttributes)
			on
		setAttributes: (value) =>
			# Split attributes name and value by ':'
			attributeValue = value.split(':')
			@tmpControl['attributes'][attributeValue[0]] = attributeValue[1]

		extractSingleForm: (src) ->
			on

	angular.module 'form-generator'
			.service 'formTemplateService', [FormTemplateService]
	on
)(window, document, $, angular)