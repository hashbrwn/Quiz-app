const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE users.email='${email}';`)
    .then(data => {
      return data.rows;
    });
}


const createUser = (username, email, password) => {
  const query = {
    text: 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
    values: [username, email, password],
  }
  return db.query(query).then(data => {
    return data.rows;
  });
}

module.exports = { getUsers, getUserByEmail, createUser };
