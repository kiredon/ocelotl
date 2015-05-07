var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'compita_89@hotmail.com',
        pass: 'castlevania12'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mail
// setup e-mail data with unicode symbols
module.exports = {

    sendInviteEmail: function(options) {
        var mailOptions = {
            from: 'compita_89@hotmail.com', // sender address
            to: options.to, // list of receivers
            subject: options.subject, // Subject line
            text: options.text, // plaintext body
            html: options.html // html body
        };
        // send mail with defined transport object

        console.log('Sending Email: ' + JSON.stringify(mailOptions));
        /* NO PUEDO MANDAR LOS CORREOS SO NOMAS LOGUEO HASTA QUE SE DEFINA*/
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
    }
};
