const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')


app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"] })
})

app.listen(5000, () => {console.log("Server is alive.")})

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
  
  db.close()