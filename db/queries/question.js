const db = require('../connection');

//Helper function
const addQuizQuestion = (question_number, question, answer1, answer2, answer3, correct_answer, text_answer, quiz_id) => {
  const query = {
    text: 'INSERT INTO questions (question_number, question, answer1, answer2, answer3, correct_answer, text_answer, quiz_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [question_number, question, answer1, answer2, answer3, correct_answer, text_answer, quiz_id],
  }
  return db.query(query)
    .then(data => {
      return data.rows;
    });
}

const getQuestionsByQuizId = (quiz_id) => {
  return db.query(`SELECT * FROM questions WHERE questions.quiz_id='${quiz_id}';`)
    .then(data => {
      return data.rows;
    });
}

module.exports = { addQuizQuestion, getQuestionsByQuizId };
