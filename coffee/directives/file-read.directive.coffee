((window, document, $, angular) ->
    FormFileReader = ($q) ->
        slice = Array.prototype.slice
        @restrict = 'A'
        @require = '?ngModel'
        @compile = (element, attrs) ->
            return {
                pre: (scope, element, attrs, ngModel) ->
                    return if !ngModel or attrs['type'] isnt 'file'

                    ngModel.$render = ->

                    element.bind 'change', (e) ->
                        el = e.target
                        return if !el.value

                        el.disabled = yes
                        $q.all(slice.call(el.files, 0).map(readFile($q)))
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
            }

        readFile = ($q) ->
            return (file) ->
                deferred = $q.defer()
                reader = new FileReader()
                reader.onload = (e) ->
                    deferred.resolve(e.target.result)
                    return
                reader.onerror = (e) ->
                    deferred.reject(e)
                    return
                    
                reader.readAsDataURL(file)

                deferred.promise

        @

    angular.module 'form-generator' 
            .directive 'formFilereader', ['$q', FormFileReader]
    return
)(window, document, window.jQuery, window.angular)