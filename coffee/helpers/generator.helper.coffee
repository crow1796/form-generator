((window, document, $, angular) ->	

	class window.App.Helpers.Generator
		getSourceFrom: (scope, source)->
			@convertSource(@fetchFromObject(scope, source))
		fetchFromObject: (obj, prop) ->
			#property not found
			if typeof obj is 'undefined'
				return false
			#index of next property split
			_index = prop.indexOf('.')
			#property split found; recursive call
			if _index > -1
				#get object at property (before split), pass on remainder
				return @fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1))
			#no split; get property
			obj[prop]
		convertSource: (source) ->
			source

	on
)(window, document, window.jQuery, window.angular)