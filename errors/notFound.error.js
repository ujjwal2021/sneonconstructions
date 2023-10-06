const CustomAPIError = require("./api.error")
const { StatusCodes } = require("http-status-codes")

class NotFoundError extends CustomAPIError {
	constructor (message = "not_found", isOperational = true, stack = "") {
		super(StatusCodes.NOT_FOUND, message, isOperational, stack)
	}
}

module.exports = NotFoundError
