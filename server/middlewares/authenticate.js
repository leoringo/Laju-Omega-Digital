const { jwtVerify } = require('../helpers/jsonwebtoken')
const { User } = require('../models')

async function authenticate(req, res, next) {
    try {

        const access_token = req.headers.access_token

        if (!access_token) throw { name: 'UNAUTHENTICATED' }

        const payload = jwtVerify(access_token)

        const user = await User.findByPk(payload.id)

        if (!user) throw { name: 'UNAUTHENTICATED' }

        req.user = { id: user.id, email: user.email }

        next()

    }
    catch (error) {
        next(error)
    }
}

module.exports = authenticate