import React from 'react'
import { browserHistory } from 'react-router'
import NavLink from './NavLink'
import LoginStore from '../stores/loginStore'
import * as LoginActions from '../actions/loginActions'

//export default React.createClass({
class App extends React.Component {
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    console.log("handle logout")
    LoginActions.setIsLoggedIn(false)
    browserHistory.push("/")
  }


  render() {

    const isLoggedIn = LoginStore.isLoggedIn()
    let conditionalMenu = null
    let conditionalMobileMenu = null
    if (isLoggedIn) {
      conditionalMenu = (
        
                  <ul className="right hide-on-med-and-down">
                      <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>          
                      <li><NavLink to="/about">About</NavLink></li>
                      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                      <li><NavLink onClick={ this.handleLogout }>Logout</NavLink></li>
                  </ul>
      ),
      conditionalMobileMenu = (
        <ul id="mobile-demo" className="side-nav">
            <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>          
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink onClick={ this.handleLogout }>Logout</NavLink></li>
        </ul>
      )
    } else {
      conditionalMenu = (
        <ul className="right hide-on-med-and-down">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/signup">Signup</NavLink></li>          
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>
      ),
      conditionalMobileMenu = (
        <ul id="mobile-demo" className="side-nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/signup">Signup</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>          
        </ul>
      )
    }



    return (
      <div className="container">
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo"><img src="./img/linnflux-brand.png"/></a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            { conditionalMenu }
            { conditionalMobileMenu }
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

export default App