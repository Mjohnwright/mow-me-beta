import React, { Component } from "react";
import "./AllJobs.css";
import axios from "axios";
import formatDate from "./formatDate";

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
        // console.log("RES: ", res)
        // console.log("FIRED");

        let data = res.data;
        // console.log("data = " + data);
        
        // let data2 = data[0];
        // console.log("data2 = " + data2);

         this.setState({
          allJobs: data
        });


      })
      .catch(function (error) {
        console.log(error);
      })

  };
  //HANDLE DELETE
  handleJobDelete = id => {
    console.log("DELETE IS fired");

   return axios
      .delete('/api/jobdelete/'+ id)
      .then( this.loadJobs());
  };

  // HANDlE UPDATE
  handleJobUpdate = id => {
    console.log("UPDATE is fired");

    return axios
      .put('/api/jobupdate/' + id)
      .then(res => {
        
        let data = res.data;
        this.setState({
          allJobs: data
        });

      })
      .catch(function (error) {
        console.log(error);
      })
    }


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
                    <td className="tdata">{formatDate(job.dateNeededBy)}</td>
                    <td className="btn btn-primary"onClick={() => this.handleJobDelete(job._id)} ><strong>CLAIM</strong></td>
                    <td className="btn btn-primary"onClick={() => this.handleJobUpdate(job._id)} ><strong>UPDATE</strong></td>




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