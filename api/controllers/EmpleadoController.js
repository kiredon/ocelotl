/**
 * EmpleadoController
 *
 * @description :: Server-side logic for managing Empleadoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function(req,res,next){
        var params = req.params.all();
        console.info(params);
        Empleado.create(params, function(err,Empleado){
            if(err) return next(err);
            res.status(201);
            res.json(Empleado);
        });
    }

};

