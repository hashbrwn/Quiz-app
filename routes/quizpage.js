/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizzesQueries = require('../db/queries/quiz');


router.get(["/:id","/"], (req, res) => {
  const quizId = req.params.id
  quizzesQueries.getRandomQuiz(quizId).then(quizzes => {
    res.render("quizpage", {quizzes})
  })  
}); 


router.post("/", (req, res) => {
  const selectedRadioOption = req.body.radioOption;
  if (!selectedRadioOption) {
    return res.status(400).json({ error: "Please select a radio option" });
  }
})


module.exports = router;