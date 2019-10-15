import React from 'react';
import './Landing.scss';
import SpotifyWebAPI from 'spotify-web-api-js';
import queryString from 'query-string';
import ScrollAnimation from 'react-animate-on-scroll';

import './Home.scss';
import mendo_dark from '../images/mendo-dark.svg';
import vr from '../images/vr.png'
import { string } from 'prop-types';

const SpotifyAPI = new SpotifyWebAPI();

interface Props {
    access_token: string
}

interface State {
    topTracks: { items: [{ name: string, artist: string }] }
};


class Home extends React.Component<Props, State> {

    state: State = {
        topTracks: { items: [{ name: '', artist: '' }] }
    };
    componentDidMount() {
        console.log("HOME SAYS: " + this.props.access_token)
        SpotifyAPI.setAccessToken(this.props.access_token);
        // this.getInfo();
        //console.log(this.state.userData)
    }

    render() {
        return (
            <div>
                <div className="navbar">
                    <img src={mendo_dark} className="logo" alt="logo" />
                </div>

                <div className="main-grid">
                    <div className="playlists">
                        <div>
                            <h1>Let's create something awesome</h1>
                            <p>Create a custom playlist</p>
                            <button className="main-bt">Get Started</button>
                        </div>

                        <img src={vr} className="play"></img>
                    </div>
                    <div className="top-tracks"><h1>Your Top Tracks</h1></div>
                    <div className="top-artists"><h1>Your Top Artists</h1></div>
                    <div className="play-history"><h1>Your Play History</h1></div>
                </div>

            </div>
        );
    }
}

export default Home;
