const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Exercise {
    static async exercisePost(exer)
    {
        return {
            id: exer.id,
            user_id: exer.user_id,
            name: exer.name,
            category: exer.category,
            duration: exer.duration,
            intensity: exer.intensity,
            created_at: exer.created_at
        }
    }
    static async addExercise({ exercise, user })
    {
        //Method to add exercise to database
        const requiredFields = ["name", "category", "duration", "intensity"]
        requiredFields.forEach((property) => {
            if (!exercise.hasOwnProperty(property)) {
                throw new BadRequestError(`Missing ${property} in request body.`)
              }
        })

        const exerciseResult = await db.query(
            `INSERT INTO exercise (name, category, duration, intensity, user_id)
            VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5))
            RETURNING id, name, category, duration, intensity, user_id, created_at`, [exercise.name, exercise.category, exercise.duration, exercise.intensity, user.email]
        )
        const exercise2 = exerciseResult.rows[0]
        return Exercise.exercisePost(exercise2)
    }

    static async getExerciseByID({ exerID, user })
    {
        const query2 = `SELECT e.user_id, e.id, e.name, e.category,
                            e.duration, e.intensity, u.email AS "userEmail", u.id AS "userID", e.created_at
                        FROM exercise AS e
                        JOIN users AS u ON u.id = e.user_id
                        WHERE u.email = $1 AND e.id = $2`
        const result = await db.query(query2, [user.email, exerID])

        const exercise = result.rows[0]

        return exercise
    }

    static async getAllExercise({ user })
    {
        const query2 = `SELECT e.user_id, e.id, e.name, e.category,
                            e.duration, e.intensity, u.email AS "userEmail", u.id AS "userID", e.created_at
                        FROM exercise AS e
                        JOIN users AS u ON u.id = e.user_id
                        WHERE u.email = $1`
        const result = await db.query(query2, [user.email])

        const exercise = result.rows

        return exercise
    }
}

module.exports = Exercise