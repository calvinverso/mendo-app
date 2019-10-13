import React from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';
//import axios from 'axios';
//import { Link, BrowserRouter } from 'react-router-dom'


interface Props { }

interface State {
  name: string,
  userData: { display_name: string },
  access_token: string
};


class App extends React.Component<Props, State> {

  state: State = {
    name: 'No Name',
    userData: null,
    access_token: ''
  };
  componentDidMount() {
   // this.getInfo();
    //console.log(this.state.userData)
  }

  getInfo() {
    let access_token = queryString.parse(window.location.search).access_token;
    console.log(access_token);
    if (access_token !== undefined) {
      this.setState({ access_token: access_token.toString() })
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          'Authorization': "Bearer " + access_token
        }
      }).then((res) => res.json()).then(data => {
        this.setState({ userData: data });
        console.log(data)
      })


      fetch("https://api.spotify.com/v1/me/top/tracks?" +
        queryString.stringify({
          time_range: "long_term"
        }), {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + access_token
        }
      }).then((res) => res.json()).then(data => console.log(data));

    }

  }

  handleLogin() {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "development") {
      window.location.href = "http://localhost:8888/login"
    } else {
      window.location.href = "http://mendo-server.herokuapp.com/login"
    }
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            hey, user
        </p>
          {this.state.userData ? <p>Hey que tal, {this.state.userData.display_name}</p> : <button type="button" className="btn btn-info" onClick={this.handleLogin}>Login</button>}


          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
