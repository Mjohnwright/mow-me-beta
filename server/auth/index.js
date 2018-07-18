const express = require('express')
const router = express.Router()
const Job = require('../db/models/jobs')
const User = require('../db/models/user')
const passport = require('../passport')


// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

//this route creates a new user
router.post('/register', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
		 		error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

// this route is used to create a new job
router.post('/createjob/', (req, res) => {
	console.log('POST is hit in the index.js file')
	console.log(req.body);
// create a new user
var newJob = Job({
	username: req.body.username,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    price: req.body.price,
    dateNeededBy: req.body.dateNeededBy,
    jobChosen: false
  });

  console.log('newJob = ' + newJob);
  
  // save the user
  newJob.save(function(err) {
	if (err) throw err;
  
	console.log('Job created!');
  });
})

// // this route is just used to get the job listing info
// router.get('/jobs', (req, res ) => {
// 	console.log('===== job!!======') //THIS IS NOT BEING HIT
// 	console.log("REQ JOB = " + req.body)

// // get all the users
// 	Job.find({}, function(err, jobs) {
// 	if (err) throw err;
// 	// Job.sort({ date: -1})
// 	// object of all the users
// 	console.log(jobs);
//   });

//   let data = req.body
//   console.log("Data = " + data);

// res.status(200).send(data);
// });




module.exports = router
