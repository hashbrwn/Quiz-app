const db = require('../connection');

//Helper function to create quiz
const createResults = (quizId, answer1, answer2, answer3) => {
  const query = {
    text: 'INSERT INTO results (quiz_id, answer1, answer2, answer3) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [quizId, answer1, answer2, answer3],
  }
  return db.query(query)
    .then(data => {
      return data.rows;
    });
}

//helper function to get quiz
const getResultsById = (quizId) => {
  return db.query(`SELECT * FROM quizzes WHERE quizzes.id='${id}';`)
    .then(data => {
      return data.rows;
    });
}

module.exports = {createResults, getResultsById};
