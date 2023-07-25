import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './LoginForm.css'

class LoginForm extends Component {
  state = {
    username: 'robert',
    password: 'WilsonRobert45',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookie.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({showSubmitError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    if (Cookie.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="bg-container">
        <form onSubmit={this.submitForm} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <label htmlFor="username" className="login-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.onChangeUsername}
            className="login-input"
            value={username}
          />
          <label htmlFor="password" className="login-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            className="login-input"
            value={password}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
