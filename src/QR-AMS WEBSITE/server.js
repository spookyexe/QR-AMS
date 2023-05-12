const express = require('express')
const app = express()

const mainScript = require('./scripts/console')

app.set('view-engine', 'ejs')
app.use(express.urlencoded ({extended: false}))

const databaseDirectory = '../DATABASE/ATTENDANCE DATA'

const carbonData = require(databaseDirectory + '/Grade 7/carbon.json')
const hydrogenData = require(databaseDirectory + '/Grade 7/hydrogen.json')
const nitrogenData = require(databaseDirectory + '/Grade 7/nitrogen.json')
const oxygenData = require(databaseDirectory + '/Grade 7/oxygen.json')
const g7Data = { carbon: carbonData, hydrogen: hydrogenData, nitrogen: nitrogenData, oxygen: oxygenData}

const arthropodaData = require(databaseDirectory + '/Grade 8/arthropoda.json')
const chordataData = require(databaseDirectory + '/Grade 8/chordata.json')
const molluscaData = require(databaseDirectory + '/Grade 8/mollusca.json')
const g8Data = { arthropoda: arthropodaData, chordata: chordataData, mollusca: molluscaData}

const daltonData = require(databaseDirectory + '/Grade 9/dalton.json')
const mendeleevData = require(databaseDirectory + '/Grade 9/mendeleev.json')
const thomsonData = require(databaseDirectory + '/Grade 9/thomson.json')
const g9Data = { dalton: daltonData, mendeleev: mendeleevData, thomson: thomsonData }

const gravitonData = require(databaseDirectory + '/Grade 10/graviton.json')
const neutronData = require(databaseDirectory + '/Grade 10/neutron.json')
const photonData = require(databaseDirectory + '/Grade 10/photon.json')
const g10Data = { graviton: gravitonData, neutron: neutronData, photon: photonData}

const earthData = require(databaseDirectory + '/Grade 11/earth.json')
const mercuryData = require(databaseDirectory + '/Grade 11/mercury.json')
const marsData = require(databaseDirectory + '/Grade 11/mars.json')
const saturnData = require(databaseDirectory + '/Grade 11/saturn.json')
const venusData = require(databaseDirectory + '/Grade 11/venus.json')
const g11Data = { earth: earthData, mercury: mercuryData, mars: marsData, saturn: saturnData, venus: venusData}

const ariesData = require(databaseDirectory + '/Grade 12/aries.json')
const capricornData = require(databaseDirectory + '/Grade 12/capricorn.json')
const geminiData = require(databaseDirectory + '/Grade 12/gemini.json')
const piscesData = require(databaseDirectory + '/Grade 12/pisces.json')
const scorpioData = require(databaseDirectory + '/Grade 12/scorpio.json')
const g12Data = { aries: ariesData, capricorn: capricornData, gemini: geminiData, pisces: piscesData, scorpio: scorpioData}

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

app.get('/attendance/grade7', (req, res) => {
    res.render('./pages/grade7.ejs', { grade7Attendance: g7Data } )
    app.use('/public', express.static('public'))
})

app.get('/attendance/grade8', (req, res) => {
    res.render('./pages/grade8.ejs', { grade8Attendance: g8Data } )
    app.use('/public', express.static('public'))
})

app.get('/attendance/grade9', (req, res) => {
    res.render('./pages/grade9.ejs', { grade9Attendance: g9Data } )
    app.use('/public', express.static('public'))
})

app.get('/attendance/grade10', (req, res) => {
    res.render('./pages/grade10.ejs', { grade10Attendance: g10Data, } )
    app.use('/public', express.static('public'))
})

app.get('/attendance/grade11', (req, res) => {
    res.render('./pages/grade11.ejs', { grade11Attendance: g11Data } )
    app.use('/public', express.static('public'))
})
app.get('/attendance/grade12', (req, res) => {
    res.render('./pages/grade12.ejs', { grade12Attendance: g12Data } )
    app.use('/public', express.static('public'))
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT http://localhost:${PORT}/home`)
})

mainScript.print()