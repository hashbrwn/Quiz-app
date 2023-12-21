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
  // let arrAnswers = []
  // arrAnswers.push(answersGiven[0])
  // arrAnswers.push(answersGiven[1])
  // arrAnswers.push(answersGiven[2])
  // console.log("QuizPage answers 23:", answersGiven)
  
  
//  let getQuiz = quizzesQueries.getRandomQuiz()
//  .then(quizzes => { 
 
//    quizzes[0].correct_answer
//    quizzes[1].correct_answer
//    quizzes[2].correct_answer

//   })
 


  // console.log("QuizPage answers 32:", getQuiz.quizzes)


  // .catch(error => {
  //   console.error('Error:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // });

//   const acceptArrays = (arr1, arr2) => {
 
//   const results = [];
//   for (let i=0; i < arr1.length; i++) {
//     results.push(arr1[i] === arr2[i]);
//   }
 
//   console.log(results)
//    return results;
// }

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