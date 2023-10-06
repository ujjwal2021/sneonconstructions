const JOI = require("joi")
const pick = require("../utils/object/pick")
const customError = require("../errors")

const validate = (schema) => (req, res, next) => {
	const validSchema = pick(schema, ["params", "query", "body"])
	const object = pick(req, Object.keys(validSchema))
	const { value, error } = JOI.compile(validSchema)
		.prefs({ errors: { label: "key" }, abortEarly: false })
		.validate(object)
	if (error) {
		const errorMessage = error.details.map(details => details.message).join(",")
		return next(new customError.BadRequest(errorMessage))
	}
	Object.assign(req, value)
	return next()
}

module.exports = validate