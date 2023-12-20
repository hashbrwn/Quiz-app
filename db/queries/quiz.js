const db = require('../connection');

// helper function
const getQuizzesByUser = (id) => {
  return db.query(`SELECT * FROM quizzes WHERE user_id='${id}';`)
    .then(data => {
      return data.rows;
    });
}

//Helper function
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

module.exports = { getQuizzesByUser, createQuiz };
