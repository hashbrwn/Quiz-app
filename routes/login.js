const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');

router.get("/:id", async (req, res) => {
  try {
    // Saving the user id to the session
    const userId = req.params.id;
    req.session.user_id = userId;

    // Fetch user by id (assuming userQueries.findById returns a Promise)
    const user = await userQueries.getUserById(userId);

    if (!user) {
      // Handle case where user is not found
      return res.status(404).send("User not found");
    }

    // Save user to session
    req.session.user = user;

    // Logging the session
    console.log(req.session);

    // Redirecting to "/userPage"
    res.redirect("/userQuiz");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
