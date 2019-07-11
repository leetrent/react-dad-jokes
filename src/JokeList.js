import React, { Component } from 'react'
import axios from 'axios';

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
                <h1>Dad Jokes</h1>
                <div className="JokeList-jokes">
                    { this.state.jokes.map(j => (
                        <div>{j}</div>
                    ))}
                </div>
            </div>
        )
    }
}
