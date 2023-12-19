// const { Pool } = require('pg');
const db = require('../connection');

// helper function
const getQuizzesByUser = (id) => {
  return db.query(`SELECT * FROM quizzes WHERE user_id='${id}';`)
    .then(data => {
      return data.rows;
    });
}

// helper function for quizpage

function getRandomInt(max) {
  return Math.floor(Math.random() * max)+1;
}

const getRandomQuiz = () => {
  let random = getRandomInt(9);
  console.log(random)
  return db.query(`SELECT quizzes.quizname, question, answer1, answer2, answer3, correct_answer 
  FROM questions
  JOIN quizzes ON questions.quiz_id = quizzes.id
  WHERE questions.quiz_id = ${random};`)
  .then (data => {
    console.log(data.rows)
    return data.rows;
  })
};

module.exports = { getQuizzesByUser, getRandomQuiz };
