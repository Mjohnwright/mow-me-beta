const express = require('express')
const router = express.Router()
const Job = require('../db/models/jobs')

//GET ROUTE
// this route is just used to get the job listing info
router
.get('/jobs/', (req, res ) => {
	console.log('===== job!!======') //THIS IS NOT BEING HIT
	console.log("REQ JOB = " + JSON.stringify(req.body));

	let allJobs = req.body;
	console.log("allJobs = " + JSON.stringify(allJobs));
	
	Job.find({jobChosen : false }, function(err, jobs) {
		if (err) console.log(err);
		res.status(200).send(jobs);
  });
});


//	DELETE ROUTE
router
.delete('/jobdelete/:id', (req, res) => {
	console.log('===== DELETE!!!======')


	Job.findById({ _id: req.params.id }), function (err, jobs) {
		if (err) console.log(err);
		res.status(200).send(jobs);
	};
});

// PUT ROUTE

router
.put('/jobupdate/:id', (req, res, next) => {
	console.log('===== UPDATE!!======')
	console.log('req.params = ' + JSON.stringify(req.params));
	console.log('req.params.id = ' + JSON.stringify(req.params.id));

	//DOING THIS SO FIND ONE AND UPDATES IS NOT RECEIVING A STRING AS AN ARGUMENT
	let varb = JSON.stringify(req.params.id);
	console.log("VARB = " + varb);
	let varby = JSON.parse(varb);
	console.log("VARBY = " + varby);

	Job.findOneAndUpdate(
		{ _id: req.params.id }, 
		{ jobChosen : true},
	
	), 
		
		function (err, jobs) {
			if (err) 
			console.log("ERROR = " + err);
		
			res.send(err);
		
			jobs.save(function(err) {
			if (err)
			res.send(err);
			res.json({message: 'Jobs updated!'})
		})
		console.log("IT IS UPDATED!!!!!!!!!!")
		}
});



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