import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'

// Components
import LoginForm from '../src/components/LoginForm'
import Header from './components/Header/index'
import Nav from './components/Nav/index'

// Pages
import Jobs from "./pages/Jobs/Jobs";
import Register from "./pages/Register/Register";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/About";
import AddJob from "./pages/AddJob/AddJob";
import Map from "./pages/Map/Map";

//CSS
import "./App.css";


const DisplayLinks = props => {

  if (props.loggedIn) {
  return (
      <ul className="nav">

      <a class="navbar-brand"  href= "/"> <img src="https://s3.us-east-2.amazonaws.com/devteammembers/yellow-mower.png" alt="yellow-mower" height="80"/></a>

      
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/" ? "active" : ""}>
      <Link to="/">Home</Link>
      </li>
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/about" ? "active" : ""}>
      <Link to="/about">About Us</Link>
      </li>
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/createjob" ? "active" : ""}>
      <Link to="/createjob">Create Job</Link>
      </li>
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/jobboard" ? "active" : ""}>
      <Link to="/jobboard"><strong>Job Board</strong></Link>
      </li>
      <li className="btn btn-outlined btn-success" onClick={props._logout} {...window.location.pathname === "/" ? "active" : ""}>
      <Link to="/"><strong>LogOut</strong></Link>
      </li>

      </ul>
)
 

} else {
  return (

      <ul className="nav">
    
    <a class="navbar-brand"  href= "/"> <img src="https://s3.us-east-2.amazonaws.com/devteammembers/yellow-mower.png" alt="yellow-mower" height="80"/></a>

      
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/" ? "active" : ""}>
      <Link to="/">Home</Link>
      </li>
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/about" ? "active" : ""}>
      <Link to="/about">About Us</Link>
      </li>
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/users/register" ? "active" : ""}>
      <Link to="/users/register">Register</Link>
      </li>
      <li className="btn btn-outlined btn-success" {...window.location.pathname === "/users/login" ? "active" : ""}>
      <Link to="/users/login">Login</Link>
      </li>
  
      </ul>
        
)
}
}

class App extends Component {
constructor() {
  super()
  this.state = {
    loggedIn: false,
    user: null
  }
  this._logout = this._logout.bind(this)
  this._login = this._login.bind(this)
}
componentDidMount() {
  axios.get('/auth/user').then(response => {
    console.log(response.data)
    if (!!response.data.user) {
      console.log('THERE IS A USER')
      this.setState({
        loggedIn: true,
        user: response.data.user
      })
    } else {
      this.setState({
        loggedIn: false,
        user: null
      })
    }
  })
}

_logout(event) {
  event.preventDefault()
  console.log('logging out')
  axios.post('/auth/logout').then(response => {
    console.log(response.data)
    if (response.status === 200) {
      this.setState({
        loggedIn: false,
        user: null
      })
    }
  })
}

_login() {
  this.setState({
    loggedIn:true,
  })
}


  render() {
    return (
      
      <div>
      
        {/* Indicates whether User is signed in and if logged in displays their username */}
        <Header user={this.state.user} />
                
        {/* LINKS set up to manipulate Nav according to User login status */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
  
 
        {/*  ROUTES */}
        <Route exact path="/" render={() => <Home user={this.state.user} />} />
        <Route exact path="/home" render={() => <Home user={this.state.user} />} />

				<Route exact path="/login" render={() => <LoginForm _login={this._login} />} />
				<Route exact path="/users/login" component={Login} /> 
				<Route exact path="/users/register" component={Register} />
				<Route exact path="/jobboard" component={Jobs} />
				<Route exact path="/about" component={AboutUs} /> 
				<Route exact path="/createjob" component={AddJob} /> 
				<Route exact path="/map" component={Map} /> 


      </div>
  
    
    );
  }
}

export default App;
