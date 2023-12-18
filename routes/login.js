const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');

// TODO: replace with users database
const users = {};

router.post('/login', (req, res) => {
  //get email and password from request body
  const { email, password } = req.body;
  console.log(email, password)

  userQueries.getUserByEmail(email).then(user => {
    // check if the email is not already in use
    if (!user.length) {
      //send back a response with 404 code for not found email
      return res.status(404).json({ error: 'Email not found' });
    }

    //checking if passwords match
    if (!bcrypt.compareSync(password, user[0].password)) {
      //if not return error
      return res.status(403).json({ error: 'incorrect password' })
    };
    // set cookie to user_id
    req.session.user_id = user.id;
    // TODO: switch urls to different redirect
    //redirecting to urls page
    res.redirect('/urls');

  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'An Error Occurred!'});
  });
});


router.get("/login", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  //getting user object
  const user = users[userId];

  const localsVars = {
    user,
  };
  if (user) {
    // TODO: switch urls to different redirect
    res.redirect('/urls');
  }
  res.render('login', localsVars)
});

module.exports = router;
