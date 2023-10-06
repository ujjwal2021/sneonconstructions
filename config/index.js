const dotenv = require("dotenv")
const path = require("path")
const Joi = require("joi")

dotenv.config({ path: path.join(__dirname, "../.env") })

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid("production", "development", "test").required(),
		PORT: Joi.number().default(3000),
		HOST: Joi.string().default("http://localhost:3000"),
		SMTP_HOST: Joi.string().description("server that will send the emails"),
		SMTP_PORT: Joi.number().description("port to connect to the email server"),
		SMTP_USERNAME: Joi.string().description("username for email server"),
		SMTP_PASSWORD: Joi.string().description("password for email server"),
		EMAIL_FROM_NAME: Joi.string().description("the from field in the emails sent by the app"),
		EMAIL_FROM_ADDRESS: Joi.string().description("the name field in the emails sent by the app"),
		FAST_2_SMS_API_KEY: Joi.string().description("api key for fast_2_sms api")
	})
	.unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env)

if (error) {
	throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	host: envVars.HOST,
	email: {
		smtp: {
			host: envVars.SMTP_HOST,
			port: envVars.SMTP_PORT,
			auth: {
				user: envVars.SMTP_USERNAME,
				pass: envVars.SMTP_PASSWORD
			}
		},
		from: {
			address: envVars.EMAIL_FROM_ADDRESS,
			name: envVars.EMAIL_FROM_NAME
		}
	},
	sms: {
		fast2sms: {
			apiKey: envVars.FAST_2_SMS_API_KEY
		}
	}
}