(function(window, document, $, angular) {
	angular.module('app', ['form-generator'])
  var TestController;
  TestController = (function() {
    function TestController() {
      this.processForm = bind(this.processForm, this);
      this.templateModel = {};
      // this.template = [['First Name|first_name|text|[class:form-control class2]|[class:form-group]', 'School|school|text|[class:form-control@click:testVm.handleClick@change:testVm.handleChange]|[class:form-group]', 'Profile Picture|profile_picture|file|[class:form-control]|[class:form-group]', 'Multiple files|multiple_files|files|[class:form-control]|[class:form-group]', 'Describe yourself|description|textarea|[class:form-control]|[class:form-group]', 'Age|age|number|[class:form-control]|[class:form-group]'], ['%Optional|[class:legend]', 'Middle Name|middle_name|text|[class:form-control]|[class:form-group]', 'Click Me!|click_me|button|[class:btn btn-md btn-primary@click:testVm.handleClick]|[class:form-group]'], ['Last Name|last_name|text|[class:form-control]|[class:form-group]', '%Birthday|[class:legend]', 'Month|month|select|[class:form-control]|[class:form-group]', 'Day|day|select|[class:form-control]|[class:form-group]', 'Year|year|select|[class:form-control]|[class:form-group]'], ['NickName|nickname_name|text|[class:form-control]|[class:form-group]', 'Choice|choice|radio&other|[class:form-radio]|[class:form-group]', 'Gender|gender|radio|[class:form-radio]|[class:form-group]', 'Hobbies|hobbies|checkbox|[class:form-checkbox]|[class:form-group]'], ['Repeater|repeater|repeater|[class:form-control]|[class:form-group]']];
      this.template = [
      'First Name|first_name|text|[class:form-control]|[class:form-group]', 
      'Middle Name|middle_name|text|[class:form-control]|[class:form-group]', 
      'Last Name|last_name|text|[class:form-control]|[class:form-group]', 
      'Profile Picture|profile_picture|file&preview|[class:form-control]|[class:form-group]', 
      'Repeater|repeater|repeater|[class:form-repeater]|[class:form-group]', 
      'Click ME!|click_me|button|[class:btn btn-default btn-md@click:testVm.handleClick@required:required]|[class:form-group]'];
      this.templateValues = {
        'month': [
          {
            'value': 1,
            'label': 'January'
          }, {
            'value': 2,
            'label': 'February'
          }
        ],
        'day': [
          {
            'value': 1,
            'label': 'One'
          }, {
            'value': 2,
            'label': 'Two'
          }
        ],
        'year': [
          {
            'value': 1996,
            'label': '1996'
          }, {
            'value': 1997,
            'label': '1997'
          }
        ],
        'choice': [
          {
            'value': 1,
            'label': 'Lorem'
          }, {
            'value': 2,
            'label': 'Ipsum'
          }, {
            'value': 3,
            'label': 'Dolor'
          }
        ],
        'hobbies': [
          {
            'value': 'lorem_ipsum',
            'label': 'Lorem Ipsum'
          }, {
            'value': 'dolor_sit',
            'label': 'Dolor sit'
          }, {
            'value': 'amet_consecteutor',
            'label': 'Amet Consecteutor'
          }
        ],
        'gender': [
          {
            'value': 'male',
            'label': 'Male'
          }, {
            'value': 'female',
            'label': 'Female'
          }
        ],
        'repeater': [
          {
            'label': 'Title',
            'model': 'title',
            'type': 'text',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          }, {
            'label': 'Number',
            'model': 'number',
            'type': 'number',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          }, {
            'label': 'Teexxt',
            'model': 'teexxt',
            'type': 'text',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          }, {
            'label': 'Text-ting!',
            'model': 'text_ting',
            'type': 'text',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          }
        ]
      };
    }

    TestController.prototype.processForm = function(event) {
      event.preventDefault();
      return console.log(this.templateModel);
    };

    TestController.prototype.handleClick = function() {
      alert('clicked');
      return true;
    };

    TestController.prototype.handleChange = function() {
      alert('changed');
      return true;
    };

    return TestController;

  })();
  angular.module('app').controller('testController', [TestController]);
  return true;
})(window, document, window.jQuery, window.angular);
