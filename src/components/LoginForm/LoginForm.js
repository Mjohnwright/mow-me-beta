import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import "./LoginForm.css";
import axios from "axios";

class LoginForm extends Component {
  constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
  }
  
  // validateLogIn = event => {
  //   // Preventing the default behavior of the form submit (which is to refresh the page)
  //   event.preventDefault();
  //   console.log("validate is fired");
  //   if (this.state.username === "") {
  //     alert("Please provide your Username");
  //     // document.myForm.Name.focus() ;
  //     return false;
  //   } else if (this.state.password === "") {
  //     alert("Please provide your Password!");
  //     // document.myForm.email.focus() ;
  //     return false;
  //   }
  //   this.handleLLoginFormSubmit();
  // };

	handleSubmit = event => {

		event.preventDefault();
		if (
		  this.state.username &&
		  this.state.password
		) {
		  axios
		  .post('/auth/login', {
			username: this.state.username,
			password: this.state.password
		  })
			.then(res =>{
			  console.log("logging in sir")
			  console.log(res.data);
			  window.location.href = "/";
			})
			.catch(err => console.log(err));
		}
	  };

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/home'
		})
	}


  render() {
    if (this.state.redirectTo) {
        return  <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
        return (
    
      <div className="center">
        <div className="jumbotron-login">
        
        </div>
        <div className="transbox-login-bg">
          <div className="transbox-login">
            <form className="login-form" name="login">
              <h3>Log-In to Your Account</h3>
  
              <div className="field-login">
                <label>User Name</label>
                <input className="input-login"
                  type="text"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleChange}
                />
              </div>

              <div className="field-login">
                <label>Password</label>
                <input className="input-login"
                  type="text"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
              </div>

              <div className="field-login">
                
                <button
                  className="ui button-login"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
                <a href="/auth/login"> </a>

              
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  }

}

export default LoginForm;