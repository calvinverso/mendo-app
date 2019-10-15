import React from 'react';
import logo from './logo.svg';
import './App.scss';
import queryString from 'query-string';
import ScrollAnimation from 'react-animate-on-scroll';

//import axios from 'axios';
//import { Link, BrowserRouter } from 'react-router-dom'


/*LOGOS*/
import mendo_pink from './images/mendo.svg'
import mendo_red from './images/mendo-red.svg'


/*GRAPHICS*/
import fireplace from './images/fireplace.png'
import couch from './images/couch.png';


/*COMPONENTS*/
import Landing from './components/Landing';

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
    console.log(process.env.REACT_APP_ENDPOINT)
    window.location.href = process.env.REACT_APP_ENDPOINT + "/login";
  }

  render() {
    return (
      <div className="App" >
        <Landing />
      </div>
    );
  }
}

export default App;
