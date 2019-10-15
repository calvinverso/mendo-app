import React from 'react';
import './App.scss';
import queryString from 'query-string';


/*COMPONENTS*/
import Landing from './components/Landing';
import Home from './components/Home';

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

  render() {
    return (
      <div className="App" >

        {this.state.userData ? <Home access_token={this.state.access_token}/> : <Landing />}

      </div>
    );
  }
}

export default App;
