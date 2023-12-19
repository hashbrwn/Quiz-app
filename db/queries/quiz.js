const db = require('../connection');


const getQuizzesByUser = (id) => {
  return db.query(`SELECT * FROM quizzes WHERE user_id='${id}';`)
    .then(data => {
      return data.rows;
    });
}



module.exports = { getQuizzesByUser };
