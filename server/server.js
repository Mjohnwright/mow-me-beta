// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()


const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const Job = require('./db/models/jobs')
const User = require('./db/models/user')

const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080
// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
app.use(function(req, res, next) {
	console.log('===== passport user =======')
	console.log(req.session)
	console.log(req.user)
	console.log('===== END =======')
	next()
})



// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))



// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})


const userSeed = [
  {    
    firstName: "amy",
    lastName: "barrons",
    phone:"123456",
    email: "user@user.com",
    username:"amy",
    password:"123",
    dateJoined: new Date(Date.now())
  },
    {    
      firstName: "brian",
      lastName: "barrons",
      phone:"123456",
      email: "user@user.com",
      username:"brian",
      password:"123",
      dateJoined: new Date(Date.now())
    },
    {    
      firstName: "chris",
      lastName: "barrons",
      phone:"123456",
      email: "user@user.com",
      username:"chris",
      password:"123",
      dateJoined: new Date(Date.now())
    }
  
 
 ];

const jobsSeed = [
  {
    username: "Amos",
    streetAddress: "333 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now()),
    jobChosen: false
  },
  {
    username: "Xerxes",
    streetAddress: "333 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now()),
    jobChosen: false
  },
  {
    username: "Yolanda",
    streetAddress: "333 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now()),
    jobChosen: false
  }
 ];

seedDb = () => {
  User.remove({})
  .then(() => {
    User.create(userSeed)
    .then(data => {
      console.log(` records inserted ${data}`);
    })
    .catch(err => {
      console.error(err);
    });
  })
  .catch(err => {
    console.error(err);
  });

  Job.remove({})
  .then(() => {
    Job.create(jobsSeed)
    .then(data => {
      console.log(` records inserted ${data}`);
    })
    .catch(err => {
      console.error(err);
    });
  })
  .catch(err => {
    console.error(err);
  });
}

seedDb();
