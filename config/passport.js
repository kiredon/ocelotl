var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOneByUsername(username,function(err, user) {
      if (err) { return done(null, err); }
      if (!user || user.length < 1) { return done(null, false, { message: 'Usuario Incorrecto'}); }
      if (!user.verify) {return done(null, false, {message: 'Cuenta sin validar'});}
      bcrypt.compare(password, user.password, function(err, res) {
        if (!res) return done(null, false, { message: 'Contraseña Incorrecta'});
        return done(null, user);
      });
    });
  })
);

module.exports = {
	express: {
		customMiddleware : function(app){
			console.log('express middleware for passport');
			app.use(passport.initialize());
			app.use(passport.session());
		}
	}
};
