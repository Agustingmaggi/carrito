const path = require('path')
const express = require('express')
const session = require('express-session')
const app = express()

app.set('port', (process.env.PORT || 3030))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.listen(app.get('port'),() => {
    console.log('Server started on port http://localhost:'+app.get('port'))
})

app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUnitialized: true
}))

app.use(require('./middlewares/cart'))
app.use(require('./routes/main'))