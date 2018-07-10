import React, { Component } from "react"
import { Navbar, Button } from "react-bootstrap"
import "./App.css"

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login()
  }

  logout() {
    this.props.auth.logout()
    this.setState({
      results: [],
    })
  }

  state = {
    results: [],
  }

  async loadData() {
    const data = await fetch(
      "https://rglnyzzxj9.execute-api.eu-central-1.amazonaws.com/prod/results",
      {
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }),
      },
    )
    const json = await data.json()
    this.setState({
      results: json.items,
    })
  }

  componentDidMount() {
    if (localStorage.getItem("access_token")) {
      this.loadData()
    }
  }

  componentWillReceiveProps() {
    if (localStorage.getItem("access_token")) {
      this.loadData()
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, "home")}
            >
              Home
            </Button>
            {!isAuthenticated() && (
              <Button
                id="qsLoginBtn"
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                id="qsLogoutBtn"
                bsStyle="primary"
                className="btn-margin"
                onClick={this.logout.bind(this)}
              >
                Log Out
              </Button>
            )}
          </Navbar.Header>
        </Navbar>
        <ul>
          {this.state.results.map(item => (
            <li key={item.id}>
              {item.id}, Class: {item.class}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
