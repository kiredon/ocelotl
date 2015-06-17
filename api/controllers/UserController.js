/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require("passport");
var eden = require('node-eden');

module.exports = {
	process: function(req, res){
		passport.authenticate('local', function(err, user, info){
			if((err) || (!user))
				return res.json({code: -1, message: "Autenticación Fallida "+ user});
			
			req.login(user, function(err){
				if(err) res.json({code: -2, message: "Error al iniciar sesión"});

				return res.json({code: 1, message: "Autenticado"})
			});
		})(req, res);
	},

	logout: function(req, res){
		req.logout();
		res.json({code:1, message: "Se cerró sesión correctamente"})
	},

	autenticado: function (req,res){
    if(req.isAuthenticated())  
        res.json({code:1});
      else
          res.json({code:-1});
  	},

  	recoveryPassword : function(req, res){
  		var mail = req.allParams().mail;
  		User.findOneByEmail(mail, function(err, fuser){
  			if(!fuser) return res.json({code:-1, msg: "No se recibe correo"});
  			if(err){
  				console.log(err);
  				return res.json({code:-2, msg: err});
  			}
  			var word = eden.word() + new Date().getMilliseconds() + new Date().getMinutes();
  			fuser.recoveryCode = word;
            //delete fuser.password;
  			fuser.save();
  			var notificationMail = {
  				to: fuser.email,
  				subject: 'Restablecer contraseña',
  				text: 'Tu código de recuperación es: ' + word
  			};
  			//EmailService.sendInviteEmail(notificationMail);
  			console.log("PASSWORD: " + word);
  			return res.json({code:1, wordG: word, pass: fuser})
  		});
  	},

  	create : function(req, res){
  		var usr = req.allParams();
        usr.verify = false;
  		User.create(usr).exec(function(err, created){
  			if(err) return res.json(err);
  			res.json(created);
  		});
  	},

    changePasswordWithCode : function(req, res){
        var usr = req.allParams();
        User.findOneByEmail(usr.email, function(err, fuser){
            if(!fuser) return res.json({code:-1, msg: "No se recibe correo"});
            if(err) return res.json({code:-2, msg:err});
            if(fuser.recoveryCode == usr.recoveryCode){
                console.log("MISMO CODIGO DE VERIF");
                fuser.password = usr.password;
                fuser.recoveryCode = undefined;
                fuser.save();
            }
            else{
                console.log("CODIGO NO COINCIDE");
                return res.json({code:-1, msg:"Código incorrecto"});
            }
        });
    }
};

