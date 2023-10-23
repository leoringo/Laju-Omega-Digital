module.exports = (err, req, res, next) => {
    console.log(err);

    let status = err.status || 500
    let message = err.message || 'Internal Server Error'

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = err.errors[0].message;
            break;

        case "NULL_EMAIL":
            status = 401;
            message = 'Email tidak boleh kosong!'
            break;

        case "NULL_PASSWORD":
            status = 401;
            message = 'Password tidak boleh kosong!'
            break;

        case "INVALID_USER":
            status = 401;
            message = 'Password / Email Salah'
            break;

        case "INVALID_PASSWORD":
            status = 401;
            message = 'Password Salah'
            break;

        case "NOT_FOUND":
            status = 404;
            message = 'Article Not Found'
            break;

        case "UNAUTHENTICATED":
            status = 401;
            message = 'Authentication Required'
            break;

        case "FORBIDDEN":
            status = 403;
            message = 'You Are Not Authorized!';
            break;
    }

    res.status(status).json({ message })
}