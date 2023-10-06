const {sendContactMail} = require("../utils/email/index")

const sendEmail = async ({name, email, phone, message}) => {
	await sendContactMail({name, email: email, phone, msg: message, useremail: email})
}

module.exports = {
	sendEmail
}