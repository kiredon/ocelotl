module.exports = function (type, mail, callback) {
    var mail;
    switch (type) {
    case 'bienvenida':
        mail = {
            to: mail,
            subject: 'Bienvenido a Ocelotl',
            html: 'Te damos la bienvenida al equipo de Ocelotl. Tu cuenta casi está lista, solo necesitas verificarla. Para eso, da clic <a href="taringa.net">aqu&iacute;</a>.'
        };
        break;
    case 'restablecerPass':
        mail = {
            to: mail,
            subject: 'Restablecer password',
            text: 'Tu c&oacute;digo de verificaci&oacute;n es el siguiente:'
        };
    default:
        mail = {
            to: mail,
            subject: 'Correo de prueba Ocelotl',
            text: 'Disculpa por los inconvenientes. Estamos probando nuestro servicio de email para brindarte un mejor servicio.'
        };
    }

    callback(null, mail);
}
