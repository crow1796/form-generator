(function() {
  (function(window, document, $, angular) {
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
    var FormGenerator;
    FormGenerator = function() {
      var generator;
      generator = {};
      generator.restrict = 'E';
      generator.templateUrl = 'coffee/templates/form-generator.html';
      generator.controller = 'formGeneratorController';
      return generator;
    };
    angular.module('form-generator').directive('formGenerator', [FormGenerator]);
    return true;
  })(window, document, window.jQuery, window.angular);

}).call(this);
