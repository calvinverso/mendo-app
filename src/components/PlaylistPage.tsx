import React from 'react';
import './PlaylistPage.scss';
//import queryString from 'query-string';
import ScrollAnimation from 'react-animate-on-scroll';


import SpotifyWebAPI from 'spotify-web-api-js';


/*LOGOS*/
import mendo_pink from '../images/mendo.svg'
import mendo_red from '../images/mendo-red.svg'

/*GRAPHICS*/
import fireplace from '../images/fireplace.png'
import couch from '../images/couch.png';

const SpotifyAPI = new SpotifyWebAPI();


interface Props {
    id: string,
    access_token: string,
}

interface State {

};


class PlaylistPage extends React.Component<Props, State> {

    state: State = {

    };
    componentDidMount() {
        this.getInfo();
        //console.log(this.state.userData)
    }

    getInfo() {
        console.log(this.props.id);
        SpotifyAPI.setAccessToken(this.props.access_token);
        if (this.props.id) {
            SpotifyAPI.getPlaylist(this.props.id).then((response: any) => {
                console.log(response);
            })
        }

    }

    render() {
        return (
            <div>
                PlaylistName
            </div>
        );
    }
}

export default PlaylistPage;
