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
  
  quizzesQueries.getQuiz()
  .then(quizzes => { 
    
    const templateVars = { 
      answer1: req.query.answer1,
      answer2: req.query.answer2,
      answer3: req.query.answer3
    }

  res.render("results", {templateVars, quizzes})

  })
}); 



module.exports = router;