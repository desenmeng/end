/**
 * Author: mdemo
 * Date: 13-4-21
 * Time: 下午6:37
 * Desc:
 */
var email = require("emailjs/email");
var server = email.server.connect({
    host: global.email_config.host,
    user: global.email_config.user,
    password: global.email_config.password,
    ssl: true
});
exports.passwordReset = function (account, callback) {
    server.send({
        from: global.email_config.from,
        to: account.email,
        text: 'Password Reset',
        subject: 'Password Reset',
        attachment: composeResetEmail(account)
    }, callback);
};
function composeResetEmail(o) {
    var link = global.email_config.resetURL + '?e=' + o.email + '&t=' + o.resetToken;
    var html = "<html><body>";
    html += "Hi " + o.name + ",<br><br>";
    html += "Your username is :: <b>" + o.user + "</b><br><br>";
    html += "<a href='" + link + "'>Please click here to reset your password</a><br><br>";
    html += "</body></html>";
    return  [
        {data: html, alternative: true}
    ];
}

