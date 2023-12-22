// const { Pool } = require('pg');
const db = require('../connection');

// helper function
const getQuizzesByUser = (id) => {
  return db.query(`SELECT * FROM quizzes WHERE user_id='${id}';`)
    .then(data => {
      return data.rows;
    });
}

//Helper function to create quiz
const createQuiz = (quizname, private, user_id) => {
  const query = {
    text: 'INSERT INTO quizzes (quizname, private, user_id) VALUES ($1, $2, $3) RETURNING *',
    values: [quizname, private, user_id],
  }
  return db.query(query)
    .then(data => {
      return data.rows;
    });
}
//helper function to get quiz
const getQuizById = (id) => {
  return db.query(`SELECT * FROM quizzes WHERE quizzes.id='${id}';`)
    .then(data => {
      return data.rows;
    });
}

const getAllQuizzzes = () => {
  return db.query(`SELECT * FROM quzzies`)
  .then(data => {
    return data.rows;
  });
}

// helper function for quizpage

function getRandomInt(max) {
  return Math.floor(Math.random() * max)+1;
};
const getRandomQuiz = (number) => {
  if (!number) {number = getRandomInt(9)}
  return db.query(`SELECT quizzes.quizname, question, answer1, answer2, answer3, correct_answer, text_answer
  FROM questions
  JOIN quizzes ON questions.quiz_id = quizzes.id
  WHERE questions.quiz_id = ${number};`)
  .then (data => {
    return data.rows;
  })
};

const getQuiz = (number) => {
  if (!number) {number = 7}
  return db.query(`SELECT quizzes.quizname, question, answer1, answer2, answer3, correct_answer, text_answer
  FROM questions
  JOIN quizzes ON questions.quiz_id = quizzes.id
  WHERE questions.quiz_id = ${number};`)
  .then (data => {
    return data.rows;
  })
};


module.exports = { getQuizzesByUser, getRandomQuiz, createQuiz, getQuiz, getQuizById, getAllQuizzzes };
