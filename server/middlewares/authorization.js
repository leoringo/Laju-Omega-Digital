const { Article } = require('../models');

async function authorization(req, res, next){
    try {

        const article = await Article.findByPk(req.params.id);

        if(!article) throw {name: "NOT_FOUND"};

        if(article.penulis !== req.user.id) throw ({name: "FORBIDDEN"});

        next();
    }
    catch(error) {
        next(error)        
    }
}

module.exports = authorization;