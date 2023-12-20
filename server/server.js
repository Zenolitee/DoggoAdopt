const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

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
  } else {
    console.log('Connected to the database...');
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to read an image file and return a Buffer
const readImageFile = (filePath) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer;
  } catch (error) {
    console.error('Error reading image file:', error);
    return null;
  }
};

// Function to insert image data into the database
const insertImageData = (petId, imageBuffer) => {
  const insertQuery = 'UPDATE PetInformation SET Image = ? WHERE PetID = ?';

  db.run(insertQuery, [imageBuffer, petId], (err) => {
    if (err) {
      console.error('Error during image insertion:', err);
    } else {
      console.log(`Image inserted for PetID ${petId}`);
    }
  });
};

// Get a list of files in the 'images' folder
const imageFolder = '../server/images';  // Adjust the folder path as needed
const imageFiles = fs.readdirSync(imageFolder);

// Loop through each image file and insert its data into the database
imageFiles.forEach((imageFile, index) => {
  const imagePath = `${imageFolder}/${imageFile}`;
  const imageBuffer = readImageFile(imagePath);

  console.log('imageBuffer:', imageBuffer);
  console.log('imagePath:', imagePath);

  if (imageBuffer) {
    const petId = index + 1; // Assuming the PetID is assigned sequentially
    insertImageData(petId, imageBuffer);
  } else {
    console.error(`Failed to read image file: ${imagePath}`);
  }
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    const { petName, ownerName, description, age, dogBreed, dateOfBirth } = req.body;
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64');  // Convert buffer to base64

    const insertQuery = `
      INSERT INTO PetInformation (PetName, OwnerName, Description, Age, DogBreed, DateOfBirth, Image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [petName, ownerName, description, age, dogBreed, dateOfBirth, imageBase64], (err) => {
      if (err) {
        console.error('Error during image insertion:', err);
        res.status(500).send({ upload: false, error: 'Internal Server Error' });
      } else {
        res.json({ upload: true, message: 'File uploaded and data inserted successfully' });
      }
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).send({ upload: false, error: 'Internal Server Error' });
  }
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
  const { username, password } = req.body;
  db.all('SELECT * FROM credentials WHERE username = ? AND password = ? COLLATE NOCASE', [username, password], (err, rows) => {
    if (err) {
      console.error('Error during SQL query:', err);
      res.status(500).send({ validation: false, error: 'Internal Server Error' });
      return;
    }

    if (rows.length > 0) {
      res.send({ validation: true });
    } else {
      res.send({ validation: false });
    }
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run('INSERT INTO credentials (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) {
      console.error('Error during registration:', err);
      res.status(500).send({ registration: false, message: 'Internal Server Error' });
    } else {
      res.send({ registration: true });
    }
  });
});



app.listen(3001, () => {
  console.log('Server is alive.');
});
