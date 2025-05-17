const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Rome", "Madrid"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    id: 3,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Wordsworth", "William Shakespeare", "Jane Austen", "Charles Dickens"],
    answer: "William Shakespeare"
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    id: 5,
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: "Au"
  },
  {
    id: 6,
    question: "Which language is used to style web pages?",
    options: ["HTML", "jQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    id: 7,
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8"
  },
  {
    id: 8,
    question: "What year did World War II end?",
    options: ["1942", "1945", "1939", "1950"],
    answer: "1945"
  },
  {
    id: 9,
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    id: 10,
    question: "What is the hardest natural substance on Earth?",
    options: ["Iron", "Gold", "Diamond", "Quartz"],
    answer: "Diamond"
  }
  
];


//to hide correct answers
app.get('/api/questions', (req, res) => {
  res.json(questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
  }))); 
});

app.get('/api/answers/:id', (req, res) => {
  const question = questions.find(q => q.id == req.params.id);
  if (question) {
    res.json({ answer: question.answer });
  } else {
    res.status(404).send("Question not found");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
