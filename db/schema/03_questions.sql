-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  question VARCHAR(255) NOT NULL,
  answer1 VARCHAR(255) NOT NULL,
  answer2 VARCHAR(255) NOT NULL,
  answer3 VARCHAR(255) NOT NULL,
  correct_answer VARCHAR(255) NOT NULL,
);
