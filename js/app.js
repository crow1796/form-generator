(function(window, document, $, angular) {
  window.App = {};
  window.App.Helpers = {};
  angular.module('form-generator', []);
  return true;
})(window, document, window.jQuery, window.angular);

(function(window, document, $, angular) {
  var ControlAttributeController;
  ControlAttributeController = (function() {
    function ControlAttributeController() {
      this.load();
    }

    ControlAttributeController.prototype.load = function() {
      $(function() {
        return true;
      });
      return true;
    };

    return ControlAttributeController;

  })();
  angular.module('form-generator').controller('controlAttributeController', [ControlAttributeController]);
  return true;
})(window, document, $, angular);

(function(window, document, $, angular) {
  var FormGeneratorController;
  FormGeneratorController = (function() {
    function FormGeneratorController(formTemplateService) {
      this.formTemplateService = formTemplateService;
      this.converter = this.formTemplateService.convertSource(this.src, this.templateValues);
      this.template = this.converter.getTemplate();
      this.formType = this.converter.getFormType();
      this.currentTabIndex = 1;
      this.load();
    }

    FormGeneratorController.prototype.load = function() {
      $(function() {});
    };

    FormGeneratorController.prototype.handleOtherInput = function(model) {
      model = model + '_other';
      console.log(model);
    };

    FormGeneratorController.prototype.next = function() {
      if (this.currentTabIndex < this.template.length) {
        this.currentTabIndex = this.currentTabIndex + 1;
      }
    };

    FormGeneratorController.prototype.previous = function() {
      if (this.currentTabIndex > 1) {
        this.currentTabIndex = this.currentTabIndex - 1;
      }
    };

    FormGeneratorController.prototype.range = function(min, max, step) {
      var i, input, j, ref, ref1;
      step = step || 1;
      input = [];
      for (i = j = ref = min, ref1 = max; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
        input.push(i);
      }
      return input;
    };

    FormGeneratorController.prototype.repeaterRemoveItem = function(model, formControl) {
      var j, keyCounter, keys, ref;
      if (formControl['count'] > 1) {
        formControl['count'] = formControl['count'] - 1;
      }
      if (this.templateModel[model] === void 0) {
        return;
      }
      keys = Object.keys(this.templateModel[model]);
      for (keyCounter = j = 0, ref = keys.length; 0 <= ref ? j < ref : j > ref; keyCounter = 0 <= ref ? ++j : --j) {
        if (Object.keys(this.templateModel[model][keys[keyCounter]]).length >= formControl['count']) {
          delete this.templateModel[model][keys[keyCounter]][formControl['count']];
        }
      }
    };

    FormGeneratorController.prototype.repeaterAddItem = function(model, formControl) {
      formControl['count'] = formControl['count'] + 1;
    };

    return FormGeneratorController;

  })();
  angular.module('form-generator').controller('formGeneratorController', ['formTemplateService', FormGeneratorController]);
})(window, document, window.jQuery, window.angular);

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, document, $, angular) {
  var TestController;
  TestController = (function() {
    function TestController() {
      this.processForm = bind(this.processForm, this);
      this.templateModel = {};
      this.template = [['First Name|first_name|text|[class:form-control class2]|[class:form-group]', 'School|school|text|[class:form-control@click:testVm.handleClick@change:testVm.handleChange]|[class:form-group]', 'Profile Picture|profile_picture|file|[class:form-control]|[class:form-group]', 'Multiple files|multiple_files|files|[class:form-control]|[class:form-group]', 'Describe yourself|description|textarea|[class:form-control]|[class:form-group]', 'Age|age|number|[class:form-control]|[class:form-group]'], ['%Optional|[class:legend]', 'Middle Name|middle_name|text|[class:form-control]|[class:form-group]', 'Click Me!|click_me|button|[class:btn btn-md btn-primary@click:testVm.handleClick]|[class:form-group]'], ['Last Name|last_name|text|[class:form-control]|[class:form-group]', '%Birthday|[class:legend]', 'Month|month|select|[class:form-control]|[class:form-group]', 'Day|day|select|[class:form-control]|[class:form-group]', 'Year|year|select|[class:form-control]|[class:form-group]'], ['NickName|nickname_name|text|[class:form-control]|[class:form-group]', 'Choice|choice|radio&other|[class:form-radio]|[class:form-group]', 'Gender|gender|radio|[class:form-radio]|[class:form-group]', 'Hobbies|hobbies|checkbox|[class:form-checkbox]|[class:form-group]'], ['Repeater|repeater|repeater|[class:form-control]|[class:form-group]']];
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
            'label': 'Another Text',
            'model': 'another_text',
            'type': 'text',
            'attributes': {
              'class': 'form-control'
            },
            'container_attributes': {
              'class': 'form-group'
            }
          }, {
            'label': 'Multiline Text',
            'model': 'multi_line',
            'type': 'textarea',
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
  angular.module('form-generator').controller('testController', [TestController]);
  return true;
})(window, document, window.jQuery, window.angular);

(function(window, document, $, angular) {
  var ControlAttributeManager;
  ControlAttributeManager = function($parse) {
    this.restrict = 'A';
    this.controller = 'controlAttributeController';
    this.controllerAs = 'controlAttributeVm';
    this.bindToController = true;
    this.scope = {
      controlAttributeManager: '='
    };
    this.compile = function(element, attrs) {
      return {
        post: function(scope, element, attrs) {
          var attributeNames, controlAttributeManager, i, j, ref;
          console.log(attrs.controlAttributeManager);
          if (attrs.controlAttributeManager === void 0) {
            return;
          }
          controlAttributeManager = JSON.parse(attrs.controlAttributeManager);
          delete controlAttributeManager['class'];
          attributeNames = Object.keys(controlAttributeManager);
          for (i = j = 0, ref = attributeNames.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            element.bind(attributeNames[i], controlAttributeManager[attributeNames[i]]);
          }
        }
      };
    };
    return this;
  };
  angular.module('form-generator').directive('controlAttributeManager', ['$parse', ControlAttributeManager]);
})(window, document, window.jQuery, window.angular);

(function(window, document, $, angular) {
  var FormFileReader;
  FormFileReader = function($q) {
    var readFile, slice;
    slice = Array.prototype.slice;
    this.restrict = 'A';
    this.require = '?ngModel';
    this.compile = function(element, attrs) {
      return {
        pre: function(scope, element, attrs, ngModel) {
          if (!ngModel || attrs['type'] !== 'file') {
            return;
          }
          ngModel.$render = function() {};
          element.bind('change', function(e) {
            var el;
            el = e.target;
            if (!el.value) {
              return;
            }
            el.disabled = true;
            $q.all(slice.call(el.files, 0).map(readFile($q))).then(function(values) {
              if (el.multiple) {
                ngModel.$setViewValue(values);
              } else {
                ngModel.$setViewValue(values.length ? values[0] : null);
              }
              el.value = null;
              el.disabled = false;
            });
          });
        }
      };
    };
    readFile = function($q) {
      return function(file) {
        var deferred, reader;
        deferred = $q.defer();
        reader = new FileReader();
        reader.onload = function(e) {
          deferred.resolve(e.target.result);
        };
        reader.onerror = function(e) {
          deferred.reject(e);
        };
        reader.readAsDataURL(file);
        return deferred.promise;
      };
    };
    return this;
  };
  angular.module('form-generator').directive('formFilereader', ['$q', FormFileReader]);
})(window, document, window.jQuery, window.angular);

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
      templateValues: '=',
      submit: '='
    };
    this.link = function(scope, element, attr) {};
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
})(window, document, window.jQuery, window.angular);

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, document, $, angular) {
  var FormTemplateService;
  FormTemplateService = (function() {
    function FormTemplateService() {
      this.extractFormControl = bind(this.extractFormControl, this);
      this.walkTabs = bind(this.walkTabs, this);
      this.template = [];
      this.tmpControl = {};
      this.singleTabTemplate = [];
      this.formType = '';
    }

    FormTemplateService.prototype.convertSource = function(src, templateValues) {
      this.templateValues = templateValues;
      if (src[0] instanceof Array) {
        this.formType = 'tabbed';
        this.extractTabbedForm(src);
        return this;
      }
      this.formType = 'single';
      this.extractSingleForm(src);
      return this;
    };

    FormTemplateService.prototype.extractTabbedForm = function(src) {
      src.map(this.walkTabs);
    };

    FormTemplateService.prototype.walkTabs = function(formControls) {
      formControls.map(this.extractFormControl);
      this.template.push(this.singleTabTemplate);
      this.singleTabTemplate = [];
    };

    FormTemplateService.prototype.extractFormControl = function(singleControl) {
      var splitControl;
      splitControl = singleControl.split('|');
      this.checkControl(splitControl);
      this.singleTabTemplate.push(this.tmpControl);
      this.tmpControl = {};
    };

    FormTemplateService.prototype.checkControl = function(control) {
      this.resetTmpControl;
      if (control[0].indexOf('%') === 0) {
        this.tmpControl['type'] = 'legend';
        this.tmpControl['label'] = control[0].substring(1);
        this.checkAndSetAttributesFor(control[1], 'attributes');
        return false;
      }
      this.tmpControl['label'] = control[0];
      this.tmpControl['model'] = control[1];
      this.tmpControl['type'] = control[2];
      if (this.tmpControl['type'] === 'repeater') {
        this.tmpControl['count'] = 1;
      }
      this.checkAndSetAttributesFor(control[3], 'attributes');
      this.checkAndSetAttributesFor(control[4], 'container_attributes');
    };

    FormTemplateService.prototype.setAttributes = function(property) {
      return (function(_this) {
        return function(value) {
          var attributeValue;
          attributeValue = value.split(':');
          _this.tmpControl[property][attributeValue[0]] = attributeValue[1];
        };
      })(this);
    };

    FormTemplateService.prototype.extractSingleForm = function(src) {
      this.walkTabs(src);
      return this;
    };

    FormTemplateService.prototype.checkAndSetAttributesFor = function(control, property) {
      var attributes, splitAttributes;
      if (control !== void 0) {
        this.tmpControl[property] = {};
        attributes = control.substring(1, control.length - 1);
        splitAttributes = attributes.split('@');
        splitAttributes.map(this.setAttributes(property));
      }
    };

    FormTemplateService.prototype.resetTmpControl = function() {
      this.tmpControl['type'] = '';
      this.tmpControl['label'] = '';
      this.tmpControl['attributes'] = '';
      this.tmpControl['container_attributes'] = '';
      this.tmpControl['count'] = '';
    };

    FormTemplateService.prototype.getTemplate = function() {
      return this.template;
    };

    FormTemplateService.prototype.getFormType = function() {
      return this.formType;
    };

    return FormTemplateService;

  })();
  angular.module('form-generator').service('formTemplateService', [FormTemplateService]);
})(window, document, $, angular);
