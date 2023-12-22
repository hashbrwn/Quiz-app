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
  
  const params = 
  '?answer1='+answersGiven[0]
  +'&answer2='+answersGiven[1]
  +'&answer3='+answersGiven[2];

  res.redirect("/results" + params)

});


router.get(["/:id","/"], (req, res) => {
  const quizId = req.params.id
  quizzesQueries.getQuiz(quizId).then(quizzes => {
    res.render("quizpage", {quizzes})
  })

}); 



module.exports = router;