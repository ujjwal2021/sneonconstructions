const express = require("express")
const router = express.Router()

const contactRoutes = require("./contact.routes")

const routes = [
	/**
	 * @type {Object} => {path, route}
	 * @param {path} String 
	 * @param {route} express.Router()
	 */
	{
		path: "/contact",
		route: contactRoutes
	}
]

routes.map(route => {
	router.use(route.path, route.route)
})

module.exports = router