const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quiz');
const questionsQueries = require('../db/queries/question');

router.get("/", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  // getting user quizzes
  quizzesQueries.getQuizzesByUser(userId).then(quizzes => {
    res.render("quizzes", { quizzes })
  }).catch(error => {
    return res.status(400).json({ error: 'error invalid request' })
  })
});
// TODO: update when create-quiz page is made
router.get("/create", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  // getting user quizzes
  res.render("create-quiz")
});

router.get("/:quizId/preview", (req, res) => {
  const userId = req.session.user_id;
  // getting quizID from parameter
  const quizId = req.params.quizId;
  // getting user quizzes
  quizzesQueries.getQuizById(quizId).then(quizData => {
    const quiz = quizData[0];
    // checking if quiz exists
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" })
    }
    // checking user owns quiz
    if (quiz.user_id !== userId) {
      return res.status(403).json({ error: 'Not Authorized' });
    }
    // getting question by quizId
    questionsQueries.getQuestionsByQuizId(quizId).then(questions => {
      return res.render("quizzes", { quiz, questions });
    }).catch(error => {
      return res.status(500).json({ error: 'An Error Occurred' });
    })
  }).catch(error => {
    return res.status(500).json({ error: 'An Error Occurred' });
  })

})

module.exports = router;
