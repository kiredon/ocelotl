/**
* Empleado.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name:{
            type:'string',
            required:true
        },
        apellidoP:{
            type:'string',
            required:true
        },
        apellidoM:{
            type:'string'
        },
        sexo:{
            type:'string',
            required:true,
            minLength:1,
            maxLength:1
        }


  }
};

