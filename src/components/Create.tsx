import React from 'react';
import queryString from 'query-string';
import ScrollAnimation from 'react-animate-on-scroll';
import Icon from 'antd/es/icon';
import PlaylistPage from './PlaylistPage';
import { Link } from "react-router-dom";

import './Create.scss';

/*LOGOS*/
import mendo_pink from '../images/mendo.svg'
import mendo_red from '../images/mendo-red.svg'
import mendo_dark from '../images/mendo-dark.svg';

/*GRAPHICS*/
import fireplace from '../images/fireplace.png'
import run from '../images/run.png';
import dance from '../images/dance.png';
import drinks from '../images/drinks.png';
import selfie from '../images/selfie.png';
import vr from '../images/vr.png'





interface Props { }

interface State {
    selected: number,
    currentQuestion: number,

    target_energy: number,
    target_danceability: number,
    target_popularity: number,
    target_valence: number,

    playlistName: string,
    access_token: string,

    playlistRequested: boolean,
    createdId: string,

};

let parameters = []


class Create extends React.Component<Props, State> {

    state: State = {
        selected: 0,
        currentQuestion: 0,

        target_energy: 5,
        target_danceability: 5,
        target_popularity: 5,
        target_valence: 5,

        playlistName: "Mendo's Awesome Mix",
        access_token: '',

        playlistRequested: false,
        createdId: null

    };
    componentDidMount() {
        let access_token = queryString.parse(window.location.search).access_token;
        console.log(access_token);
        if (access_token !== undefined) {
            this.setState({ access_token: access_token.toString() })
        }
        // this.getInfo();
        //console.log(this.state.userData)
    }
    handleLogin() {
        console.log(process.env.REACT_APP_ENDPOINT)
        window.location.href = process.env.REACT_APP_ENDPOINT + "/login";
    }

    handleLast = () => {
        this.setState({ currentQuestion: this.state.currentQuestion - 1, selected: 0 })
    }

    handleNext(category) {

        if (category === "energy") {
            this.setState({
                target_energy: this.state.selected * 0.2
            })
            console.log(this.state.target_energy)
        } else if (category === "dance") {
            this.setState({
                target_danceability: this.state.selected * 0.2
            })
            console.log(this.state.target_danceability)
        } else if (category === "mood") {
            this.setState({
                target_valence: this.state.selected * 0.2
            })
            console.log(this.state.target_valence)
        } else if (category === "trendy") {
            this.setState({
                target_popularity: this.state.selected * 17
            })
            console.log(this.state.target_popularity)
        }
        if (this.state.selected != 0) {
            this.setState({ currentQuestion: this.state.currentQuestion + 1, selected: 0 })
        }

    }

    createPlaylist = async () => {
        console.log("hey matenme");

        console.log("E " + this.state.target_energy);
        console.log("D " + this.state.target_danceability);
        console.log("P " + this.state.target_popularity);
        console.log("M " + this.state.target_valence);

        this.setState({
            playlistRequested: true
        })


        await fetch(process.env.REACT_APP_ENDPOINT + "/createplaylist?" +
            queryString.stringify({
                target_energy: this.state.target_energy,
                target_danceability: this.state.target_danceability,
                target_valence: this.state.target_valence,
                target_popularity: this.state.target_popularity,
                access_token: this.state.access_token,
                playlist_name: this.state.playlistName
            })
        ).then((res) => {
            // console.log(res)
            res.json().then((result) => {
                console.log(result);
                this.setState({
                    createdId: result.id
                })
            })
        })
    }

