const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

app.use(cookieParser());
app.use(session({
  secret: 'ABCDEFGHIKL', // replace with a strong, random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // set to true in a production environment with HTTPS
}));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust origin accordingly
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
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

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.username) {
    return next();
  } else {
    res.status(401).send('Unauthorized. Please log in.');
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
const imageFolder = '../server/images'; // Adjust the folder path as needed
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

app.post('/api/upload', isAuthenticated, upload.single('image'), (req, res) => {
  try {
    const { petName, ownerName, description, age, dogBreed, dateOfBirth } = req.body;
    const imageBuffer = req.file.buffer;
    const imageBase64 = imageBuffer.toString('base64'); // Convert buffer to base64

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

app.get('/api/pets', isAuthenticated, (req, res) => {
  const query = 'SELECT * FROM PetInformation';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Ensure that the 'Image' property is base64-encoded before sending it to the client
      const petsWithBase64Image = rows.map((pet) => ({
        ...pet,
        Image: pet.Image.toString('base64'),
      }));

      res.json(petsWithBase64Image);
    }
  });
});

app.post('/api/validatePassword', (req, res) => {
  const { username, password } = req.body;
  db.all('SELECT * FROM credentials WHERE username = ? AND password = ? COLLATE NOCASE', [username, password], (err, rows) => {
    if (err) {
      console.error('Error during SQL query:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
      return;
    }
    

    if (rows.length > 0) {
      // Set user information in the session
      req.session.user = { username: rows[0].username };
      res.json({ success: true, username: rows[0].username });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
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

// ... (your existing routes)

app.get('/api/dashboard', (req, res) => {
  if (req.session.user) {
    // User is authenticated
    res.json({ message: 'Welcome to the dashboard', user: req.session.user });
  } else {
    // User is not authenticated
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/logout', (req, res) => {
  // Clear the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
});



app.get('/profile', isAuthenticated, (req, res) => {
  res.send('This is your profile page.');
});

// Example of a protected route that requires authentication
app.get('/protected-route', isAuthenticated, (req, res) => {
  res.send('This route is protected. Only authenticated users can access it.');
});

// Example of a route that does not require authentication
app.get('/public-route', (req, res) => {
  res.send('This route is public. Anyone can access it.');
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3001, () => {
  console.log('Server is alive on port 3001');
});
