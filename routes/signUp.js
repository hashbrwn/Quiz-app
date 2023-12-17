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


// TODO: replace with user database helper function

// Helper function
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}



router.get("/sign-up", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  //getting user object
  const user = users[userId];

  const localsVars = {
    user,
  };

  if (user) {
    //TODO: switch urls to different redirect
    res.redirect('/urls');
  }
  //TODO: make sure signUp matches correct page name
  res.render("signUp", localsVars);
});

router.post('/sign-up', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(users)

  // return 400 if email or password are empty
  if (!email || !password) {
    return res.status(400).json({ error: 'Email or Password cannot be empty' });
  }
  const user = getUserByEmail(email, users)
  // check if the email is already in use
  if (user) {
    //send back a response with 400 code for same email
    return res.status(400).json({ error: 'Email is already in use' });
  }
  // generate a random user ID
  const userId = generateRandomString(10);

  //create a new user object
  const newUser = {
    id: userId,
    email: email,
    password: hashedPassword
  };

  // add the new user to the global users object
  users[userId] = newUser;

  // set the user_id cookie
  req.session.user_id = userId;

  // TODO: switch urls to different redirect
  //redirect to the /urls page
  res.redirect('/urls');

  // log it
  console.log(' New user registered:', newUser);
})

module.exports = router;
