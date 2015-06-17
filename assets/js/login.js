(function() {
    var appLogin = angular.module('ocelotlLogin', []);
    
    appLogin.controller('LoginController', ['$scope', '$http', function($scope, $http){

        var loginVars = this;
        loginVars.usuario = {};
        loginVars.nuevoUsuario = {};
        loginVars.nuevoPassword = {};
        loginVars.forgotPass = false;
        loginVars.registro = false;
        loginVars.mailWithoutPass = null;
        loginVars.mailSent = false;
        loginVars.samePass = true;
        loginVars.samePassRecovery = true;
        loginVars.repeatPass = null;
        loginVars.repeatPassRecovery = null;
        loginVars.failLogin = false;

        //Creacion de usuario
        loginVars.cuentaCreada = false;

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
                    loginVars.failLogin = true;
                }
            }).error(function(error,status){
                console.log(error.error);
            });
        }

        this.recoverPass = function(){
            $http.post('/user/recoveryPassword?mail='+loginVars.mailWithoutPass).success(function(data){
                if(data.code === 1)
                    loginVars.mailSent = true;
                console.log(angular.toJson(data));
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

        this.verificaPassRecovery = function(){

            if(loginVars.repeatPassRecovery === null || loginVars.repeatPassRecovery === undefined || loginVars.repeatPassRecovery.length < 1) return;
            if(loginVars.nuevoPassword.password === null || loginVars.nuevoPassword.password === undefined || loginVars.nuevoPassword.password.length < 1) return;
            if(loginVars.nuevoPassword.password != loginVars.repeatPassRecovery)
                loginVars.samePassRecovery = false;
            else
                loginVars.samePassRecovery = true;
        }

        this.createUser = function(){
            $http.post('/user/create', angular.toJson(loginVars.nuevoUsuario))
                .success(function(userRes){
                    console.log("Usuario creado: " + angular.toJson(userRes));
                    loginVars.cuentaCreada = true;
                    $('#createUser')[0].reset();
                }).error(function(err, status){
                    if(status===500)
                        if(err.raw.code === 11000)
                            console.log("Correo ya registrado");
                    else
                        console.log("Error desconocido");
                });
        }

        this.changePass = function(){
            //loginVars.nuevoPassword.email = loginVars.mailWithoutPass;
            loginVars.nuevoPassword.email = "rafade9@gmail.com"
            console.log(angular.toJson(loginVars.nuevoPassword));
            $http.post('/user/changePasswordWithCode', angular.toJson(loginVars.nuevoPassword))
                .success(function(data){
                console.log("Vas bien");
                console.log(angular.toJson(data.msg));
            }).error(function(err, status){
               console.log("Ha ocurrido un error");
            });
        }
    }]);
})();
