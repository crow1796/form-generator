<!DOCTYPE html>
<html lang="en" ng-app="app">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
		<script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
		<script src="bower_components/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
		<script src="bower_components/angular/angular.js" type="text/javascript"></script>
		<script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
		<script src="js/app.js" type="text/javascript"></script>
		<script src="js/main.js" type="text/javascript"></script>
	</head>
	<body>
		<div class="form-generator-container" ng-controller="testController as testVm">
			<form-generator 
				src="testVm.template"
				template-model="testVm.templateModel"
				template-values="testVm.templateValues"
				submit="testVm.processForm">
			</form-generator>
			<pre>
				{{ testVm.templateModel | json }}
			</pre>
		</div>
	</body>
</html>