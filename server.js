const express = require('express')
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express()

require('./server/config/db')
require('./server/config/passport')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public')) 
app.use(express.urlencoded())
app.use(express.json())
app.use(session({
    name : 'kinopoisk.session',
    secret : 'keyboard cat',
    maxAge : 1000 * 60  * 60 * 7,
    resave : false,
    saveUninitialized: true,
    store: mongooseStore.create({
        mongoUrl : 'mongodb://localhost:27017'
    })
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine' , 'ejs')

app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/Country/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/Films/router'))
app.use(require('./server/User/router'))
app.use(require('./server/Rates/router'))

PORT = 8000
app.listen(PORT , (req, res)=>{
    console.log(`Server listening on port ${PORT}`);
})

