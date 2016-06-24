(function(window, document, $, angular) {
  angular.module('form-generator', []);
})(window, document, window.jQuery, window.angular);

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, document, angular) {
  var FormGeneratorController;
  FormGeneratorController = (function() {
    function FormGeneratorController(formTemplateService, formValidator, scope, filter) {
      var i, j, ref;
      this.formTemplateService = formTemplateService;
      this.formValidator = formValidator;
      this.scope = scope;
      this.filter = filter;
      this.undo = bind(this.undo, this);
      this.next = bind(this.next, this);
      this.watchControl = bind(this.watchControl, this);
      this.sendForm = bind(this.sendForm, this);
      this.converter = this.formTemplateService.convertSource(this.src, this.templateValues);
      this.template = this.converter.getTemplate();
      this.formType = this.converter.getFormType();
      this.registerEvents();
      this.template['currentTabIndex'] = 1;
      this.clickedTabs = [this.template['currentTabIndex']];
      if (this.template['editMode'] === true) {
        for (i = j = 0, ref = this.template.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          this.clickedTabs.push(i + 1);
        }
      }
      this.errors = [];
      if (_.has(this, 'load')) {
        this.load(this.template);
      }
    }

    FormGeneratorController.prototype.registerEvents = function() {
      if (this.src['displayErrors'] !== void 0) {
        this.template['displayErrors'] = this.src['displayErrors'];
      }
      if (this.src['editMode'] !== void 0) {
        this.template['editMode'] = this.src['editMode'];
      }
      if (this.src['load'] !== void 0) {
        this.load = this.src['load'];
      }
      if (this.src['beforePrevious'] !== void 0) {
        this.beforePrevious = this.src['beforePrevious'];
      }
      if (this.src['afterPrevious'] !== void 0) {
        this.afterPrevious = this.src['afterPrevious'];
      }
      if (this.src['beforeNext'] !== void 0) {
        this.beforeNext = this.src['beforeNext'];
      }
      if (this.src['afterNext'] !== void 0) {
        this.afterNext = this.src['afterNext'];
      }
      if (this.src['beforeUndo'] !== void 0) {
        this.beforeUndo = this.src['beforeUndo'];
      }
      if (this.src['afterUndo'] !== void 0) {
        this.afterUndo = this.src['afterUndo'];
      }
      if (this.src['afterPreviewRemoved'] !== void 0) {
        this.afterPreviewRemoved = this.src['afterPreviewRemoved'];
      }
      if (this.src['onValidationSuccess'] !== void 0) {
        this.onValidationSuccess = this.src['onValidationSuccess'];
      }
      if (this.src['onValidationFailed'] !== void 0) {
        this.onValidationFailed = this.src['onValidationFailed'];
      }
      if (this.src['onSubmit'] !== void 0) {
        this.onSubmit = this.src['onSubmit'];
      }
      if (this.src['onAfterSubmit'] !== void 0) {
        this.onAfterSubmit = this.src['onAfterSubmit'];
      }
    };

    FormGeneratorController.prototype.sendForm = function(event) {
      var controls;
      event.preventDefault();
      this.errors = [];
      controls = this.template[this.template.length - 1];
      this.errors = this.formValidator.validate(controls, this);
      if (!this.errors) {
        if (_.has(this, 'onValidationSuccess')) {
          this.onValidationSuccess();
        }
        if (_.has(this, 'onSubmit')) {
          this.onSubmit(event, this.template);
        }
        if (_.has(this, 'onAfterSubmit')) {
          this.onAfterSubmit();
        }
      } else {
        if (_.has(this, 'onValidationFailed')) {
          this.onValidationFailed(this.errors);
        }
        return false;
      }
    };

    FormGeneratorController.prototype.removePreview = function(event, model, index) {
      event.preventDefault();
      this.templateModel[model].splice(index, 1);
      if (_.has(this, 'afterPreviewRemoved')) {
        this.afterPreviewRemoved(model, index, this.template);
      }
    };

    FormGeneratorController.prototype.watchControl = function(control, model) {
      var hasLetter, maxDigits, maxVal, minVal, newValue, value;
      if (!_.has(this.templateModel, model) || _.get(this.templateModel, model) === null) {
        return;
      }
      model = model instanceof Array ? model.join('.') : model;
      if (control['type'] === 'number') {
        if (control['min_value'] !== void 0) {
          minVal = parseInt(control['min_value']);
          if (_.get(this.templateModel, model) < minVal) {
            _.set(this.templateModel, model, minVal);
          }
        }
        if (control['max_digits'] !== void 0) {
          maxDigits = parseInt(control['max_digits']);
          if (_.get(this.templateModel, model) && (_.get(this.templateModel, model)).toString().length > maxDigits) {
            value = ((_.get(this.templateModel, model)).toString()).substring(0, maxDigits);
            _.set(this.templateModel, model, parseInt(value));
          }
        }
        if (control['max_value'] !== void 0) {
          maxVal = parseInt(control['max_value']);
          if (_.get(this.templateModel, model) > maxVal) {
            _.set(this.templateModel, model, maxVal);
          }
        }
      }
      if (control['type'] === 'text') {
        if (control['sub_type'] !== void 0 && control['sub_type'] === 'currency') {
          value = (_.get(this.templateModel, model)).replace(/,|\./g, '');
          newValue = this.filter('currency')(value, '', 0);
          _.set(this.templateModel, model, newValue);
        }
      }
      if (control['type'] === 'text') {
        if (control['sub_type'] !== void 0 && control['sub_type'] === 'tel') {
          value = _.get(this.templateModel, model);
          hasLetter = /[^\d|\+|(|)|\s|\-|\.]/g.test(value);
          if (hasLetter === true) {
            _.set(this.templateModel, model, value.substring(0, value.length - 1));
          }
        }
      }
    };

    FormGeneratorController.prototype.handleOtherInput = function(model) {
      model = model + '_other';
    };

    FormGeneratorController.prototype.changeCurrentTabIndex = function(event, index, controls) {
      event.preventDefault();
      if (index >= this.template['currentTabIndex']) {
        this.errors = this.formValidator.validate(controls, this);
      } else {
        this.errors = null;
      }
      if (!this.errors) {
        if (_.has(this, 'onValidationSuccess')) {
          this.onValidationSuccess();
        }
        if (this.clickedTabs.indexOf(index + 1) > -1) {
          this.template['currentTabIndex'] = index + 1;
        }
        if (_.has(this, 'afterNext')) {
          this.afterNext();
        }
      } else {
        if (_.has(this, 'onValidationFailed')) {
          this.onValidationFailed(this.errors);
        }
      }
    };

    FormGeneratorController.prototype.next = function(controls) {
      if (_.has(this, 'beforeNext')) {
        this.beforeNext();
      }
      this.errors = [];
      if (this.template['currentTabIndex'] < this.template.length) {
        this.errors = this.formValidator.validate(controls, this);
        if (!this.errors) {
          if (_.has(this, 'onValidationSuccess')) {
            this.onValidationSuccess();
          }
          this.template['currentTabIndex'] = this.template['currentTabIndex'] + 1;
          if (this.clickedTabs.indexOf(this.template['currentTabIndex']) === -1) {
            this.clickedTabs.push(this.template['currentTabIndex']);
          }
          if (_.has(this, 'afterNext')) {
            this.afterNext();
          }
        } else {
          if (_.has(this, 'onValidationFailed')) {
            this.onValidationFailed(this.errors);
          }
        }
      }
    };

    FormGeneratorController.prototype.previous = function() {
      if (_.has(this, 'beforePrevious')) {
        this.beforePrevious();
      }
      if (this.template['currentTabIndex'] > 1) {
        this.template['currentTabIndex'] = this.template['currentTabIndex'] - 1;
        this.errors = [];
        if (_.has(this, 'afterPrevious')) {
          this.afterPrevious();
        }
      }
    };

    FormGeneratorController.prototype.undo = function(model, control) {
      if (model instanceof Array) {
        model = model.join('.');
      }
      if (_.has(this, 'beforeUndo')) {
        this.beforeUndo(model, control);
      }
      _.unset(this.templateModel, model);
      _.unset(control, 'errors');
      if (_.has(this, 'afterUndo')) {
        this.afterUndo(model, control);
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
      if (formControl['max'] !== void 0) {
        if (formControl['count'] < formControl['max']) {
          formControl['count'] = formControl['count'] + 1;
          return false;
        }
        return false;
      }
      formControl['count'] = formControl['count'] + 1;
    };

    FormGeneratorController.prototype.setOtherRadio = function(model, value) {
      var joined;
      joined = model.join('.');
      _.unset(this.templateModel, joined);
      model.push('index');
      joined = model.join('.');
      _.update(this.templateModel, joined, (function(_this) {
        return function(originalValue) {
          return value;
        };
      })(this));
    };

    FormGeneratorController.prototype.setWithRadio = function(model, value) {
      var joined;
      joined = model.join('.');
      if (_.has(this.templateModel, joined + '.with_value')) {
        if (_.get(this.templateModel, joined + '.index') === value) {
          return false;
        }
      }
      _.unset(this.templateModel, joined);
      model.push('index');
      joined = model.join('.');
      _.update(this.templateModel, joined, (function(_this) {
        return function(originalValue) {
          return value;
        };
      })(this));
    };

    FormGeneratorController.prototype.clearOtherInput = function(model, value) {
      var joined, trim;
      joined = model.join('.');
      trim = joined.substring(0, joined.indexOf('.index'));
      _.unset(this.templateModel, trim);
      _.update(this.templateModel, joined, (function(_this) {
        return function(originalValue) {
          return value;
        };
      })(this));
    };

    FormGeneratorController.prototype.clearCheckboxWithInputs = function(model) {
      var joined;
      joined = model.join('.');
      if (_.get(this.templateModel, model)['status'] === false) {
        _.unset(this.templateModel, model);
      }
    };

    return FormGeneratorController;

  })();
  angular.module('form-generator').controller('formGeneratorController', ['formTemplateService', 'formValidator', '$scope', '$filter', FormGeneratorController]);
})(window, document, window.angular);

