module.exports = {
	Api: require("./api.error"),
	Unauthenticated: require("./unauthenticated.error"),
	Unauthorized: require("./unauthorized.error"),
	BadRequest: require("./badRequest.error"),
	NotFound: require("./notFound.error"),
	InternalServer: require("./internalServer.error")
}
