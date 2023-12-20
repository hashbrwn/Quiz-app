const express = require('express');
const router  = express.Router();
const quizzesQueries = require('../db/queries/quiz');

router.get("/", (req, res) => {
  // getting userId from the cookie
  const userId = req.session.user_id;
  // getting user quizzes
  quizzesQueries.getQuizzesByUser(userId).then(quizzes => {
   const templatevars = {quizzes: quizzes}
    res.render("userpage", templatevars)
  }).catch(error => {
    return res.status(400).json({ error: 'error invalid request' })
  })
});
router.get("/edit/:id", (req, res) =>  {
  const quizid= req.params.id
const templatevars = {}
res.render("editquiz", templatevars)

})

module.exports = router;
