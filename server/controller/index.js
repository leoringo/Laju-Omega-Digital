const { comparePassword } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jsonwebtoken')
const { User, Article } = require('../models')
const { Op } = require('sequelize')

class Controller {
    // -------------------------- USER --------------------------
    static async register(req, res, next) {
        try {
            const { email, password } = req.body

            const newUser = await User.create({ email, password })

            newUser.password = "<PASSWORD>"

            res.status(201).json({ message: "Register successful!" })

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

            res.status(200).json({ access_token, email })
        } catch (error) {
            next(error)
        }
    }

    // -------------------------- ARTICLES --------------------------
    static async getAllArticles(req, res, next) {
        try {
            const { name, category } = req.query;
            let whereCondition = {};
            if (name) {
                whereCondition.judul = { [Op.iLike]: `%${name}%` };
            }
            if (category) {
                whereCondition.kategori = { [Op.iLike]: `%${category}%` };
            }

            const articles = await Article.findAll({
                where: whereCondition,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{ model: User, attributes: ['email'] }],
            });

            res.status(200).json(articles);
        } catch (error) {
            next(error);
        }
    }

    static async getArticleById(req, res, next) {
        try {
            const { id } = req.params

            const article = await Article.findByPk(id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{ model: User, attributes: ['email'] }],
            })

            if (!article) throw ({ name: "NOT_FOUND" })

            await article.update({ totalViews: article.totalViews += 1 })

            res.status(200).json(article)

        } catch (error) {
            next(error)
        }
    }

    static async createArticle(req, res, next) {
        try {
            const { judul, kategori, konten } = req.body

            const penulis = req.user.id

            const newArticle = await Article.create({ judul, kategori, konten, penulis });

            res.status(201).json(newArticle)
        }
        catch (error) {
            next(error)
        }

    }

    static async editArticle(req, res, next) {
        try {
            const { id } = req.params

            const { judul, kategori, konten } = req.body

            const article = await Article.findByPk(id)

            if (!article) throw ({ name: 'NOT_FOUND' })

            const editedArticle = await article.update({ judul, kategori, konten })

            res.status(200).json(editedArticle)
        }
        catch (error) {
            next(error)
        }
    }

    static async deleteArticle(req, res, next) {
        try {
            const { id } = req.params

            const article = await Article.destroy({ where: { id } })

            if (article == 0) throw ({ name: "NOT_FOUND" })

            res.status(200).json({ message: `Article with id number ${id} deleted successfully!` })

        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = Controller