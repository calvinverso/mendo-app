import React from 'react';
import './PlaylistPage.scss';
//import queryString from 'query-string';
import {
    Link
  } from "react-router-dom";
import ScrollAnimation from 'react-animate-on-scroll';


import SpotifyWebAPI from 'spotify-web-api-js';


/*LOGOS*/
import mendo_light from '../images/mendo-light.svg'
import mendo_red from '../images/mendo-red.svg'

/*GRAPHICS*/
import fireplace from '../images/fireplace.png'
import couch from '../images/couch.png';
import playlist from '../images/playlist.svg'

const SpotifyAPI = new SpotifyWebAPI();


interface Props {
    id: string,
    access_token: string,
}

interface State {
    playlistInfo: { name: string, owner: string, url: string, image: string, tracks: [{ name: string, artist: string, album: string, image: string }] }
    id: string
};


class PlaylistPage extends React.Component<Props, State> {

    state: State = {
        playlistInfo: { name: '', owner: '', url: '', image: '', tracks: [{ name: '', artist: '', album: '', image: '' }] },
        id: ''
    };
    componentDidMount() {
        this.getInfo();
        //console.log(this.state.userData)
    }

    getInfo() {
        console.log(this.props.id);
        SpotifyAPI.setAccessToken(this.props.access_token);
        if (this.props.id) {
            this.setState({ id: this.props.id })
            SpotifyAPI.getPlaylist(this.props.id).then((response: any) => {
                console.log(response);
                var playlist: { name: string, owner: string, url: string, image: string, tracks: [{ name: string, artist: string, album: string, image: string }] }
                var tracks: [{ name: string, artist: string, album: string, image: string }] = [{ name: '', artist: '', album: '', image: '' }];
                var track;
                response.tracks.items.map((item) => {
                    console.log(item);
                    track = {
                        name: item.track.name,
                        artist: item.track.artists[0].name,
                        album: item.track.album.name,
                        image: item.track.album.images[0].url
                    }

                    tracks.push(track);
                })
                playlist = {
                    name: response.name,
                    owner: response.owner.display_name,
                    url: response.external_urls.spotify,
                    image: response.images[0],
                    tracks: tracks
                }

                this.setState({ playlistInfo: playlist })
            })
        }

    }

    handlePlay(id) {
        window.location.href = "https://open.spotify.com/playlist/" + id;
    }

    render() {

        let tracks = this.state.playlistInfo.tracks.map((track, i) => {
            if (i > 0) {
                return (
                    <div className="track-comp">
                        <img src={track.image} className="album" />
                        <div className="track-info">
                            <h2>{track.name}</h2>
                            <h3>{track.artist}</h3>
                            <h4>{track.album}</h4>
                        </div>
                    </div>
                )
            }
        })

        let { name, owner, image } = this.state.playlistInfo;
        return (
            <div className="playlist-page">
                <div className="navbar">
                    <Link to="/">
                        <img src={mendo_light} className="logo" alt="logo" />
                    </Link>
                </div>

                <div className="playlist-container">
                    <div className="playlist-info">
                        <img src={playlist} className="artwork" />
                        <h1>{name}</h1>
                        <h3>by {owner}</h3>
                        <button className="main-btn"
                            onClick={() => this.handlePlay(this.props.id)}>Play</button>
                    </div>

                    <div className="track-container">
                        {tracks}
                    </div>
                </div>

            </div>
        );
    }
}

export default PlaylistPage;
