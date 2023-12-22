const express = require('express');
const router = express.Router();
const quizzesQueries = require('../db/queries/quiz');
const questionQueries = require('../db/queries/question');

router.post("/", (req, res) => {
  console.log("==============Line7============", req.body)
  // getting userId from the cookie
  const userId = req.session.user_id;
  
const data = {
  quizname: req.body.quizname,
  question1: req.body.question1,
  question1_answer1: req.body.question1_answer1,
  question1_answer2: req.body.question1_answer2,
  question1_answer3: req.body.question1_answer3,
  question1_correct_answer: req.body.question1_correct_answer,
  question2: req.body.question2,
  question2_answer1: req.body.question2_answer1,
  question2_answer2: req.body.question2_answer2,
  question2_answer3: req.body.question2_answer3,
  question2_correct_answer: req.body.question2_correct_answer,
  question3: req.body.question3,
  question3_answer1: req.body.question3_answer1,
  question3_answer2: req.body.question3_answer2,
  question3_answer3: req.body.question3_answer3,
  question3_correct_answer: req.body.question3_correct_answer,
  private:req.body.private
}


  if (!data.question1.length || !data.question2.length || !data.question3.length || !data.quizname || !data.private) {
    return res.status(400).json({ error: 'Missing Required Quiz Info' });
  }
  const questionPromises = []

  // create quiz
  quizzesQueries.createQuiz(data.quizname, data.private, userId).then(quizzes => {

    const quiz = quizzes[0];
    // for (let i = 0; i < 3; i++) {
      // const question = questions[i];
      // create question
        questionPromises.push(questionQueries.addQuizQuestion(1, 
          data.question1, 
          data.question1_answer1, 
          data.question1_answer2, 
          data.question1_answer3, 
          data.question1_correct_answer, 
          data.question1_correct_answer, 
          quiz.id), questionQueries.addQuizQuestion(2, 
            data.question2, 
            data.question2_answer1, 
            data.question2_answer2, 
            data.question2_answer3, 
            data.question2_correct_answer, 
            data.question2_correct_answer, 
            quiz.id), questionQueries.addQuizQuestion(3, 
              data.question3, 
              data.question3_answer1, 
              data.question3_answer2, 
              data.question3_answer3, 
              data.question3_correct_answer, 
              data.question3_correct_answer, 
              quiz.id))

    Promise.all(questionPromises).then(results => {
      res.redirect('/');
    })

        // log it
        // console.log('New question registered:', question1);
      }).catch(error => {
        console.log("Line 53: ", error)
        return res.status(400).json({ error: 'error invalid data' });
      });
    
    // TODO: switch urls to different redirect
    //redirect to the /urls page

})


module.exports = router;

