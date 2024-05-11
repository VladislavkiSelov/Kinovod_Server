const nodemailer = require("nodemailer");
const { client, admin } = require("../config/default");

async function sendMail(email, resetToken) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: admin.email,
      pass: admin.password,
    },
  });

  let mailOptions = {
    from: admin.email,
    to: email,
    subject: "Сброс пароля",
    text: `Для сброса пароля перейдите по следующей ссылке: ${client.host}/reset_password/${resetToken}`,
    html: `<h1>Для сброса пароля перейдите по следующей ссылке: <a href="${client.host}/reset_password/${resetToken}">${client.host}/reset_password/${resetToken}</a></h1>`, // Если вы хотите отправить HTML-письмо
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Письмо успешно отправлено:", info.response);
  } catch (error) {
    console.log("Ошибка при отправке письма:", error);
  }
}

module.exports = {
  sendMail,
};
