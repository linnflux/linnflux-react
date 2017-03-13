'use strict'

import React from 'react'
import { browserHistory, Link, Navigation } from 'react-router'
import crypto from 'crypto'
import * as LoginActions from "../actions/loginActions"
import LoginStore from "../stores/loginStore"


class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      salt: null,
      hash: null,
      userPassword: null,
      checkHash: null,
      enteredEmail: null,
      enteredPwd: null,
      dbSalt: null,
      dbHash: null,
      loggedIn: false,
      ajaxResult: {},
      url: 'api/validate_user.php'
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePwdChange = this.handlePwdChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleEmailChange(e) {
    this.setState({ enteredEmail: e.target.value })
  }

  handlePwdChange(e) {
    this.setState({ enteredPwd: e.target.value })
  }

  handleLogin(email, pwd) {
    LoginActions.tryLogin(email,pwd)

    setTimeout(function(){
        if (LoginStore.isLoggedIn()) {
            console.log("login says yes &  " + LoginStore.isLoggedIn())
            browserHistory.push("/")
        } else {
            console.log("login store says " + LoginStore.isLoggedIn())
        }
    }, 500)
  }

  render() {
    return (
      <div className="login-box container">
        <div className="row login-internal">
          <img src="img/linnflux-logo.png" className="responsive-img"/>
          <div className="row login-signup">
            <div className="col s6 login-select select-active">
                <h5>Login</h5>
            </div>
            <Link to="/signup">
                <div className="col s6 login-select">
                    <h5>Signup</h5>
                </div>
            </Link>
          </div>
          <div className="col s12 login-body">
            <div className="row">
                <div className="input-field col s12">
                    <input id="login-email" onChange={ this.handleEmailChange } type="text"/>
                    <label htmlFor="login-email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="login-pwd" onChange={ this.handlePwdChange } type="password"/>
                    <label htmlFor="login-pwd">Password</label>
                </div>
            </div>            
            <a className="waves-effect waves-light green btn" onClick={ () => this.handleLogin(this.state.enteredEmail, this.state.enteredPwd) }>Login</a>
          </div>
        </div>
      </div>
    )
  }

}

export default Login