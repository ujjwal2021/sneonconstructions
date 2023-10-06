const CustomAPIError = require("./api.error")
const { StatusCodes } = require("http-status-codes")

class BadRequestError extends CustomAPIError {
	constructor (message = "bad_request", isOperational = true, stack = "") {
		super(StatusCodes.BAD_REQUEST, message, isOperational, stack)
	}
}

module.exports = BadRequestError
