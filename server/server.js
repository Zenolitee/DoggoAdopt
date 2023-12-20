const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const multer = require('multer');
const fs = require('fs');



app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const readImageFile = (filePath) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer;
  } catch (error) {
    console.error('Error reading image file:', error);
    return null;
  }
};



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json({limit: '10mb'}))

let db = new sqlite3.Database('dogadopt.db', (err) => {
    if(err){
        console.error(err.message)
    }console.log('Connected to the database...')
})

const imagePath = '../server/images/labrador_puppy.jpg';  // Update with your actual image path
const imageBuffer = readImageFile(imagePath);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

if (imageBuffer) {
  // Now you can use `imageBuffer` to insert the image into SQLite
  // Insert logic goes here...
} else {
  console.error('Image buffer is null, failed to read the image file.');
}

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
      const { petName, ownerName, description, age, dogBreed, dateOfBirth } = req.body;
      const imageBuffer = req.file.buffer.toString('base64');

      const insertQuery = `
  INSERT INTO PetInformation (PetName, OwnerName, Description, Age, DogBreed, DateOfBirth, Image)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

db.run(insertQuery, [petName, ownerName, description, age, dogBreed, dateOfBirth, imageBuffer], (err) => {
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
  







app.listen(3001, () => {console.log("Server is alive.")})



/*
app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
})



db.serialize(() => {
    db.run('CREATE TABLE lorem (info TEXT)')
    const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
  
    for (let i = 0; i < 10; i++) {
      stmt.run(`Ipsum ${i}`)
    }
  
    stmt.finalize()
  
    db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
      console.log(`${row.id}: ${row.info}`)
    })
  })
  
  db.close()*/