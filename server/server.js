const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json({ limit: '10mb' }));

let db = new sqlite3.Database('dogadopt.db', (err) => {
  if (err) {
    console.error(err.message);
  } console.log('Connected to the database...');
});

// Set up multer storage for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  // Handle the uploaded file here
  const imageBuffer = req.file.buffer; // Buffer containing the image data

  // You can now save this buffer to the database or process it as needed

  res.json({ message: 'File uploaded successfully' });
});

app.get('/api/pets', (req, res) => {
  // Modify the query as needed to retrieve the necessary information
  const query = 'SELECT * FROM PetInformation';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/validatePassword', (req, res) => {
  // ... Your existing code for validating password
});

app.post('/register', (req, res) => {
  // ... Your existing code for registration
});

app.listen(3001, () => { console.log('Server is alive.'); });
