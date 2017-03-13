'use strict';

import dispatcher from '../dispatcher/appDispatcher'
import LoginStore from '../stores/loginStore'
import crypto from 'crypto'

export function isLoggedIn() {
  dispatcher.dispatch({ type: "IS_LOGGED_IN" });
}

export function tryLogin(email, pwd){
  //dispatcher.dispatch({ type: "TRY_LOGIN" }); -- what is the point of this?  
  dispatcher.dispatch({ type: "SET_EMAIL", email });
  $.ajax({
      url: 'api/validate_user.php',
      type: 'post',
      dataType: 'json',
      data: { email: email },
      success: function(data){
        // set vars
        var salt = data[0].dbSalt;
        var hash = data[0].dbHash;

        // set store
        dispatcher.dispatch({ type: "SET_SALT", salt });
        dispatcher.dispatch({ type: "SET_HASH", hash });

        // use salt to get client side hash
        var newHash = crypto.createHmac('sha512', salt);
        newHash.update(pwd);
        var value = newHash.digest('hex');

        // compare to server side hash        
        if (value == hash) {
          var value = true
          dispatcher.dispatch({ type: "SET_IS_LOGGED_IN", value })
        } else {
          console.log("fail")
        }

      }.bind(this),
      error: function(err){
        console.log('ERROR=  ' + JSON.stringify(err));
      }.bind(this)
  });

}

export function setIsLoggedIn(value){
    dispatcher.dispatch({ type: "SET_IS_LOGGED_IN", value })
}

export function setEmail(email){
  dispatcher.dispatch({ type: "SET_EMAIL", email });
}

export function setSalt(salt){
  dispatcher.dispatch({ type: "SET_SALT", salt });
}

export function setHash(hash){
  dispatcher.dispatch({ type: "SET_HASH", hash });
}