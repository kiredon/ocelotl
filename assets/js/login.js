(function() {
    var appLogin = angular.module('ocelotlLogin', []);

    appLogin.controller('LoginController', ['$scope', '$http', function($scope, $http){

        var loginVars = this;
        loginVars.usuario = {};
        loginVars.nuevoUsuario = {};
        loginVars.forgotPass = false;
        loginVars.registro = false;
        loginVars.mailWithoutPass = null;
        loginVars.mailSent = false;
        loginVars.samePass = true;
        loginVars.repeatPass = null;

        this.login = function(){
            console.log("Entra");
            $http.post('/login',loginVars.usuario).success(function(datos){
                console.log("Respuesta: " + datos.message);
                if(datos.code>0){
                    console.log("Logueado");
                    window.location="/index"
                }
                else{
                    console.log("Error");
                }
            }).error(function(error,status){
                console.log(error.error);
            });
        }

        this.recoverPass = function(){
            $http.post('/user/recoveryPassword?mail='+loginVars.mailWithoutPass).success(function(data){
                if(data.code === 1)
                    loginVars.mailSent = true;
            });
        }

        this.verificaPass = function(){
            if(loginVars.repeatPass === null || loginVars.repeatPass === undefined || loginVars.repeatPass.length < 1) return;
            if(loginVars.nuevoUsuario.password === null || loginVars.nuevoUsuario.password === undefined || loginVars.nuevoUsuario.password.length < 1) return;
            if(loginVars.nuevoUsuario.password != loginVars.repeatPass)
                loginVars.samePass = false;
            else
                loginVars.samePass = true;
        }

        this.createUser = function(){
            $http.post('/user/create', angular.toJson(loginVars.nuevoUsuario))
                .success(function(userRes){
                    console.log("Usuario creado: " + angular.toJson(userRes));
                }).error(function(err, status){
                    if(status===500)
                        if(err.raw.code === 11000)
                            console.log("Correo ya registrado");
                    else
                        console.log("Error desconocido");
                });
        }

    }]);
})();
