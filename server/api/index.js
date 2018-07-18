const express = require('express')
const router = express.Router()
const Job = require('../db/models/jobs')

// this route is just used to get the job listing info
router.get('/jobs', (req, res, next) => {
	console.log('===== job!!======') //THIS IS NOT BEING HIT
	console.log("REQ JOB = " + req.jobs)

// get all the users
	Job.find({}, function(err, jobs) {
	if (err) throw err;
	// Job.sort({ date: -1})
	// object of all the users
	console.log(jobs);
  });
	if (req.jobs) {
		return res.json({ jobs: req.jobs})
	} else {
		return res.json({ jobs: null })
	}
})

module.exports = router