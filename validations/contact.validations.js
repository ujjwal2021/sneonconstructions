const joi = require("joi")
const {phone, email} = require("./custom.validations")

const sendMessage= {
	body: joi.object().keys({
		name: joi.string().required(),
		email: joi.custom(email).required(),
		phone: joi.custom(phone),
		message: joi.string().required()
	})
}

module.exports = {
	sendMessage
}