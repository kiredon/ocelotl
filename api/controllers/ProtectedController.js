/**
 * ProtectedController
 *
 * @description :: Server-side logic for managing Protecteds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    
    index:function(req,res){
        console.log("HOLA INDEX");
        res.view('index');
    }
	
};

