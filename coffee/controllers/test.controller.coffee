((window, document, $, angular) ->
	class TestController
		constructor: ->
			@template = [
				['First Name|first_name|text:value|[@attribute:value]'],
				['test|test|test'],
				['test|test|test'],
				['test|test|test'],
				['test|test|test']
				];
			@load
		load: ->
			$ ->

				on
			on
	angular.module 'form-generator'
			.controller 'testController', [TestController]
	on
)(window, document, window.jQuery, window.angular)