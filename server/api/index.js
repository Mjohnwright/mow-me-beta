const express = require('express')
const router = express.Router()
const Job = require('../db/models/jobs')

// this route is just used to get the job listing info
router.get('/jobs/', (req, res ) => {
	console.log('===== job!!======') //THIS IS NOT BEING HIT
	console.log("REQ JOB = " + JSON.stringify(req.body));

	let allJobs = req.body;
	console.log("allJobs = " + JSON.stringify(allJobs));
	Job.find({}, function(err, jobs) {
	if (err) console.log(err);
	res.status(200).send(jobs);
  });
});

// router.update(/jobs/:id
// )

// handleJobDelete = id => {
//     axios
// .delete("/api/jobs/", {id:id}).then(res => this.loadJobs());
//   };

module.exports = router

// router.get('/jobs/', (req, res ) => {
// 	console.log('===== job!!======') //THIS IS NOT BEING HIT
// 	console.log("REQ JOB = " + req.job)

// 	let allJobs = req.body;
// 	console.log("allJobs = " + allJobs);

// // get all the users
// 	Job.find({}, function(err, jobs) {
// 	if (err) throw err;
// 	// Job.sort({ date: -1})
// 	// object of all the users
// 	console.log("JOBS in Mongoose NEW")
// 	//allJobs.push(jobs[0])
	
// 	console.log("ALLJOBS in Mongoose 0" + allJobs[0]);

	
//   });
// //    let data = res.json(data)

// //   let data = req.body
// //   console.log("Data = " + data);

// res.status(200).send(jobs);
// });


// module.exports = router