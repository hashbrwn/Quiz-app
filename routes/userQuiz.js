const express = require('express');
const router  = express.Router();
const quizzesQueries = require('../db/queries/quiz');

router.get("/", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  // getting user quizzes
  quizzesQueries.getQuizzesByUser(userId).then(quizzes => {
    res.render("userpage", {quizzes})
  }).catch(error => {
    return res.status(400).json({ error: 'error invalid request' })
  })
});

module.exports = router;
