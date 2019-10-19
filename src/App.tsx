import React from 'react';
import './App.scss';
import queryString from 'query-string';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SpotifyWebAPI from 'spotify-web-api-js';


/*COMPONENTS*/
import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create'
import PlaylistPage from './components/PlaylistPage';


const SpotifyAPI = new SpotifyWebAPI();


interface Props { }

interface State {
  userData: { display_name: string }, //The user's data provided by Spotify
  access_token: string //Spotify Access Token to fetch information
};


class App extends React.Component<Props, State> {

  state: State = {
    userData: null,
    access_token: ''
  };
  componentDidMount() {
    this.getInfo();
    //console.log(this.state.userData)
  }

  /**
   * Obtains a user's general info after login
   */
  getInfo() {
    let access_token = queryString.parse(window.location.search).access_token;
    if (access_token !== undefined) {
      this.setState({ access_token: access_token.toString() })
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          'Authorization': "Bearer " + access_token
        }
      }).then((res) => res.json()).then(data => {
        this.setState({ userData: data });
      })

    }
    if (access_token) {
      SpotifyAPI.setAccessToken(access_token.toString());
      SpotifyAPI.getMe().then((data)=> {
        console.log(data);
      })

    }
   

  }

  render() {
    return (
      <Router>
        <div className="App" >
          <Switch>
            <Route path="/playlist/:id">
              <PlaylistPage id="" access_token={this.state.access_token}/>
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/">
              {/** If user data exists, render Home Page if not Landing Page*/}
              {this.state.userData ? <Home access_token={this.state.access_token} /> : <Landing />}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
