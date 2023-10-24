const router = require('express').Router();
const Controller = require('../controller/index');
const authenticate = require('../middlewares/authenticate');
const authorization = require('../middlewares/authorization');

//--------------------------- USERS ---------------------------
router.post('/register', Controller.register)
    .post('/login', Controller.login)

//-------------------------- ARTICLES --------------------------
router.get('/', Controller.getAllArticles)
    .get('/detail/:id', Controller.getArticleById)
    .use(authenticate) // login to create new articles
    .post('/', Controller.createArticle)
    .put('/edit/:id', authorization, Controller.editArticle)
    .delete('/delete/:id', authorization, Controller.deleteArticle)

module.exports = router