    render() {
        let renderQuestions = questions.map((item, i) => {

            var lowVal = item.lowValue;
            var highVal = item.highValue;
            let scale = [1, 2, 3, 4, 5].map((number, j) => {
                return (
                    <span>
                        <ScrollAnimation animateIn="fadeInLeft" delay={j * 200}>
                            {this.state.selected === j + 1 ?
                                <div className="circle animated fadeIn">
                                    <span className="selected"
                                        style={{ borderColor: item.secondaryColor }}
                                        onClick={() => {
                                            this.setState({ selected: 0, })
                                        }}>
                                        {number}
                                    </span>
                                </div>
                                :

                                <span className="unselected" onClick={() => {
                                    this.setState({ selected: j + 1 })
                                }}>
                                    {number}</span>
                            }
                        </ScrollAnimation>

                        <div className="description">
                            {j === 0 ? lowVal : j === 4 ? highVal : '.'}
                        </div>
                    </span>
                )
            })

            return (
                <div>
                    {this.state.currentQuestion === i ?

                        <div className="question" style={item.style}>
                            <div className="navbar">
                                <Link to="/">
                                    <img src={item.secondaryColor === "#ffabca" ? mendo_pink : mendo_dark}
                                        className="logo" alt="logo" />
                                </Link>
                            </div>
                            <div className="main-section">
                                <span className="category outline"
                                    style={{ WebkitTextStrokeColor: item.secondaryColor }}>
                                    <ScrollAnimation animateIn="fadeInRight">
                                        <span>{item.category}</span>
                                    </ScrollAnimation>
                                    <ScrollAnimation animateIn="fadeInRight">
                                        <span>{item.category}</span>
                                    </ScrollAnimation>
                                    <ScrollAnimation animateIn="fadeInRight">
                                        <span>{item.category}</span>
                                    </ScrollAnimation>
                                </span>
                                <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
                                    <img src={item.graphic} className="question-graphic"></img>
                                </ScrollAnimation>

                                <div className="question-section">

                                    <div className="text-area">
                                        <ScrollAnimation animateIn="fadeInUp">
                                            <h1>{item.question}</h1>
                                        </ScrollAnimation>
                                        <ScrollAnimation animateIn="fadeInUp">
                                            <p>{item.description}</p>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="numbers">
                                        {scale}
                                    </div>


                                </div>
                                <div className="bottom-nav">
                                    {i != 0 ? <button className="back" onClick={this.handleLast}>
                                        <Icon type="left-circle" style={{ color: item.secondaryColor }} />
                                    </button> : <div></div>}
                                    <button className="next" onClick={() => { this.handleNext(item.category) }}>
                                        <Icon type="right-circle" theme="filled" style={{ color: item.secondaryColor }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        : ''}

                </div>
            )
        })

        return (
            <div>
                <div style={{ backgroundColor: "#122a4d" }}>
                    {renderQuestions}
                </div>
                {this.state.currentQuestion >= 4 && !this.state.playlistRequested ?

                    <div className="name-playlist">
                        <div className="navbar">
                            <img src={mendo_pink}
                                className="logo" alt="logo" />
                        </div>
                        <div className="final-section">
                            <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
                                <img src={vr} className="question-graphic"></img>
                            </ScrollAnimation>
                            <div className="input-section">
                                <ScrollAnimation animateIn="fadeInUp" >
                                    <h1>Finally, let's name this masterpiece</h1>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" >
                                    <input placeholder="Mendo's Awesome Mix"
                                        onChange={
                                            (event) => { this.setState({ playlistName: event.target.value }) }}
                                    />
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp" >
                                    <button className="main-bt" onClick={this.createPlaylist}>CREATE</button>
                                </ScrollAnimation>
                            </div>
                        </div>

                    </div>

                    : (this.state.playlistRequested ?
                        (!this.state.createdId ?

                            <div className="creating">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h1>Your next experience is almost ready</h1>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp">
                                    <Icon type="loading" className="loading" spin />
                                </ScrollAnimation>
                            </div>
                            :
                            <PlaylistPage id={this.state.createdId} access_token={this.state.access_token} />
                        ) : '')
                }


            </div>
        );
    }
}

export default Create;


const questions = [
    {
        category: "energy",
        question: "How energetic do you feel?",
        description: "Energetic tracks feel fast, loud and noisy",
        lowValue: "Low",
        highValue: "High",
        graphic: run,
        style: { backgroundColor: "#e33065", color: "white" },
        primaryColor: "#e33065",
        secondaryColor: "white"
    },
    {
        category: "dance",
        question: "How much do you want to dance?",
        description: "Based on tempo, rhythm stability, beat strength, and overall regularity",
        lowValue: "Let's chill",
        highValue: "Let's rock",
        graphic: dance,
        style: { backgroundColor: "#1252c9", color: "#ffabca" },
        primaryColor: "#1252c9",
        secondaryColor: "#ffabca"
    }
    ,
    {
        category: "trendy",
        question: "How trendy do you want your songs?",
        description: "The popularity is based on the total number of plays the track has had and how recent those plays are.",
        lowValue: "Niche af",
        highValue: "Popular",
        graphic: selfie,
        style: { backgroundColor: "#30c8f2", color: "#122a4d" },
        primaryColor: "#30c8f2",
        secondaryColor: "#122a4d"
    },
    {
        category: "mood",
        question: "How's your mood?",
        description: "Songs with high valence tend to have a positive mood, while tracks with low valence sound more negative",
        lowValue: "Negative",
        highValue: "Positive",
        graphic: fireplace,
        style: { backgroundColor: "#FF7BAC", color: "#122a4d" },
        primaryColor: "#FF7BAC",
        secondaryColor: "#122a4d"
    }
]