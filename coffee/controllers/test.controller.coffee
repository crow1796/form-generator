((window, document, $, angular) ->
	class TestController
		constructor: ->
			@template = [
					['First Name|first_name|text:value|[@attribute:value]'],
					['Middle Name|middle_name|text:value|[@attribute:value]'],
					['Last Name|last_name|text:value|[@attribute:value]'],
					['NickName|nickname_name|text:value|[@attribute:value]']
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