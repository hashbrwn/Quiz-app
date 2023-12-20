/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizzesQueries = require('../db/queries/quiz');

router.post("/", (req, res) => {
  const selectedRadioOption = req.body;
  let answersGiven = Object.values(selectedRadioOption);

  quizzesQueries.getRandomQuiz().then(quizzes => {
    
    console.log(answersGiven[0])
    console.log(quizzes[0].correct_answer)
    
    console.log(answersGiven[1])
    console.log(quizzes[1].correct_answer)

    console.log(answersGiven[2])
    console.log(quizzes[2].correct_answer)
    
  })

  res.send("Results page")

});

router.get(["/:id","/"], (req, res) => {
  const quizId = req.params.id
  quizzesQueries.getRandomQuiz(quizId).then(quizzes => {
    res.render("quizpage", {quizzes})
  })

}); 




module.exports = router;