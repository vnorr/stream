import React from 'react'
import './AuthView.scss'

const firebaseAPIKey = 'AIzaSyA8pSOF8QhFEeEnjHpSwiuzpcLA25lUAT8'
const projectId = 'backoffice-cd174'

const Rebase = require('re-base')
const firebase = require('firebase')
const app = firebase.initializeApp({
  apiKey: "AIzaSyA8pSOF8QhFEeEnjHpSwiuzpcLA25lUAT8",
  authDomain: "backoffice-cd174.firebaseapp.com",
  databaseURL: "https://backoffice-cd174.firebaseio.com",
  projectId: "backoffice-cd174",
  storageBucket: "backoffice-cd174.appspot.com",
  messagingSenderId: "509674942428"
})

var base = Rebase.createClass(app.database())

import MessageBoard from './../MessageBoard'

export default class AuthView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: {
        displayName: '',
        email: '',
        uid: ''
      }
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    console.log('Your mum')
    var provider = new firebase.auth.GoogleAuthProvider();
    app.auth().signInWithPopup(provider).then(() => {
      //return value is null
      const currentUser = app.auth().currentUser
      const { user } = this.state
      user.displayName =  currentUser.displayName
      user.uid = currentUser.uid
      user.email = currentUser.email

      this.setState({
        user,
        loggedIn: true
      })
    })
  }

  render() {
    const { loggedIn } = this.state
    const { handleInputChange, handleSendMessage, name, feed } = this.props

    if(loggedIn) {
      return (
        <MessageBoard
          handleInputChange={handleInputChange}
          handleSendMessage={handleSendMessage}
          name={name}
          feed={feed}
        />
      )
    } else {
      return (
        <div className="AuthView">
          <button onClick={this.handleLogin}>Log in with Google</button>
        </div>
      )
    }
  }
}
