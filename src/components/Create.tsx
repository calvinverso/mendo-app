import React from 'react';
//import queryString from 'query-string';
import ScrollAnimation from 'react-animate-on-scroll';

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



interface Props { }

interface State {
    selected: number,
    currentQuestion: number,

    target_energy: number,
    target_danceability: number,
    target_popularity: number,
    target_valence: number

};

let parameters = []


class Create extends React.Component<Props, State> {

    state: State = {
        selected: 0,
        currentQuestion: 0,

        target_energy: 5,
        target_danceability: 5,
        target_popularity: 5,
        target_valence: 5

    };
    componentDidMount() {
        // this.getInfo();
        //console.log(this.state.userData)
    }
    handleLogin() {
        console.log(process.env.REACT_APP_ENDPOINT)
        window.location.href = process.env.REACT_APP_ENDPOINT + "/login";
    }

    handleNext = category => {

        if (category === "energy") {
            this.setState({
                target_energy: this.state.selected * 2
            })
            console.log(this.state.target_energy)
        } else if (category === "dance") {
            this.setState({
                target_danceability: this.state.selected * 2
            })
            console.log(this.state.target_danceability)
        } else if (category === "mood") {
            this.setState({
                target_valence: this.state.selected * 2
            })
            console.log(this.state.target_valence)
        } else if (category === "trendy") {
            this.setState({
                target_popularity: this.state.selected * 2
            })
            console.log(this.state.target_popularity)
        }
        if (this.state.selected != 0) {
            this.setState({ currentQuestion: this.state.currentQuestion + 1, selected: 0 })
        }

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
                            {j === 0 ? lowVal : j === 4 ? highVal : ''}
                        </div>
                    </span>
                )
            })

            return (
                <div>
                    {this.state.currentQuestion === i ?
                        <div className="question" style={item.style}>
                            <div className="navbar">
                                <img src={mendo_dark} className="logo" alt="logo" />
                            </div>
                            <div className="main-section">
                                <span className="category outline"
                                    style={{ WebkitTextStrokeColor: item.secondaryColor }}>
                                    <ScrollAnimation animateIn="fadeIn">
                                        {item.category}
                                    </ScrollAnimation>
                                </span>
                                <ScrollAnimation animateIn="fadeInLeft">
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
                                    <button onClick={this.handleNext}>Next</button>
                                </div>
                            </div>
                        </div> : ''}

                </div>
            )
        })

        return (
            <div>{renderQuestions}</div>
        );
    }
}

export default Create;


const questions = [
    {
        category: "energy",
        question: "How energetic do you feel?",
        description: "Energetic tracks feel fast, loud and noisy",
        lowValue: "Low energy",
        highValue: "High energy",
        graphic: run,
        style: { backgroundColor: "#e33065", color: "white" },
        primaryColor: "#e33065",
        secondaryColor: "white"
    },
    {
        category: "dance",
        question: "How much do you want to dance?",
        description: "Based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity",
        lowValue: "Let's chill",
        highValue: "I wanna rock",
        graphic: dance,
        style: { backgroundColor: "#1252c9", color: "#ffabca" },
        primaryColor: "#1252c9",
        secondaryColor: "#ffabca"
    }
    ,
    {
        category: "trendy",
        question: "How trendy do you want your songs?",
        description: "Based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity",
        lowValue: "Niche af",
        highValue: "Radio popular",
        graphic: drinks,
        style: { backgroundColor: "#30c8f2", color: "#122a4d" },
        primaryColor: "#30c8f2",
        secondaryColor: "#122a4d"
    },
    {
        category: "mood",
        question: "How's your mood?",
        description: "Based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity",
        lowValue: "Negative",
        highValue: "Positive",
        graphic: fireplace,
        style: { backgroundColor: "#FF7BAC", color: "#122a4d" },
        primaryColor: "#FF7BAC",
        secondaryColor: "#122a4d"
    }
]