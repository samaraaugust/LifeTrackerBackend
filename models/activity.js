const db = require("../db")

class Activity {
    static async exerciseTotal({ user }) {
        const exerciseNum = await db.query(
            `SELECT SUM(e.duration) AS total
            FROM exercise AS e
            JOIN users AS u ON u.id = e.user_id
            WHERE u.email = $1`, [user.email]
        )
        const amount = exerciseNum.rows[0]
        return amount
    }
}

module.exports = Activity