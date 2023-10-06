const nodemailer = require("nodemailer")
const config = require("../../config")

const transporter = nodemailer.createTransport(config.email.smtp)

const sendEmail = async (to, subject, text, html = "") => {
	const message = {
		from: config.email.from,
		to : process.env.TO_EMAIL,
		subject,
		text,
		html
	}
	await transporter.sendMail(message)
}

const sendContactMail = async ({ name, email, phone, msg, useremail }) => {
	const message = `<p>Name: <b style="color:blue"> ${name}</b></p><p>Email: <b style="color:blue"> ${email}</b></p><p>Phone: <b style="color:blue"> ${phone}</b></p><p>Message: <b style="color:blue"> ${msg}</b></p>`
	await sendEmail(useremail, `Message from ${name}`, "", message)
}

module.exports = {
	sendEmail,
	sendContactMail
}