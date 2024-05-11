import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }
  changeUserName = event => {
    this.setState({username: event.target.value})
  }
  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }
  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const responce = await fetch(apiUrl, options)
    const data = await responce.json()
    if (responce.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }
  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login_form_container">
        <form className="form_container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo_img"
          />
          <div className="input_container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="username-input-field"
              type="text"
              id="username"
              value={username}
              placeholder="Username"
              onChange={this.changeUserName}
            />
          </div>
          <div className="input_container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="password-input-field"
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={this.changePassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
