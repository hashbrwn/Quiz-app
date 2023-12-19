const db = require('../connection');

// helper function
const getQuizzesByUser = (id) => {
  return db.query(`SELECT * FROM quizzes WHERE user_id='${id}';`)
    .then(data => {
      return data.rows;
    });
}



module.exports = { getQuizzesByUser };
