const db = require('../connection');

//Helper function
const addQuizQuestion = (question_number, question, answer1, answer2, answer3, correct_answer, quiz_id) => {
  const query = {
    text: 'INSERT INTO questions (question_number, question, answer1, answer2, answer3, correct_answer, quiz_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [question_number, question, answer1, answer2, answer3, correct_answer, quiz_id],
  }
  return db.query(query)
    .then(data => {
      return data.rows;
    });
}

module.exports = { addQuizQuestion };
