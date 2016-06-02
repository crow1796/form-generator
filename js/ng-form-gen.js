(function(window, document, $, angular) {
  angular.module('form-generator', []);
})(window, document, window.jQuery, window.angular);

(function(window, document, $, angular) {
  var FormGenerator;
  FormGenerator = function($timeout) {
    this.restrict = 'E';
    this.templateUrl = 'http://webprojectupdates.com/asianbusinessbrokers/wp-content/themes/asianbusinessbrokers/js/templates/form-generator.html';
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
  var InputAttributes;
  InputAttributes = (function() {
    function InputAttributes(parse, q) {
      this.parse = parse;
      this.q = q;
      this.attributesManager = bind(this.attributesManager, this);
      this.readFile = bind(this.readFile, this);
      this.link = bind(this.link, this);
      this.slice = Array.prototype.slice;
    }

    InputAttributes.prototype.restrict = 'A';

    InputAttributes.prototype.require = '?ngModel';

    InputAttributes.prototype.scope = {
      customAttributes: '=?'
    };

    InputAttributes.prototype.link = function(scope, element, attrs, ngModel) {
      if (attrs['type'] !== 'file') {
        this.attributesManager(scope, element, attrs);
        return false;
      }
      if (!ngModel || attrs['type'] !== 'file') {
        return;
      }
      ngModel.$render = function() {};
      element.bind('change', (function(_this) {
        return function(e) {
          var el;
          el = e.target;
          if (!el.value) {
            return;
          }
          el.disabled = true;
          _this.q.all(_this.slice.call(el.files, 0).map(_this.readFile)).then(function(values) {
            if (el.multiple) {
              ngModel.$setViewValue(values);
            } else {
              ngModel.$setViewValue(values.length ? values[0] : null);
            }
            el.value = null;
            el.disabled = false;
          });
        };
      })(this));
    };

    InputAttributes.prototype.readFile = function(file) {
      var deferred, reader;
      deferred = this.q.defer();
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

    InputAttributes.prototype.attributesManager = function(scope, element, attrs) {
      var attributeNames, controlAttributes, i, j, k, ref, ref1, splitEvent, supportedEvents;
      if (scope.customAttributes === void 0) {
        return;
      }
      controlAttributes = scope.customAttributes instanceof Object ? JSON.parse(JSON.stringify(scope.customAttributes)) : null;
      if (controlAttributes === null) {
        return;
      }
      delete controlAttributes['class'];
      attributeNames = Object.keys(controlAttributes);
      supportedEvents = ['click', 'change'];
      for (i = j = 0, ref = attributeNames.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (supportedEvents.indexOf(attributeNames[i]) === -1) {
          continue;
        }
        splitEvent = controlAttributes[attributeNames[i]].split('.');
        element.bind(attributeNames[i], scope.$parent.$parent.$parent.$parent.$parent[splitEvent[0]][splitEvent[1]]);
        delete controlAttributes[attributeNames[i]];
      }
      attributeNames = Object.keys(controlAttributes);
      for (i = k = 0, ref1 = attributeNames.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        attrs[element[attributeNames[i]]] = controlAttributes[attributeNames[i]];
      }
    };

    return InputAttributes;

  })();
  angular.module('form-generator').directive('inputAttributes', function($parse, $q) {
    return new InputAttributes($parse, $q);
  });
})(window, document, window.jQuery, window.angular);

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
      if (this.templateModel[model] !== void 0) {
        if (formControl['count'] === 1) {
          this.templateModel[model] = {};
        }
      }
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

    FormGeneratorController.prototype.setOtherRadio = function(model) {
      if (this.templateModel[model] === void 0) {
        this.templateModel[model] = {};
      }
      this.templateModel[model]['index'] = model + "_other";
    };

    FormGeneratorController.prototype.clearOtherInput = function(model) {
      if (this.templateModel[model] === void 0) {
        this.templateModel[model] = {};
      }
      if (this.templateModel[model]['other_value'] !== void 0) {
        delete this.templateModel[model]['other_value'];
      }
    };

    return FormGeneratorController;

  })();
  angular.module('form-generator').controller('formGeneratorController', ['formTemplateService', FormGeneratorController]);
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
      if (this.formType === 'single') {
        return;
      }
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
      if (this.formType === 'single') {
        return this.singleTabTemplate;
      }
      return this.template;
    };

    FormTemplateService.prototype.getFormType = function() {
      return this.formType;
    };

    return FormTemplateService;

  })();
  angular.module('form-generator').service('formTemplateService', [FormTemplateService]);
})(window, document, $, angular);
