/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizzesQueries = require('../db/queries/quiz');

const acceptArrays = (arr1, arr2) => {
  console.log(arr1)
  console.log(arr2)

  const results = [];
  for (let i=0; i < arr1.length; i++) {
    results.push(arr1[i] === arr2[i]);
  }
 
  console.log(results)
   return results;
}



router.post("/", (req, res) => {
  const selectedRadioOption = req.body;
  let answersGiven = Object.values(selectedRadioOption);
  let arrAnswers = []
  arrAnswers.push(answersGiven[0])
  arrAnswers.push(answersGiven[1])
  arrAnswers.push(answersGiven[2])
  
  let arrCorrect = []

 quizzesQueries.getRandomQuiz()
 .then(quizzes => { 
   arrCorrect.push(quizzes[0].correct_answer)
   arrCorrect.push(quizzes[1].correct_answer)
   arrCorrect.push(quizzes[2].correct_answer)
   acceptArrays(arrAnswers, arrCorrect);
  })

  .catch(error => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  res.redirect("/results")

});


router.get(["/:id","/"], (req, res) => {
  const quizId = req.params.id
  quizzesQueries.getRandomQuiz(quizId).then(quizzes => {
    res.render("quizpage", {quizzes})
  })

}); 



module.exports = router;
