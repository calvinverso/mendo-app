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
    topTracks: [{ name: string, artist: string, image: string }],
    topArtists: [{ name: string, genres: [], image: string }]
    tracksTimeRange: string,
    artistsTimeRange: string,
    playHistory: [{ name: string, artist: string, uri: string, played_at: string }]
};


class Home extends React.Component<Props, State> {

    state: State = {
        topTracks: [{ name: '', artist: '', image: '' }],
        topArtists: [{ name: '', genres: [], image: '' }],
        tracksTimeRange: 'short_term',
        artistsTimeRange: 'short_term',
        playHistory: [{ name: '', artist: '', uri: '', played_at: '' }],
    };
    componentDidMount() {
        console.log("HOME SAYS: " + this.props.access_token)
        SpotifyAPI.setAccessToken(this.props.access_token);
        this.getTopTracks();
        this.getTopArtists();
        this.getPlayHistory();

    }
    async getPlayHistory() {
        await fetch(process.env.REACT_APP_ENDPOINT + "/playhistory?access_token" + this.props.access_token).then((res) => {
            console.log(res)
            res.json().then((result) => { this.setState({ playHistory: result.tracks }) })
        })


    }
    getTopTracks() {
        SpotifyAPI.getMyTopTracks({ limit: 5, time_range: this.state.tracksTimeRange }).then((response: any) => {
            console.log("your top tracks")
            //console.log(response);
            var topTracks: [{ name: string, artist: string, image: string }] = [{ name: '', artist: '', image: '' }]
            var track;
            response.items.map((item) => {
                console.log(item.name)
                track = {
                    name: item.name,
                    artist: item.artists[0].name,
                    image: item.album.images[0].url
                }
                topTracks.push(track);
            })
            console.log(topTracks)
            this.setState({ topTracks: topTracks })
        })
    }

    getTopArtists() {
        SpotifyAPI.getMyTopArtists({ limit: 5, time_range: this.state.tracksTimeRange }).then((response: any) => {
            console.log("your top artists")
            var topArtists: [{ name: string, genres: [], image: string }] = [{ name: '', genres: [], image: '' }]
            var artist;

            // console.log(response)


            response.items.map((item) => {
                var main_genres = [];
                console.log(item.name)
                item.genres.map((genre, i) => {
                    if (i < 2) {
                        console.log("GENRE: " + genre)
                        main_genres.push(genre);
                    }
                })
                artist = {
                    name: item.name,
                    image: item.images[0].url,
                    genres: main_genres
                }
                topArtists.push(artist);
            })
            console.log(topArtists)

            this.setState({ topArtists: topArtists })

        })
    }
    /*
     updateTimeRange() {
        await this.setState({
            tracksTimeRange: 'medium_term'
        });
        this.getTopTracks()
    }
*/
    render() {
        let topTracks = this.state.topTracks.map((item, i) => {
            return (
                <div style={i === 1 ? { fontSize: '1.2em' } : { fontSize: '1em' }}>
                    <h2>{item.name}</h2>
                    <h4>{item.artist}</h4>
                </div>
            )
        })

        let topArtists = this.state.topArtists.map((item, i) => {
            let genres = item.genres.map((genre, j) => {
                if (j < 1) {
                    return (

                        <h4>{genre}</h4>
                    )
                }
            })


            return (
                <div style={i === 1 ? { fontSize: '1.2em' } : { fontSize: '1em' }}>
                    <h2>{item.name}</h2>
                    {genres}
                </div>
            )
        })

        let playHistory = this.state.playHistory.map((item, i) => {
            return (
                <div style={{fontSize: '0.6em'}}>
                    <h2>{item.name}</h2>
                    <h4>{item.artist}</h4>
                </div>
            )
        })
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
                    <div className="top-tracks">
                        <h1>Your Top Tracks</h1>
                        <p style={{ padding: 0 }}>Based on last month's activity</p>
                        {topTracks}
                    </div>
                    <div className="top-artists">
                        <h1>Your Top Artists</h1>
                        {topArtists}
                    </div>
                    <div className="play-history"><h1>Your Play History</h1>
                        <h2>{playHistory}
                        </h2></div>
                </div>

            </div>
        );
    }
}

export default Home;
