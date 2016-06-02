((window, document, $, angular) ->

	class InputAttributes 
		constructor: (@parse, @q, @compile) ->
			@slice = Array.prototype.slice
			@restrict = 'A'
			@require = '?ngModel'
			@scope = {
				customAttributes: '=?',
				validations: '=?'
			}
		link: (scope, element, attrs, ngModel) =>
			if attrs['type'] isnt 'file'
				@attributesManager(scope, element, attrs)
				return off
			return if !ngModel or attrs['type'] isnt 'file'
			ngModel.$render = ->

			element.bind 'change', (e) =>
			    el = e.target
			    return if !el.value

			    el.disabled = yes
			    @q.all(@slice.call(el.files, 0).map(@readFile))
			        .then (values) ->
			            if el.multiple
			                ngModel.$setViewValue(values)
			            else
			                ngModel.$setViewValue(if values.length then values[0] else null)
			            el.value = null
			            el.disabled = no
			            return
			    return
			return
		readFile: (file) =>
		    deferred = @q.defer()
		    reader = new FileReader()
		    reader.onload = (e) ->
		        deferred.resolve(e.target.result)
		        return
		    reader.onerror = (e) ->
		        deferred.reject(e)
		        return
		        
		    reader.readAsDataURL(file)

		    deferred.promise
		attributesManager: (scope, element, attrs) =>
			return if scope.customAttributes is undefined
			controlAttributes = if (scope.customAttributes instanceof Object) then JSON.parse(JSON.stringify(scope.customAttributes)) else null
			return if controlAttributes is null
			delete controlAttributes['class']
			attributeNames = Object.keys(controlAttributes)
			# Register events
			supportedEvents = ['click', 'change']
			for i in [0...attributeNames.length]
				continue if supportedEvents.indexOf(attributeNames[i]) is -1
				# Split Event listener
				splitEvent = controlAttributes[attributeNames[i]].split('.')
				# Bind event to element
				element.bind attributeNames[i], scope.$parent.$parent.$parent.$parent.$parent.$parent[splitEvent[0]][splitEvent[1]]
				# Remove binded event from controlAttributes
				delete controlAttributes[attributeNames[i]]
			# Get and assign other attributes
			attributeNames = Object.keys(controlAttributes)
			for i in [0...attributeNames.length]
				element.attr attributeNames[i], controlAttributes[attributeNames[i]]
				@compile(element)
			return


	angular.module 'form-generator'
			.directive 'inputAttributes', ($parse, $q, $compile) ->
				new InputAttributes($parse, $q)

	return
)(window, document, window.jQuery, window.angular)