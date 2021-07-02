const express = require("express")
const actRouter = express.Router()
const Activity = require("../models/activity")
const security = require("../middleware/security")
const { requireAuthenicatedUser } = require("../middleware/security")

actRouter.get("/info", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { user } = res.locals
        const amount = await Activity.exerciseTotal({ user })
        res.status(200).json({ total: amount })
    } 
    catch(error)
    {
        next(error)
    }
})

module.exports = actRouter
