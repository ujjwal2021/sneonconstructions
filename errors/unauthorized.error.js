const CustomAPIError = require("./api.error")
const { StatusCodes } = require("http-status-codes")

class UnauthorizedError extends CustomAPIError {
	constructor (message = "authorization_invalid", isOperational = true, stack = "") {
		super(StatusCodes.FORBIDDEN, message, isOperational, stack)
	}
}

module.exports = UnauthorizedError
