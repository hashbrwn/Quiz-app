const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');

router.get("/sign-up", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  //  getting id object
  userQueries.getUserById(userId).then(user => {
    if (user) {
      // TODO: switch urls to different redirect
      res.redirect('/urls');
    }
    const localsVars = {
      user,
    };

    //TODO: make sure signUp matches correct page name
    res.render("signUp", localsVars);
  }).catch(error => {
    return res.status(500).json({ error: 'error invalid data' });
  })
});

router.post('/sign-up', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  // return 400 if email or password are empty
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, Email or Password cannot be empty' });
  }

  userQueries.getUserByEmail(email).then(userWithEmail => {
    // check if the email is already in use
    if (userWithEmail.length) {
      //send back a response with 400 code for same email
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // create user
    userQueries.createUser(username, email, hashedPassword).then(user => {
      // set the user_id cookie
      req.session.user_id = user.id;

      // TODO: switch urls to different redirect
      //redirect to the /urls page
      res.redirect('/userPage');

      // log it
      console.log('New user registered:', user);
    }).catch(error => {
      return res.status(400).json({ error: 'error invalid data' });
    })
  }).catch(error => {
    return res.status(500).json({ error: 'error sign up failed' });
  })
})

module.exports = router;
