const router = require("express").Router()

const { sendEmail } = require("../../controllers/contact.controllers")
const validate = require("../../middlewares/validate")
const {contactValidations} = require("../../validations")

router.route("/").post([validate(contactValidations.sendMessage)], sendEmail)

module.exports = router