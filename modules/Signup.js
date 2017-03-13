'use strict';

import React from 'react';
import {Link} from 'react-router';
import crypto from 'crypto';


class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      salt: null,
      hash: null,
      userPassword: null,
      checkHash: null,
      enteredEmail: null,
      enteredPwd: null,
      dbSalt: null,
      dbHash: null,
      ajaxResult: {},
      url: 'api/add_user.php'
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSingup = this.handleSignup.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  genRandomString(length){ /** generate SALT */
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);/** return required number of chars */
  };

  sha512(password, salt){ /** hash pw with sha512 */
    var hash = crypto.createHmac('sha512', salt); /** hashing algo sha512*/
    hash.update(password);
    var value = hash.digest('hex');
    return {
      salt:salt,
      passwordHash:value
    };
  };

  saltHashPassword(userpassword) {
    var salt = this.genRandomString(16); /** give salt length of 16 */
    var passwordData = this.sha512(userpassword, salt);
    this.setState({ 
      salt: passwordData.salt, 
      hash: passwordData.passwordHash, 
      userPassword: userpassword 
    }, function() { 
      $.ajax({
        url: this.state.url,
        type: 'post',
        dataType: 'json',
        data: { email: this.state.enteredEmail, salt: this.state.salt, hash: this.state.hash },
        success: function(data){
          console.log("user created");
        }.bind(this),
        error: function(err){
          console.log('ERROR: ' + JSON.stringify(err));
        }.bind(this)
      });


    }); // this does work
    console.log("make sure = " + this.state.salt + " and " + this.state.hash);
  }

  checkPassword(userpassword, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(userpassword);
    var value = hash.digest('hex');
    this.setState({checkHash: value});   
  }

  handleEmailChange(e) {
    this.setState({ enteredEmail: e.target.value });
  }

  handlePwdChange(e) {
    this.setState({ enteredPwd: e.target.value });
  }

  handleSignup() {

    // query db: get pwd_salt, pwd_hash to match email address, set in states dbSalt, dbHash
    var email = this.state.enteredEmail;
    var pwd = this.state.enteredPwd;

    this.saltHashPassword(pwd)

    var salt = this.state.salt
    var hash = this.state.hash
  }

  render() {
    return (
      <div className="login-box container">
        <div className="row login-internal">
          <img src="img/linnflux-logo.png" className="responsive-img"/>
          <div className="row login-signup">
            <Link to="/login">
                <div className="col s6 login-select">
                    <h5>Login</h5>
                </div>
            </Link>
            <div className="col s6 login-select select-active">
                <h5>Signup</h5>
            </div>
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
            <a className="waves-effect waves-light green btn" onClick={ () => this.handleSignup() }>Signup</a>
          </div>
        </div>
      </div>
    );
  }

}

export default Signup;