(function(window, document, angular) {
  var FormGenerator;
  FormGenerator = (function() {
    function FormGenerator(timeout) {
      this.timeout = timeout;
      this.controller = 'formGeneratorController';
      this.controllerAs = 'formGeneratorVm';
      this.restrict = 'E';
      this.bindToController = true;
      this.scope = {
        src: '=',
        templateModel: '=',
        templateValues: '='
      };
      this.templateUrl = 'coffee/templates/form-generator.html';
    }

    FormGenerator.prototype.link = function(scope, element, attrs) {};

    FormGenerator.prototype.fetchFromObject = function(obj, prop) {
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

    return FormGenerator;

  })();
  angular.module('form-generator').directive('formGenerator', function($timeout) {
    return new FormGenerator($timeout);
  });
})(window, document, window.angular);

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, document, angular) {
  var InputAttributes;
  InputAttributes = (function() {
    function InputAttributes(parse, q, compile) {
      this.parse = parse;
      this.q = q;
      this.compile = compile;
      this.attributesManager = bind(this.attributesManager, this);
      this.readFile = bind(this.readFile, this);
      this.link = bind(this.link, this);
      this.slice = Array.prototype.slice;
      this.restrict = 'A';
      this.require = '?ngModel';
      this.scope = {
        customAttributes: '=?',
        validations: '=?'
      };
    }

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
          var el, files;
          el = e.target;
          if (!el.value) {
            return;
          }
          el.disabled = true;
          files = Array.prototype.slice.call(el.files, 0, 9);
          _this.q.all(_this.slice.call(files, 0).map(_this.readFile)).then(function(values) {
            if (el.multiple) {
              ngModel.$setViewValue(values);
            } else {
              ngModel.$setViewValue(values.length ? values[0] : null);
            }
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
        element.bind(attributeNames[i], scope.$parent.$parent.$parent.$parent.$parent.$parent[splitEvent[0]][splitEvent[1]]);
        delete controlAttributes[attributeNames[i]];
      }
      attributeNames = Object.keys(controlAttributes);
      for (i = k = 0, ref1 = attributeNames.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        element.attr(attributeNames[i], controlAttributes[attributeNames[i]]);
        this.compile(element);
      }
    };

    return InputAttributes;

  })();
  angular.module('form-generator').directive('inputAttributes', function($parse, $q, $compile) {
    return new InputAttributes($parse, $q);
  });
})(window, document, window.angular);

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, document, angular) {
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
      if (formControls.length === 0) {
        return;
      }
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
      var tmpNumber, tmpRepeater;
      this.resetTmpControl;
      if (control[0].indexOf('%') === 0) {
        this.tmpControl['type'] = 'legend';
        this.tmpControl['label'] = control[0].substring(1);
        if (control[2] !== void 0) {
          this.tmpControl['model'] = control[2];
        }
        this.checkAndSetAttributesFor(control[1], 'attributes');
        return false;
      }
      this.tmpControl['label'] = control[0];
      this.tmpControl['model'] = control[1];
      this.tmpControl['type'] = control[2];
      if (this.tmpControl['type'] === 'repeater') {
        this.tmpControl['count'] = 1;
      }
      if (this.tmpControl['type'].indexOf('repeater') > -1 && this.tmpControl['type'].indexOf(':') > -1) {
        tmpRepeater = this.tmpControl['type'].split(':');
        if (tmpRepeater[0] === 'repeater') {
          this.tmpControl['count'] = tmpRepeater[1] !== void 0 ? parseInt(tmpRepeater[1]) : 1;
          this.tmpControl['type'] = tmpRepeater[0];
          this.tmpControl['max'] = tmpRepeater[2] !== void 0 ? parseInt(tmpRepeater[2]) : void 0;
        }
      } else if (this.tmpControl['type'].indexOf('number') > -1 && this.tmpControl['type'].indexOf(':') > -1) {
        tmpNumber = this.tmpControl['type'].split(':');
        if (tmpNumber[0] === 'number') {
          this.tmpControl['type'] = tmpNumber[0];
          this.tmpControl['min_value'] = tmpNumber[1] !== void 0 ? parseInt(tmpNumber[1]) : void 0;
          this.tmpControl['max_digits'] = tmpNumber[2] !== void 0 ? parseInt(tmpNumber[2]) : void 0;
          this.tmpControl['max_value'] = tmpNumber[3] !== void 0 ? parseInt(tmpNumber[3]) : void 0;
        }
      } else if (this.tmpControl['type'].indexOf('text') > -1 && this.tmpControl['type'].indexOf(':') > -1) {
        tmpNumber = this.tmpControl['type'].split(':');
        if (tmpNumber[0] === 'text') {
          this.tmpControl['type'] = tmpNumber[0];
          this.tmpControl['sub_type'] = tmpNumber[1] !== void 0 ? tmpNumber[1] : void 0;
          this.tmpControl['currency_prefix'] = tmpNumber[2] !== void 0 ? tmpNumber[2] : void 0;
        }
      }
      this.checkAndSetAttributesFor(control[3], 'attributes');
      this.checkAndSetAttributesFor(control[4], 'container_attributes');
      this.checkAndSetAttributesFor(control[5], 'rules', control[1]);
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

    FormTemplateService.prototype.checkAndSetAttributesFor = function(control, property, model) {
      var attributes, childAttributes, childControl, childControlModel, childRules, childrenRules, i, j, k, ref, ref1, splitAttr, splitAttributes, x;
      if (control !== void 0) {
        this.tmpControl[property] = {};
        attributes = control.substring(1, control.length - 1);
        if (/children/g.test(attributes)) {
          childAttributes = /\[([\w\W]+)\]/g.exec(attributes);
          if (childAttributes === null || childAttributes === void 0) {
            return;
          }
          childrenRules = childAttributes[1];
          splitAttributes = childrenRules.split('@');
          for (i = j = 0, ref = splitAttributes.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            childControlModel = splitAttributes[i].split(':')[0];
            childRules = splitAttributes[i].replace(childControlModel + ":", '');
            childRules = [childRules];
            childControl = _.find(_.get(this.templateValues, "" + model), {
              'model': childControlModel
            });
            for (x = k = 0, ref1 = childRules.length; 0 <= ref1 ? k < ref1 : k > ref1; x = 0 <= ref1 ? ++k : --k) {
              splitAttr = childRules[x].split(':');
              _.set(childControl, property + "." + splitAttr[0], splitAttr[1]);
            }
          }
          attributes = attributes.replace(/@?children\[{1}.*\]{1}/g, '');
          splitAttributes = attributes.split('@');
          splitAttributes.map(this.setAttributes(property));
        }
        if (!/children/g.test(attributes)) {
          splitAttributes = attributes.split('@');
          splitAttributes.map(this.setAttributes(property));
        }
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
      var i, j, ref;
      if (this.formType === 'single') {
        return this.singleTabTemplate;
      }
      for (i = j = 0, ref = this.template; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (this.template[i].length === 0) {
          delete this.template[i];
        }
      }
      return this.template;
    };

    FormTemplateService.prototype.getFormType = function() {
      return this.formType;
    };

    return FormTemplateService;

  })();
  angular.module('form-generator').service('formTemplateService', [FormTemplateService]);
})(window, document, angular);

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, document, angular) {
  var Validator;
  Validator = (function() {
    function Validator() {
      this.checkControlRules = bind(this.checkControlRules, this);
      this.validateRepeaterControls = bind(this.validateRepeaterControls, this);
      this.validate = bind(this.validate, this);
    }

    Validator.prototype.validate = function(controls, controller) {
      var errors, subErrors;
      if (_.has(controller, 'beforeValidation')) {
        controller.beforeValidation();
      }
      errors = [];
      subErrors = [];
      controls.map((function(_this) {
        return function(control) {
          var controlIndex, i, j, k, l, ref, ref1, ref2, ruleNames;
          control['errors'] = [];
          if (control['rules'] === void 0) {
            if (control['type'] === 'repeater') {
              subErrors = _this.validateRepeaterControls(control, controller);
              for (i = j = 0, ref = subErrors.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                errors.push(subErrors[i]);
              }
            }
            return;
          }
          controlIndex = controller.template[controller.template['currentTabIndex'] - 1].findIndex(function(element, index) {
            return element['model'] === control['model'];
          });
          controller.template[controller.template['currentTabIndex'] - 1][controlIndex]['errors'] = [];
          ruleNames = Object.keys(control['rules']);
          for (i = k = 0, ref1 = ruleNames.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
            errors.push(_this.checkControlRules(ruleNames[i], control, controller.templateModel[control['model']], controller.template[controller.template['currentTabIndex'] - 1][controlIndex]['errors']));
          }
          if (control['type'] === 'repeater') {
            subErrors = _this.validateRepeaterControls(control, controller);
          }
          for (i = l = 0, ref2 = subErrors.length; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
            errors.push(subErrors[i]);
          }
        };
      })(this));
      errors = this.filterErrors(errors);
      if (errors.length !== 0) {
        return errors;
      } else {
        return false;
      }
    };

    Validator.prototype.validateRepeaterControls = function(parentControl, controller) {
      var controls, errors;
      errors = [];
      _.set(parentControl, "child_errors", []);
      controls = controller.templateValues[parentControl['model']];
      controls.map((function(_this) {
        return function(control, key) {
          var controlIndex, count, i, j, k, ref, ref1, ruleNames;
          if (control['rules'] === void 0) {
            return;
          }
          control['errors'] = [];
          controlIndex = controller.templateValues[parentControl['model']].findIndex(function(element, index) {
            return element['model'] === control['model'];
          });
          ruleNames = Object.keys(control['rules']);
          for (i = j = 0, ref = ruleNames.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            for (count = k = 0, ref1 = parentControl['count']; 0 <= ref1 ? k < ref1 : k > ref1; count = 0 <= ref1 ? ++k : --k) {
              if (_.get(parentControl, "child_errors." + control['model'] + "." + count) === void 0) {
                _.set(parentControl, "child_errors." + control['model'] + "." + count, []);
              }
              errors.push(_this.checkControlRules(ruleNames[i], control, _.get(controller.templateModel, "[" + parentControl['model'] + "][" + control['model'] + "][" + count + "]"), parentControl['child_errors'][control['model']][count]));
            }
          }
        };
      })(this));
      errors = this.filterErrors(errors);
      return errors;
    };

    Validator.prototype.checkControlRules = function(rule, control, model, controlErrors) {
      var dimension, emailValidator, height, i, imageError, j, label, ref, width;
      if (rule === 'required' && (control['rules']['required'] > 0 || control['rules']['required'] === 'true')) {
        if (model === void 0 || model === '' || model === null) {
          label = control['label'].replace(/[?]+/g, '');
          controlErrors.push(label + ' field is required.');
          return label + ' field is required.';
        }
      } else if (rule === 'min') {
        if (model === void 0) {
          return;
        }
        if (model.length < control['rules']['min']) {
          label = control['label'].replace(/[?]+/g, '');
          controlErrors.push(label + " must not be less than " + control['rules']['min'] + " characters.");
          return label + " must not be less than " + control['rules']['min'] + " characters.";
        }
      } else if (rule === 'max') {
        if (model === void 0) {
          return;
        }
        if (model.length > control['rules']['max']) {
          label = control['label'].replace(/[?]+/g, '');
          controlErrors.push(label + " must not be more than " + control['rules']['max'] + " characters.");
          return label + " must not be more than " + control['rules']['max'] + " characters.";
        }
      } else if (rule === 'email' && (control['rules']['email'] > 0 || control['rules']['email'] === 'true')) {
        if (model === void 0) {
          return;
        }
        emailValidator = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (!emailValidator.test(model)) {
          label = control['label'].replace(/[?]+/g, '');
          controlErrors.push(label + " must be a valid email address.");
          return label + " must be a valid email address.";
        }
      } else if (rule === 'dimension') {
        if (model === void 0) {
          return;
        }
        dimension = control['rules']['dimension'].split(',');
        width = dimension[0];
        height = dimension[1];
        label = control['label'].replace(/[?]+/g, '');
        if (model instanceof Array) {
          for (i = j = 0, ref = model.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            imageError = this.validateDimension(model[i], width, height, label);
            if (imageError !== void 0) {
              controlErrors.push(imageError);
              return imageError;
            }
          }
        } else {
          imageError = this.validateDimension(model, width, height, label);
          if (imageError !== void 0) {
            controlErrors.push(imageError);
            return imageError;
          }
        }
      }
      return '';
    };

    Validator.prototype.validateDimension = function(model, width, height, label) {
      var image;
      image = new Image();
      image.src = model;
      if (image.width > width || image.height > height) {
        return (label + " must be less than or equal to ") + width + "px width and less than or equal to " + height + "px height.";
      }
    };

    Validator.prototype.filterErrors = function(errors) {
      var i, j, ref;
      for (i = j = 0, ref = errors.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (errors.indexOf('') > -1) {
          errors.splice(errors.indexOf(''), 1);
        }
        if (errors.indexOf(void 0) > -1) {
          errors.splice(errors.indexOf(void 0), 1);
        }
      }
      errors = this.removeErrorDuplicates(errors);
      return errors;
    };

    Validator.prototype.removeErrorDuplicates = function(errors) {
      var uniqueErrors;
      uniqueErrors = errors.filter(function(item, pos) {
        return errors.indexOf(item) === pos;
      });
      return uniqueErrors;
    };

    return Validator;

  })();
  angular.module('form-generator').service('formValidator', [Validator]);
})(window, document, window.angular);
