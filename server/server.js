const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')



app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));





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