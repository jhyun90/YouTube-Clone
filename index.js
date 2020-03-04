const express = require('express')
const app = express()
const port = 5000

const config = require("./config/key")

const bodyParser = require('body-parser');
const { User } = require("./models/User");

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
        useNewUrlParse: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

/* application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));
/* application/json */
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
    // the registration data being entered on the client side will be inserted into the database called registration
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
