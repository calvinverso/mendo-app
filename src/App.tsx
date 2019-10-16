import React from 'react';
import './App.scss';
import queryString from 'query-string';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

/*COMPONENTS*/
import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create'

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
    this.getInfo();
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

    }

  }

  render() {
    return (
      <Router>
        <div className="App" >


          <Switch>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/">
              {this.state.userData ? <Home access_token={this.state.access_token} /> : <Landing />}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
