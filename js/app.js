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
      function FormGeneratorController() {
        this.load;
      }

      FormGeneratorController.prototype.load = function() {
        $(function() {
          return true;
        });
        return true;
      };

      return FormGeneratorController;

    })();
    angular.module('form-generator').controller('formGeneratorController', [FormGeneratorController]);
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);

(function() {
  (function(window, document, $, angular) {
    var TestController;
    TestController = (function() {
      function TestController() {
        this.template = [['First Name|first_name|text:value|[@attribute:value]'], ['test|test|test'], ['test|test|test'], ['test|test|test'], ['test|test|test']];
        this.load;
      }

      TestController.prototype.load = function() {
        $(function() {
          return true;
        });
        return true;
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
    FormGenerator = function() {
      this.restrict = 'E';
      this.templateUrl = 'coffee/templates/form-generator.html';
      this.controller = 'formGeneratorController';
      this.generatorHelper = new window.App.Helpers.Generator();
      this.link = function(scope, element, attrs) {
        var source;
        source = this.generatorHelper.getSourceFrom(scope, attrs.src);
        return true;
      };
      return this;
    };
    angular.module('form-generator').directive('formGenerator', [FormGenerator]);
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);

(function() {
  (function(window, document, $, angular) {
    window.App.Helpers.Generator = (function() {
      function Generator() {}

      Generator.prototype.getSourceFrom = function(scope, source) {
        return this.convertSource(this.fetchFromObject(scope, source));
      };

      Generator.prototype.fetchFromObject = function(obj, prop) {
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

      Generator.prototype.convertSource = function(source) {
        return source;
      };

      return Generator;

    })();
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);
