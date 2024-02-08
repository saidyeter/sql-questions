const { faker } = require('@faker-js/faker');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(
  "data.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Error connecting to SQLite database:", err)
    } else {
      console.log("Connected to SQLite database")
    }
  }
)
const opt = { length: 8 }

const g = faker.string.alpha
function c() { return 'crs_' + g(opt) }

const students = []
for (let i = 0; i < 500; i++) {
  students.push(['std_' + g(opt), Math.floor(i / 100), faker.person.fullName()])
}

const lessons = [
  [c(), 1, 'writing', 10, 1],
  [c(), 1, 'reading-1', 12, 1],
  [c(), 1, "math-1", 4, 1],
  [c(), 1, "social-1", 2, 0],
  [c(), 1, "painting-1", 2, 0],

  [c(), 2, 'reading-2', 6, 1],
  [c(), 2, "math-2", 6, 1],
  [c(), 2, "social-2", 4, 1],
  [c(), 2, "painting-2", 2, 0],
  [c(), 2, "grammar-1", 4, 1],
  [c(), 2, "music-1", 2, 0],
  [c(), 2, "geography-1", 2, 1],
  [c(), 2, 'computer-1', 4, 0],

  [c(), 3, "math-3", 6, 1],
  [c(), 3, "social-3", 4, 1],
  [c(), 3, "grammar-2", 4, 1],
  [c(), 3, "music-2", 2, 0],
  [c(), 3, "geography-2", 2, 1],
  [c(), 3, 'computer-2', 4, 0],
  [c(), 3, "spanish-1", 2, 0],
  [c(), 3, "history-1", 2, 1],
  [c(), 3, "volleyball", 4, 0],

  [c(), 4, "math-4", 6, 1],
  [c(), 4, "social-4", 4, 1],
  [c(), 4, "grammar-3", 4, 1],
  [c(), 4, "music-3", 2, 0],
  [c(), 4, "geography-3", 2, 1],
  [c(), 4, 'computer-3', 4, 0],
  [c(), 4, "spanish-2", 2, 0],
  [c(), 4, "history-2", 2, 1],
  [c(), 4, "basketball", 4, 0],

  [c(), 5, "math-5", 6, 1],
  [c(), 5, "social-5", 4, 1],
  [c(), 5, "grammar-4", 4, 1],
  [c(), 5, "music-4", 2, 0],
  [c(), 5, "geography-4", 2, 1],
  [c(), 5, 'computer-4', 4, 0],
  [c(), 5, "spanish-3", 2, 0],
  [c(), 5, "history-3", 2, 1],
  [c(), 5, "badminton", 4, 0],
]

db.serialize(() => {

  db.run('CREATE TABLE IF NOT EXISTS student(id TEXT, name TEXT, grade NUMBER)');
  db.run('CREATE TABLE IF NOT EXISTS lesson(id TEXT, name TEXT, credit_point NUMBER, grade NUMBER, required NUMBER)');
  db.run('CREATE TABLE IF NOT EXISTS enrollment(id TEXT, student_id TEXT, lesson_id TEXT, score NUMBER)');
  students.forEach(s => {
    db.run('INSERT INTO student(id, grade, name) VALUES(?,?,?)', s)
  })
  lessons.forEach(c => {
    db.run('INSERT INTO lesson(id, grade, name, credit_point, required) VALUES(?,?,?,?,?)', c)
  })

  students.forEach(s => {
    lessons.forEach(c => {
      if (c[1] === s[1]) {
        db.run('INSERT INTO enrollment(id, student_id, lesson_id, score) VALUES(?,?,?,?)', ['enr_' + g(opt), s[0], c[0], faker.number.int({ min: 1, max: 100 })])
      }
    })
  })

})
