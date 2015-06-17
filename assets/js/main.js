(function() {

	var app = angular.module('sipeApp', [ 'ui.router']);

	app.controller('SipeController',['$http', '$scope', '$state', function($http, $scope, $state) {


	} ]);

	app.directive('principal', function() {
		return {
			restrict : 'E',
			templateUrl : 'site/pages/blank.html'
		}
	});

	app.config(function($stateProvider, $urlRouterProvider) {
		//
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise("/");
		//
		// Now set up the states
		$stateProvider
		//DENUNCIA PLD
		.state('altaEmpleado', {url : "/altaEmpleado", templateUrl : "site/pages/altaEmpleado.html"})
        .state('blank', {url : "/blank", templateUrl : "site/pages/blank.html"})

	});

})();
