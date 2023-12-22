const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');

router.post('/login', (req, res) => {
  //get email and password from request body
  const { email, password } = req.body;

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
    req.session.user_id = user[0].id;
    // TODO: switch urls to different redirect
    //redirecting to urls page
    res.redirect('/urls');

  }).catch(error => {
    return res.status(500).json({ error: 'An Error Occurred!'});
  });
});


router.get("/", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  console.log(req.session)
  console.log("userId", userId)
  //  getting id object


  // userQueries.getUserById(userId).then(user => {
  //   if (user) {
  //     // TODO: switch urls to different redirect
  //     res.redirect('/signUp');
  //   }
  //   const localsVars = {
  //     user,
  //   };

  //   //TODO: make sure signUp matches correct page name
 
  // })
   res.render("login")
  .catch(error => {
    console.log("Line 51:", error)
    return res.status(500).json({ error: 'error invalid data' });
  })
});

module.exports = router;
