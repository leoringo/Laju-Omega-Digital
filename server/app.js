require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(require('./routes/index'))
    .use(require('./middlewares/errorHandler'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
