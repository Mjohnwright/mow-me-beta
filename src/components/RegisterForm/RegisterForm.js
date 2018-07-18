import React, { Component } from "react";
import "./RegisterForm.css";
import axios from "axios";
import { Redirect } from 'react-router-dom'

class RegisterForm extends Component {
  constructor() {
    super()
  
  this.state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    passwordConf: ""
  }

  this.handleFormRegisterSubmit = this.handleFormRegisterSubmit.bind(this)
  this.handleRegisterInputChange = this.handleRegisterInputChange.bind(this)
}

  // ValidateRegister = event => {
  //   // Preventing the default behavior of the form submit (which is to refresh the page)
  //   event.preventDefault();
  //   console.log("validate Register is fired");
  //   // Set of conditions to validate a New User's data
  //   if (this.state.firstName === "") {
  //     alert("Please provide your First Name");
  //     return false;
  //   } else if (this.state.lastName === "") {
  //     alert("Please provide your Last Name");
  //     return false;
  //   } else if (this.state.phone === "") {
  //     alert("Please provide your Phone Number");
  //     return false;
  //   } else if (this.state.email === "") {
  //     alert("Please provide your E-mail address");
  //     return false;
  //   } else if (this.state.userName === "") {
  //     alert("Please choose a User Name");
  //     return false;
  //   } else if (this.state.password === "") {
  //     alert("Please choose a password");
  //     return false;
  //   } else if (this.state.passwordConf === "") {
  //     alert("Please type your password again");
  //     return false;
  //   }
  //   this.handleFormRegisterSubmit(event);
  // };

  handleRegisterInputChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}
 handleFormRegisterSubmit = event => {
    event.preventDefault();

    console.log("POST Register is fired");

    axios
    .post("/auth/register/", {
        
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phone,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          passwordConf: this.state.passwordConf,
          dateJoined: new Date(Date.now())
        
      })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('youre good')
          this.setState({
            redirectTo: '/login'
          })
        } else {
          console.log('duplicate')
        }
      })
    
    // this.setState({
    //   firstName: "",
    //   lastName: "",
    //   phone: "",
    //   email: "",
    //   username: "",
    //   password: "",
    //   passwordConf: ""
    // });

    //  res.redirect("/");
  };



  render() {
      
    if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
      }

    return (

      <div className="center">
        <div className="jumbotron-register">
        
        </div>
        <div className="transbox-register-bg">
          <div className="transbox-register">
                    <form className="register-form" name="register">
                      <h3>Register Account</h3>

                      <div className="field-register">
                        <label>First Name</label>
                        <input className="input-register"
                          type="text"
                          value={this.state.firstName}
                          name="firstName"
                          onChange={this.handleRegisterInputChange}
                        />
                      </div>

                      <div className="field-register">
                        <label>Last Name</label>
                        <input className="input-register"
                          type="text"
                          value={this.state.lastName}
                          name="lastName"
                          onChange={this.handleRegisterInputChange}
                        />
                      </div>

                      <div className="field-register">
                        <label>Phone Number</label>
                        <div className="field">
                          <input className="input-register"
                            type="text"
                            value={this.state.phone}
                            name="phone"
                            placeholder="(xxx-xxx-xxx)"
                            onChange={this.handleRegisterInputChange}
                          />
                        </div>
                      </div>

                      <div className="field-register">
                        <label>E-mail</label>
                        <input className="input-register"
                          type="text"
                          value={this.state.email}
                          name="email"
                          validate={this.validateEmail}
                          onChange={this.handleRegisterInputChange}
                        />
                      </div>

                      <div className="field-register">
                        <label>User Name</label>
                        <input className="input-register"
                          type="text"
                          value={this.state.username}
                          name="username"
                          onChange={this.handleRegisterInputChange}
                        />
                      </div>

                      <div className="field-register">
                        <label>Password</label>
                        <input className="input-register"
                          type="text"
                          value={this.state.password}
                          name="password"
                          onChange={this.handleRegisterInputChange}
                        />
                      </div>

                      <div className="field-register">
                        <label>Confirm Password</label>
                        <input className="input-register"
                          type="text"
                          value={this.state.passwordConf}
                          name="passwordConf"
                          onChange={this.handleRegisterInputChange}
                        />
                      </div>

                      <div className="field-register">
                        <button
                          className="ui button-register"
                          type="submit"
                          onClick={this.handleFormRegisterSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
