((window, document, $, angular) ->
	class TestController
		constructor: ->
			@template = [
					[
						'First Name|first_name|text:value|[class:form-control class2]',
						'School|school|text:value|[class:form-control@ng-click:testVm.method()]'
					],
					[
						'%Optional|[class:legend]',
						'Middle Name|middle_name|text:value|[class:form-control]'
					],
					[
						'Last Name|last_name|text:value|[class:form-control]'
					],
					[
						'NickName|nickname_name|text:value|[class:form-control]'
					]
				];
			@templateModel = {}

		processForm: (event) ->
			event.preventDefault()
			console.log 'asdsa'
			
	angular.module 'form-generator'
			.controller 'testController', [TestController]
	on
)(window, document, window.jQuery, window.angular)