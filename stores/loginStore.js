'use strict';

import EventEmitter from 'events';
import dispatcher from '../dispatcher/appDispatcher';

class LoginStore extends EventEmitter {

  constructor() {
    super();
    this.loggedIn = false;
    this.salt = "";
    this.hash = "";
    this.email = "";
  }

  setIsLoggedIn(value){
    this.loggedIn = value;
    this.emit("change");
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  setSalt(salt){
    this.salt = salt;
    this.emit("change");
  }

  getSalt(){
    return this.salt;
  }

  setHash(hash){
    this.hash = hash;
    this.emit("change");
  }

  getHash(){
    return this.hash;
  }

  setEmail(email){
    this.email = email;
    this.emit("change");
  }

  getEmail(){
    return this.email;
  }

  loginActions(action) {
    switch (action.type){
      case "TRY_LOGIN_FAILED":
      {
        console.log("login failed" + action.error);
        break;
      }
      case "IS_LOGGED_IN":
      {
        console.log("is logged in");
        this.isLoggedIn();
        break;
      }
      case "SET_IS_LOGGED_IN":
      {
        this.setIsLoggedIn(action.value);
        console.log("logged in = " + action.value + " expressed as this.isLoggedIn = " + this.isLoggedIn());
        this.emit("change");
        break;
      }
      case "SET_SALT":
      {
        this.setSalt(action.salt);
        this.emit("change");
        break;
      }
      case "SET_HASH":
      {
        this.setHash(action.hash);
        this.emit("change");
        break;
      }
      case "SET_EMAIL":
      {
        this.setEmail(action.email);
        this.emit("change");
        break;
      }
    }
  }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.loginActions.bind(loginStore));
export default loginStore;