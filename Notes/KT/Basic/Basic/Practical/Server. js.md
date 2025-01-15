import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Mock database
const students = [
  { id: 1, name: 'Alice Johnson', grade: 'A' },
  { id: 2, name: 'Bob Smith', grade: 'B' },
  { id: 3, name: 'Charlie Brown', grade: 'C' },
  { id: 4, name: 'Diana Ross', grade: 'A' },
  { id: 5, name: 'Ethan Hunt', grade: 'B' }
];

// GET endpoint to retrieve all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// For testing purposes
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Students:', students);
}