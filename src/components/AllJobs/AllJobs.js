import React, { Component } from "react";
import "./AllJobs.css";
import axios from "axios";
// import "./JobBoard.js";

class AllJobs extends Component {
  state = {
    allJobs: []
  };

  componentDidMount() {
    this.loadJobs()
  }


  loadJobs = event => {
    console.log("Get is fired");


    return axios
      .get("/api/jobs")
      .then(res => {
        console.log("RES: ", res)
        console.log("FIRED");

        // console.log("this is the string" + JSON.stringify(response))
        // console.log(JSON.stringify(response["data"]))
        let data = res.data;
        console.log("data = " + data);
        
        let data2 = data[0];
        console.log("data2 = " + data2);
        // console.log(JSON.stringify(data));
 
         console.log("data.username = " + data.username)
         console.log("data.username = " + data.streetAddress)
         console.log("data.username = " + data.city)
         console.log("data.username = " + data.state)
         console.log("data.username = " + data.zipCode)
         console.log("data.username = " + data.price)
         console.log("data.username = " + data.dateNeededBy)

         this.setState({
          allJobs: data
        });

        // console.log(this.state.allJobs)
        // console.log(this.state.allJobs[0].city)
        console.log(this.state.allJobs.streetAddress)
        // console.log(this.state.username)

        // response["data"][0].username)

      })
      .catch(function (error) {
        console.log(error);
      })

  };
  render() {
    return (

      <div className="center">
        <div className="jumbotron-create">
        </div>
        <div className="transbox-create-bg">
          <div className="transbox-create">
            <table>
              <tbody>
                <tr>

                  <th>User Name</th>
                  <th>Street Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip</th>
                  <th>Price</th>
                  <th>Date Needed by</th>
                  <th>CLAIM</th>

                </tr>
                {this.state.allJobs.map(job => (

                   <tr>
                    <td>{job.username}</td>
                    <td>{job.streetAddress}</td>
                    <td>{job.city}</td>
                    <td>{job.state}</td>
                    <td>{job.zipCode}</td>
                    <td>{job.price}</td>
                    <td>{job.dateNeededBy}</td>
                    <button>CLAIM</button>

                  </tr>


                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }


};

export default AllJobs;