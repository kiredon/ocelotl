(function(){
    var app = angular.module('sipeApp',[]);
    app.controller('EmpleadoController',['$scope', '$http', function($scope, $http){
        var employee = this;
        employee.nombre="";
        employee.apellidoP="";
        employee.sexo="M";
        this.altaEmpleado = function(){
            $http.post('/altaEmpleado', employee).success(function(data){
                alert(data);
            });
        }
    }]);
})();
