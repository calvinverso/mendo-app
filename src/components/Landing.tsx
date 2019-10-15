import React from 'react';
import logo from './logo.svg';
import './Landing.scss';
import queryString from 'query-string';
import ScrollAnimation from 'react-animate-on-scroll';

//import axios from 'axios';
//import { Link, BrowserRouter } from 'react-router-dom'


/*LOGOS*/
import mendo_pink from '../images/mendo.svg'
import mendo_red from '../images/mendo-red.svg'


/*GRAPHICS*/
import fireplace from '../images/fireplace.png'
import couch from '../images/couch.png';

interface Props { }

interface State {

};


class Landing extends React.Component<Props, State> {

  state: State = {

  };
  componentDidMount() {
    // this.getInfo();
    //console.log(this.state.userData)
  }
  handleLogin() {
    console.log(process.env.REACT_APP_ENDPOINT)
    window.location.href = process.env.REACT_APP_ENDPOINT + "/login";
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={mendo_pink} className="mendo-logo" alt="logo" />
          <div className="landing section">
            <div className="intro">
              <ScrollAnimation animateIn="fadeInUp">
                <h1>
                  Discover new music based on your Spotify activity
                </h1>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInUp">
                <button onClick={this.handleLogin}>Start</button>
              </ScrollAnimation>
            </div>
            <img src={fireplace} className="animated fadeInRight main-graphic" alt="logo" />
          </div>
        </header>
        <div className="section" id="creation">
        <img src={mendo_red} className="mendo-logo" alt="logo" />

          <div className="intro">
            <ScrollAnimation animateIn="fadeInUp">
              <h1>
                Create unique playlists based on your mood and energy
                </h1>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp">

              <button onClick={this.handleLogin}>Let's Go!</button>
            </ScrollAnimation>
          </div>
          <img src={couch} className="animated fadeInLeft second-graphic" alt="logo" />
        </div>
      </div>
    );
  }
}

export default Landing;
