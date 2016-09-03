var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const models = require('./models/User')
const UserCtrl = require('./controllers/UsersController')
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/views'))

// Middlewares
app.use(bodyParser.json()) //for request application/json  
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/', (req, res) => {
  res.render('index.html')
})

var users = express.Router()

users.route('/users')
  .get(UserCtrl.findAllUsers)
  .post(UserCtrl.addUser)

// users.route('/users/deactivateUser')
//   .put(UserCtrl.deactivateUser)

users.route('/users/:id')
  .get(UserCtrl.findById)
  .put(UserCtrl.updateUser)
  .delete(UserCtrl.deleteUser)

app.use('/api', users)

mongoose.connect('mongodb://localhost/apptest', (err, res) => {
  if (err) return console.error(`ERROR: connecting to Database. ${err}`)

  app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}/`)
  })

})