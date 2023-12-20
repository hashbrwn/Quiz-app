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
  let arrAnswers = []
  arrAnswers.push(answersGiven[0])
  arrAnswers.push(answersGiven[1])
  arrAnswers.push(answersGiven[2])
  console.log(arrAnswers)


 quizzesQueries.getRandomQuiz().then(quizzes => { 
   let arrCorrect = []
   arrCorrect.push(quizzes[0].correct_answer)
   arrCorrect.push(quizzes[1].correct_answer)
   arrCorrect.push(quizzes[2].correct_answer)
   console.log(arrCorrect)
  })
  
  // res.redirect('/results');

});

router.get(["/:id","/"], (req, res) => {
  const quizId = req.params.id
  quizzesQueries.getRandomQuiz(quizId).then(quizzes => {
    res.render("quizpage", {quizzes})
  })

}); 



module.exports = router;