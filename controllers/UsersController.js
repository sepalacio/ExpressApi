/* /controllers/UsersController.js */

const mongoose = require('mongoose')
const User = mongoose.model('User')

//Get Return all the users from BD
exports.findAllUsers = (req, res) => {
  console.log('GET / Users')
  User.find((err, users) => {
    if (err) res.send(500, err.message)
    res.status(200).json(users)
  })
}

//Return single user from BD by it's ID'
exports.findById = (req, res) => {
  const id = req.params.id
  console.log(`GET /users/${id}`)
  User.findById(id, (err, user) => {
    if (err) res.send(500, err.message)
    res.status(200).json(user)
  })
}

// Insert a new user in the BD
exports.addUser = (req, res) => {
  console.log('POST /users')
  console.log(req.body)

  var user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender
  })

  user.save((err, user) => {
    if (err) res.send(500, err.message)
    res.status(200).json(user)
  })
}


// PUT a user already exist
exports.updateUser = (req, res) => {
  var id = req.params.id
  console.log(`PUT /users/${id}`)

  User.findById(id, (err, user) => {

    if (!user) return res.status(404).send({
      message: 'The user does not exist'
    })

    user.name = req.body.name
    user.lastname = req.body.lastname
    user.username = req.body.username
    user.email = req.body.email
    user.gender = req.body.gender

    user.save((err) => {
      if (err) return res.status(500).send(err.message)
      return res.status(200).json(user)
    })
  })

  //DELETE - Delete a User with specified ID
  exports.deleteUser = (req, res) => {
    const id = req.params.id
    console.log(`DELETE /users/${id}`)

    User.findById(id, (err, user) => {

      if (!user) return res.status(404).send({
        message: 'User not exist'
      })

      user.remove((err) => {
        if (err) return res.status(500).send(err.message)
        res.status(200).json({
          message: 'User deleted'
        })
      })
    })
  }


  // Toggle user status in BD
  exports.deactivateUser = (req, res) => {
    const id = req.params.id
    console.log(`PUT /users/${id}`)

    User.findOneAndUpdate({
      _id: id
    }, {
      status: 2
    }, (err, user) => {
      if (err) return res.status(500).send(err.message)

      if (!user) return res.status(404).send({
        message: 'The user does not exist'
      })

      res.status(200).json({
        message: 'User desactivated sucessfully'
      })
    })

  }

}