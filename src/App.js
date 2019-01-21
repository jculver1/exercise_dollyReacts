import React, { Component } from 'react';
import './App.css';
import data from './data'
import Card from './components/card'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      songs: [],
      title: '',
      quote: '',
      tags: [],
      hasQuote: false
    }
  }

  getRandomIntInclusive = (max) => {
    const min = 0
    max = this.state.songs.length - 1
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  }

  generateQuote = () => {
    // e.preventDefault()
    const randomIndex = this.getRandomIntInclusive(this.state.songs.length - 1)
    const randomSong = this.state.songs[randomIndex]
    this.setState({
      hasQuote: true,
      title: randomSong.title,
      quote: randomSong.quote,
      tags: randomSong.tags 
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/data')
      .then(data => data.json())
      .then(JSONdata => {
        console.log(JSONdata)
        this.setState({
          songs: JSONdata.data.songs
        })
      })
  }

  render() {
    console.log("all the data", data)
    return (
      <div className="container-fluid">
        <div className="row navbar justify-content-end pb-5">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active" href="http://localhost:3001" target="blank">Hit the Route</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:aimee.zawacki@galvanize.com">Say Halo!</a>
            </li>
          </ul>
        </div>
        <div className="row justify-content-center py-5">
          <div className="col-8 text-center">
            <h1 className="pb-2">Hello Dolly!</h1>
            <p className="pb-2">An app for randomly generating bits of Dolly Parton's sea of wisdom.</p>
            <button className="btn btn-danger btn-lg" onClick={this.generateQuote}>Press Me</button>
          </div>
        </div> 
        <div className="row justify-content-center">
          {this.state.hasQuote ? <Card
          title={this.state.title} quote={this.state.quote} tags={this.state.tags}/> : '' }
        </div>
      </div>
    );
  }
}

export default App;
