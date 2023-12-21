const express = require('express');
const router  = express.Router();
const quizzesQueries = require('../db/queries/quiz');

router.get("/", (req, res) => {
  console.log(req)
  // getting userId from the cookie
 // const userId = req.session.user_id;
 const userId= 2
  // getting user quizzes
  quizzesQueries.getQuizzesByUser(userId).then(quizzes => {
    console.log(quizzes);
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
