import React, { Component } from 'react'
import axios from 'axios';
import "./JokeList.css";

export default class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = { jokes: [] };
    }
    async componentDidMount() {
        // Load Jokes
        let tempJokes = [];
        while ( tempJokes.length < this.props.numJokesToGet ) {
            let response = await axios.get("https://icanhazdadjoke.com", {
                headers: {Accept: "application/json"}
            });
            tempJokes.push(response.data.joke);
        }
        console.log(tempJokes);
        this.setState( {jokes: tempJokes} );
    }
    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className="JokeList-getmore">New Jokes</button>
                </div> 
                <div className="JokeList-jokes">
                    { this.state.jokes.map(j => (
                        <div>{j}</div>
                    ))}
                </div>
            </div>
        )
    }
}
