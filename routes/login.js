const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");

// TODO: replace with users database
const users = {};

// TODO: replace with user database helper function

// Helper function
function getUserByEmail(email, database) {
  //looping over users using for in loop
  for (let userId in database) {
    //getting user by ID
    const user = database[userId]
    //checking if users email matches
    if (user.email === email) {
      //returning users if matching
      return user
    }
  }
  // return null if no matching users
  return null
};



router.post('/login', (req, res) => {
  //get email and password from request body
  const { email, password } = req.body;
  const user = getUserByEmail(email, users)
  //checking if user exists
  if (!user) {
    //if not return error
    return res.status(403).json({ error: 'user does not exist' })
  };
  //checking if passwords match
  if (!bcrypt.compareSync(password, user.password)) {
    //if not return error
    return res.status(403).json({ error: 'incorrect password' })
  };
  // set cookie to user_id
  req.session.user_id = user.id;
  // TODO: switch urls to different redirect
  //redirecting to urls page
  res.redirect('/urls');
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
