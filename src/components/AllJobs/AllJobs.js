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

        let data = res.data;
        console.log("data = " + data);
        
        let data2 = data[0];
        console.log("data2 = " + data2);

         this.setState({
          allJobs: data
        });


      })
      .catch(function (error) {
        console.log(error);
      })

  };

  handleJobDelete = id => {
    axios
    .delete("/api/jobs/", {id:id}).then(res => this.loadJobs());
  };

  render() {
    return (

      <div className="center">
        <div className="jumbotron-alljobs">
        </div>
        <div className="transbox-alljobs-bg">
          <div className="transbox-alljobs">
          <table className="table table-bordered">
          <h4><strong>Current Jobs Available</strong></h4>

            
              <tbody>
                <tr>

                <th className="thead">Customer Name</th>
                  <th className="thead">Job Address</th>
                  <th className="thead">City</th>
                  <th className="thead">State</th>
                  <th className="thead">Zip</th>
                  <th className="thead">Price</th>
                  <th className="thead">Date Needed by</th>
                  <th className="thead">CLAIM</th>

             
                </tr>
                {this.state.allJobs.map(job => (

                   <tr>
                      <td className="tdata">{job.username}</td>
                    <td className="tdata">{job.streetAddress}</td>
                    <td className="tdata">{job.city}</td>
                    <td className="tdata">{job.state}</td>
                    <td className="tdata">{job.zipCode}</td>
                    <td className="tdata">{job.price}</td>
                    <td className="tdata">{job.dateNeededBy}</td>
                    {/* <button onClick={() => handleJobDelete(job.id)} className="btn btn-primary">CLAIM</button> */}
                    <td className="btn btn-primary"><strong>CLAIM</strong></td>



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