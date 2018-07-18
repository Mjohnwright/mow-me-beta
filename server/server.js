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
    firstName: "ronald",
    lastName: "mcdonald",
    phone:2151234567,
     email: "mikeguy@gmail.com",
     username:"mikeuser",
     password:"password",
     passwordConf:"password",
     dateJoined: new Date(Date.now())
  },
  {
    firstName: "first",
    lastName: "last",
    phone:2151234568,
     email: "second@gmail.com",
     username:"seconduser",
     password:"password",
     passwordConf:"password",
     dateJoined: new Date(Date.now())
  }
 ];

const jobsSeed = [
  {
    username: "marc",
    streetAddress: "333 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now())
  },
  {
    username: "mann",
    streetAddress: "222 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now())
  }
  ,
  {
    username: "mann",
    streetAddress: "222 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now())
  },
  {
    username: "mann",
    streetAddress: "222 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now())
  },
  {
    username: "mann",
    streetAddress: "222 street",
    city:"phila",
    state: "PA",
    zipCode:"19148",
    price:"100",
    dateNeededBy: new Date(Date.now())
  }
 ];

seedDb = () => {
  db.Users.remove({})
  .then(() => {
    db.Users.create(userSeed)
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

  db.Jobs.remove({})
  .then(() => {
    db.Jobs.create(jobsSeed)
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
