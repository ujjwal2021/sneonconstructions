const contactServices = require("../services/contact.services")
const {StatusCodes} = require("http-status-codes")

const sendEmail = async (req, res) => {
	const {name, email, phone, message} = req.body
	
	await contactServices.sendEmail({name, email, phone, message})
	res.status(StatusCodes.OK).json({msg: "Email sent successfully"})
}

module.exports = {
	sendEmail
}