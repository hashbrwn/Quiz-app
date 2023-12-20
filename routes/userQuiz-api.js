const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quiz');
const questionsQueries = require('../db/queries/question');

router.post('/', (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  const { quizname, private, questions } = req.body;
  if (!questions.length || !quizname || !private) {
    return res.status(400).json({ error: 'Missing Required Quiz Info' });
  }
  const questionPromises = []
  // create quiz
  quizzesQueries.createQuiz(quizname, private, userId).then(quizzes => {
    const quiz = quizzes[0];
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      // create question
      questionPromises.push(questionsQueries.addQuizQuestion(i + 1, question.question, question.answer1, question.answer2, question.answer3, question.correct_answer, quiz.id).then(quiz => {
        // set the user_id cookie
        req.session.quiz_id = quiz.id;

        // log it
        console.log('New question registered:', question);
      }).catch(error => {
        return res.status(400).json({ error: 'error invalid data' });
      }));
    }
    // TODO: switch urls to different redirect
    //redirect to the /urls page
    Promise.all(questionPromises).then(results => {
      res.redirect('/userPage');
    })

  }).catch(error => {
    return res.status(400).json({ error: 'Error creating quiz: invalid' });
  });

})

module.exports = router;

