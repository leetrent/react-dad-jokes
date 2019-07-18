import React, { Component } from 'react'
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import "./JokeList.css";

export default class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        //this.state = { jokes: [] };
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
          };
    }
    componentDidMount() {
        console.log("[JokeList][componentDidMount] => this.state.jokes.length: ", this.state.jokes.length);
        if ( this.state.jokes.length === 0 ) {
            this.getJokes();
        }
    }
    async getJokes() {
        console.log("[JokeList][getJokes][BEGIN] => this.state.jokes.length: ", this.state.jokes.length);
        let tempJokes = [];
        while ( tempJokes.length < this.props.numJokesToGet ) {
            let response = await axios.get("https://icanhazdadjoke.com", {
                headers: {Accept: "application/json"}
            });
            tempJokes.push({
                id: uuid(),
                text: response.data.joke,
                votes: 0 
            });
        }
        console.log("[JokeList][getJokes] => # of retrieved jokes: ", tempJokes.length);
        this.setState( {jokes: tempJokes} );
        window.localStorage.setItem("jokes", JSON.stringify(tempJokes));
        console.log("[JokeList][getJokes][END] => this.state.jokes.length: ", this.state.jokes.length);
    }
    handleVote(id, delta) {
        this.setState(st => ({
                jokes: st.jokes.map(j => 
                    j.id === id ? {...j, votes: j.votes + delta} : j
                )
            }));
    }
    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="Smiley Face" />
                    <button className="JokeList-getmore">New Jokes</button>
                </div> 
                <div className="JokeList-jokes">
                    { this.state.jokes.map(j => (
                        <Joke 
                            key={j.id}
                            votes={j.votes}
                            text={j.text}
                            upVote={ () => this.handleVote(j.id, 1) }
                            downVote={ () => this.handleVote(j.id, -1) }
                        />
                    ))}
                </div>
            </div>
        )
    }
}
