
const path = require('path')
const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 3030))
app.set('view engine', ejs)
app.set('views', path.join(__dirname, 'views'))
app.listen(app.get('port'),() => {
    console.log('Server started on port http://localhost:'+app.get('port'))
})

app.use(require('./routes/main'))