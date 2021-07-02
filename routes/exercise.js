const express = require("express")
const exRouter = new express.Router()
const Exercise = require("../models/exercise")
const security = require("../middleware/security")
const { requireAuthenicatedUser } = require("../middleware/security")

exRouter.post("/add", security.requireAuthenticatedUser, async function(req, res, next) {
    try {
        const { user } = res.locals
        const exercise = await Exercise.addExercise({ exercise: req.body, user: res.locals.user })
        return res.status(201).json({ exercise })
    }
    catch (error)
    {
        next(error)
    }
})

exRouter.get("/",  security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { user } = res.locals
        const exercise = await Exercise.getAllExercise({ user }) 
        res.status(200).json({ exercise })
    }
    catch (error)
    {
        next(error)
    }
})

exRouter.get("/:id", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const exerciseID = req.params.id
        const { user } = res.locals
        const exercise = await Exercise.getExerciseByID({ exerID: exerciseID, user })
        res.status(200).json({ exercise })
    }
    catch (error)
    {
        next(error)
    }
})

module.exports = exRouter