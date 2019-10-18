import React from 'react';
import './Landing.scss';
import SpotifyWebAPI from 'spotify-web-api-js';
//import queryString from 'query-string';
//import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from "react-router-dom";

import './Home.scss';

import mendo_dark from '../images/mendo-dark.svg';
import vr from '../images/vr.png'

const SpotifyAPI = new SpotifyWebAPI();

interface Props {
    access_token: string
}

/**
 * topTracks: Array to push a user's top tracks from Spotify API
 * topArtists: Array to push a user's top artists from Spotify API
 * tracksTimeRange: Indicates time range for obtaining a user's top tracks (short_term, medium_term, long_term)
 * artistsTimeRange: Indicates time range obtaining a user's top artists
 * playHistory: Array to push a user's recently played tracks from Spotify API
 */
interface State {
    topTracks: [{ name: string, artist: string, image: string }],
    topArtists: [{ name: string, genres: [], image: string }],
    tracksTimeRange: string,  
    artistsTimeRange: string, 
    playHistory: [{ name: string, artist: string, uri: string, played_at: string }]
};


class Home extends React.Component<Props, State> {

    state: State = {
        topTracks: [{ name: '', artist: '', image: '' }],
        topArtists: [{ name: '', genres: [], image: '' }],
        tracksTimeRange: 'short_term',  //short_term represents last 30 days
        artistsTimeRange: 'short_term',
        playHistory: [{ name: '', artist: '', uri: '', played_at: '' }],
    };
    componentDidMount() {
        SpotifyAPI.setAccessToken(this.props.access_token);
        this.getTopTracks();
        this.getTopArtists();
        this.getPlayHistory();

    }
    //Obtains a user's 15 most recently played tracks
    async getPlayHistory() {
        SpotifyAPI.getMyRecentlyPlayedTracks({ limit: 15 }).then((response: any) => {
            var tracks: [{ name: string, artist: string, uri: string, played_at: string }]
                = [{ name: '', artist: '', uri: '', played_at: '' }];
            var track;
            response.items.forEach((item) => {
                track = {
                    name: item.track.name,
                    artist: item.track.artists[0].name,
                    uri: item.track.uri,
                    played_at: item.track.played_at
                }
                tracks.push(track);
            })
            this.setState({ playHistory: tracks })
        })
    }
    //Obtains a user's top tracks from past 30 days
    getTopTracks() {
        SpotifyAPI.getMyTopTracks({ limit: 5, time_range: this.state.tracksTimeRange }).then((response: any) => {
            var topTracks: [{ name: string, artist: string, image: string }] = [{ name: '', artist: '', image: '' }]
            var track;
            response.items.forEach((item) => {
                track = {
                    name: item.name,
                    artist: item.artists[0].name,
                    image: item.album.images[0].url
                }
                topTracks.push(track);
            })
            this.setState({ topTracks: topTracks })
        })
    }
    //Obtains a user's top artists from past 30 days
    getTopArtists() {
        SpotifyAPI.getMyTopArtists({ limit: 5, time_range: this.state.tracksTimeRange }).then((response: any) => {
            var topArtists: [{ name: string, genres: [], image: string }] = [{ name: '', genres: [], image: '' }]
            var artist;
            response.items.forEach((item) => {
                var main_genres = [];
                item.genres.filter((genre, i) => i < 2).forEach((genre) => {
                    main_genres.push(genre);
                })
                artist = {
                    name: item.name,
                    image: item.images[0].url,
                    genres: main_genres
                }
                topArtists.push(artist);
            })
            this.setState({ topArtists: topArtists })
        })
    }

    render() {
        //Renders a user's top 5 tracks 
        let topTracks = this.state.topTracks.filter((track, i) => i > 0).map((track, i) => {
            return (
                <div className="music-info" style={i === 0 ? { fontSize: 'inherit' } : { fontSize: 'inherited' }}>
                    <div className="position outline">{i + 1}</div>
                    <div>
                        <h2>{track.name}</h2>
                        <h4>{track.artist}</h4>
                    </div>
                </div>
            )
        })
        //Renders a user's top 5 artists 
        let topArtists = this.state.topArtists.filter((artist, i) => i > 0).map((artist, i) => {
            let genres = artist.genres.filter((genre, j) => j < 1).map((genre) => {
                return (
                    <h4>{genre}</h4>
                )
            });
            return (
                <div className="music-info" style={i === 0 ? { fontSize: 'inherit' } : { fontSize: 'inherited' }}>
                    <div className="position outline">{i + 1}</div>
                    <div>
                        <h2>{artist.name}</h2>
                        {genres}
                    </div>
                </div>
            )
        })
        //Renders a user's 15 most recently played tracks
        let playHistory = this.state.playHistory.map((track,i) => {
            return (
                <div style={{ fontSize: '0.8em' }} key={track.uri + i}>
                    <h2>{track.name}</h2>
                    <h4>{track.artist}</h4>
                </div>
            )
        })
        return (
            <div>
                <div className="navbar">
                    <img src={mendo_dark} className="mendo-logo" alt="logo" />
                </div>

                <div className="main-grid">
                    <div className="playlists">
                        <div>
                            <h1>Let's create something awesome</h1>
                            <p>Personalize your music experience</p>
                            <Link to={"/create?access_token=" + this.props.access_token}>
                                <button className="main-bt">Get Started</button>
                            </Link>
                        </div>

                        <img src={vr} className="play" alt="vr-graphic"></img>
                    </div>
                    <div className="top-tracks">
                        <h1>Your Top Tracks</h1>
                        <h5>Based on last month's activity</h5>
                        {topTracks}
                    </div>
                    <div className="top-artists">
                        <h1>Your Top Artists</h1>
                        <h5>Based on last month's activity</h5>
                        {topArtists}
                    </div>
                    <div className="play-history"><h1>Your Play History</h1>
                        <h5>Based on your recent listening activity</h5>
                        {playHistory}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
