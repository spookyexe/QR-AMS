const express = require('express')
const app = express()
const mainScript = require('./scripts/console')

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

const databaseDirectory = '../DATABASE/ATTENDANCE DATA'

const gradeData = {
  7: ['carbon', 'hydrogen', 'nitrogen', 'oxygen'],
  8: ['arthropoda', 'chordata', 'mollusca'],
  9: ['dalton', 'mendeleev', 'thomson'],
  10: ['graviton', 'neutron', 'photon'],
  11: ['earth', 'mercury', 'mars', 'saturn', 'venus'],
  12: ['aries', 'capricorn', 'gemini', 'pisces', 'scorpio'],
}

const attendanceData = {}

for (const grade in gradeData) {
  attendanceData[grade] = {};
  for (const subject of gradeData[grade]) {
    attendanceData[grade][subject] = require(`${databaseDirectory}/Grade ${grade}/${subject}.json`)
  }
}

app.get('/home', (req, res) => {
  res.render('home.ejs')
  app.use('/public', express.static('public'))
})

app.get('/register', (req, res) => {
  res.render('register.ejs')
  app.use('/public', express.static('public'))
})

app.get('/attendance', (req, res) => {
  res.render('attendance.ejs')
  app.use('/public', express.static('public'))
})

for (const grade in attendanceData) {
  app.get(`/attendance/grade${grade}`, (req, res) => {
    res.render(`./pages/grade${grade}.ejs`, { [`grade${grade}Attendance`]: attendanceData[grade] })
    app.use('/public', express.static('public'))
  })
}

const PORT = 3000
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT http://localhost:${PORT}/home`)
})

mainScript.print()
