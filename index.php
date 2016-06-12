<!DOCTYPE html>
<html lang="en" ng-app="app">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
		<script src="bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
		<script src="bower_components/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
		<script src="bower_components/angular/angular.js" type="text/javascript"></script>
		<script src="js/loadash.js" type="text/javascript"></script>
		<script src="js/app.js" type="text/javascript"></script>
		<script src="js/main.js" type="text/javascript"></script>
		<style type="text/css">
			.error-container{
				position: fixed;
				display: none;
			    padding: 15px;
			    background: red;
			    left: 50%;
			    bottom: 20px;
			    color: white;
			    transform: translate(-50%, 0);
			    box-shadow: 0px 0px 10px #222;
			}
		</style>
	</head>
	<body>
		<div class="form-generator-container" ng-controller="testController as testVm">
			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<form-generator 
						src="testVm.template"
						template-model="testVm.templateModel"
						template-values="testVm.templateValues">
					</form-generator>
					<div class="error-container">
						Errors
					</div>
				</div>
			</div>
			<pre>
				{{ testVm.templateModel | json }}
			</pre>
		</div>
	</body>
</html>