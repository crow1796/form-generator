<!DOCTYPE html>
<html lang="en" ng-app="form-generator">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<script src="bower_components/angular/angular.js" type="text/javascript"></script>
		<script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
		<script src="js/app.js" type="text/javascript"></script>
	</head>
	<body>
		<div class="form-generator-container" ng-controller="testController as testVm">
			<form-generator 
				src="testVm.template"
				template-model="testVm.templateModel"
				submit="testVm.processForm">
			</form-generator>
		</div>
	</body>
</html>