(function() {
  (function(window, document, $, angular) {
    window.App = {};
    window.App.Helpers = {};
    angular.module('form-generator', []);
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);

(function() {
  (function(window, document, $, angular) {
    var FormGeneratorController;
    FormGeneratorController = (function() {
      function FormGeneratorController(formTemplateService) {
        this.formTemplateService = formTemplateService;
        this.template = this.formTemplateService.convertSource(this.src);
        this.load();
      }

      FormGeneratorController.prototype.load = function() {
        $(function() {
          return true;
        });
        return true;
      };

      return FormGeneratorController;

    })();
    angular.module('form-generator').controller('formGeneratorController', ['formTemplateService', FormGeneratorController]);
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);

(function() {
  (function(window, document, $, angular) {
    var TestController;
    TestController = (function() {
      function TestController() {
        this.template = [['First Name|first_name|text:value|[class:form-control class2]', 'School|school|text:value|[class:form-control@ng-click:testVm.method()]'], ['%Optional|[class:legend]', 'Middle Name|middle_name|text:value|[class:form-control]'], ['Last Name|last_name|text:value|[class:form-control]'], ['NickName|nickname_name|text:value|[class:form-control]']];
        this.templateModel = {};
      }

      TestController.prototype.processForm = function(event) {
        event.preventDefault();
        return console.log('asdsa');
      };

      return TestController;

    })();
    angular.module('form-generator').controller('testController', [TestController]);
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);

(function() {
  (function(window, document, $, angular) {
    var FormGenerator;
    FormGenerator = function($timeout) {
      this.restrict = 'E';
      this.templateUrl = 'coffee/templates/form-generator.html';
      this.controller = 'formGeneratorController';
      this.controllerAs = 'formGeneratorVm';
      this.bindToController = true;
      this.scope = {
        src: '=',
        templateModel: '=',
        submit: '='
      };
      this.link = function(scope, element, attrs) {
        return true;
      };
      this.fetchFromObject = function(obj, prop) {
        var _index;
        if (typeof obj === 'undefined') {
          return false;
        }
        _index = prop.indexOf('.');
        if (_index > -1) {
          return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
        }
        return obj[prop];
      };
      return this;
    };
    angular.module('form-generator').directive('formGenerator', ['$timeout', FormGenerator]);
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(window, document, $, angular) {
    var FormTemplateService;
    FormTemplateService = (function() {
      function FormTemplateService() {
        this.setAttributes = bind(this.setAttributes, this);
        this.extractFormControl = bind(this.extractFormControl, this);
        this.walkTabs = bind(this.walkTabs, this);
        this.template = [];
        this.tmpControl = {};
        this.singleTabTemplate = [];
      }

      FormTemplateService.prototype.convertSource = function(src) {
        if (src[0] instanceof Array) {
          this.extractTabbedForm(src);
          return this.template;
        }
        return this.template;
      };

      FormTemplateService.prototype.extractTabbedForm = function(src) {
        src.map(this.walkTabs);
        return true;
      };

      FormTemplateService.prototype.walkTabs = function(formControls) {
        formControls.map(this.extractFormControl);
        this.template.push(this.singleTabTemplate);
        this.singleTabTemplate = [];
        return true;
      };

      FormTemplateService.prototype.extractFormControl = function(singleControl) {
        var splitControl;
        splitControl = singleControl.split('|');
        this.checkControl(splitControl);
        this.singleTabTemplate.push(this.tmpControl);
        this.tmpControl = {};
        return true;
      };

      FormTemplateService.prototype.checkControl = function(control) {
        var attributes, splitAttributes, typeValue;
        if (control[0].indexOf('%') === 0) {
          this.tmpControl['type'] = 'plain_text';
          this.tmpControl['label'] = control[0].substring(1);
          return false;
        }
        this.tmpControl['label'] = control[0];
        this.tmpControl['model'] = control[1];
        if (control[2].indexOf(':') > -1) {
          typeValue = control[2].split(':');
          this.tmpControl['type'] = typeValue[0];
          this.tmpControl['value'] = typeValue[1];
        }
        if (control[3] !== 'undefined') {
          this.tmpControl['attributes'] = {};
          attributes = control[3].substring(1, control[3].length - 1);
          splitAttributes = attributes.split('@');
          splitAttributes.map(this.setAttributes);
        }
        return true;
      };

      FormTemplateService.prototype.setAttributes = function(value) {
        var attributeValue;
        attributeValue = value.split(':');
        return this.tmpControl['attributes'][attributeValue[0]] = attributeValue[1];
      };

      FormTemplateService.prototype.extractSingleForm = function(src) {
        return true;
      };

      return FormTemplateService;

    })();
    angular.module('form-generator').service('formTemplateService', [FormTemplateService]);
    return true;
  })(window, document, $, angular);

}).call(this);
