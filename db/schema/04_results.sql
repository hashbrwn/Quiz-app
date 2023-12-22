DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  answer1 VARCHAR(255) NOT NULL,
  answer2 VARCHAR(255) NOT NULL,
  answer3 VARCHAR(255) NOT NULL
);