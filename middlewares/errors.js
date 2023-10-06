const mongoose = require("mongoose")
const CustomError = require("../errors")
const logger = require("../config/logger")
const config = require("../config")
const { StatusCodes, getReasonPhrase } = require("http-status-codes")

const errorConverter = (err, req, res, next) => {
	let error = err
	if (!(error instanceof CustomError.Api)) {
		let statusCode = error.statusCode || (error instanceof mongoose.Error ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
		let message = error.message || getReasonPhrase(statusCode)
		if (err.code && err.code === 11000) {
			statusCode = StatusCodes.BAD_REQUEST
			message = `Duplicate value entered for ${Object.keys(
				err.keyValue
			)} field, please choose another value`
		}
		if (err.name === "ValidationError") {
			CustomError.msg = Object.values(err.errors)
				.map((item) => item.message)
				.join(",")
			CustomError.statusCode = 400
		}
		error = new CustomError.Api(statusCode, message, true, err.stack)
	}
	next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err

	if (config.env === "production" && !err.isOperational) {
		statusCode = StatusCodes.INTERNAL_SERVER_ERROR
		message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
	}

	res.locals.errorMessage = err.message
	const response = {
		code: statusCode,
		success: false,
		message,
		...(config.env === "development" && { stack: err.stack })
	}

	if (config.env === "development") {
		logger.error(err)
	}

	res.status(statusCode).json(response)
}

module.exports = {
	errorHandler,
	errorConverter
}