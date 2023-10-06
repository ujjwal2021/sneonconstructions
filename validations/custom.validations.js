const phone = (value, helpers) => {
	if(value.length !== 10){
		return helpers.message("phone_invalid_length")
	}
	if(!value.match(/^[0-9]{10}$/)){
		return helpers.message("phone_invalid_format")
	}
	return value
}

const email = (value, helpers) => {
	if(!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)){
		return helpers.message("invalid_email_format")
	}

	return value
}

module.exports = {
	phone,
	email
}