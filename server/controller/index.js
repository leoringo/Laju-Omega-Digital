const { comparePassword } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jsonwebtoken')
const { User, Article } = require('../models')

class Controller {
    // -------------------------- USER --------------------------
    static async register(req, res, next) {
        try {
            const { email, password } = req.body

            const newUser = await User.create({ email, password })

            newUser.password = "<PASSWORD>"

            res.status(201).json({ msg: "Register successful!" })

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: "NULL_EMAIL" }

            if (!password) throw { name: "NULL_PASSWORD" }

            const user = await User.findOne({ where: { email } })

            if (!user) throw { name: "INVALID_USER" }

            const isValid = comparePassword(password, user.password)

            if (!isValid) throw { name: "INVALID_PASSWORD" }

            const access_token = jwtSign({ id: user.id, email })

            res.status(200).json({ access_token, penulis: user.id })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller