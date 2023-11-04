const welcome = require("../helpers/mailUserCreatedHTML");
const transporter = require("./transporter")
const { EMAIL_USER } = process.env

const mailUserCreated = async (email) => {
  const welcomeHtml = welcome()
  await transporter.sendMail({
    from: `Lady Fit Lovers ${EMAIL_USER}`,
    to: email,
    subject: "Bienvenido a Ladifitlovers",
    html: welcomeHtml
  })
}

module.exports = mailUserCreated;