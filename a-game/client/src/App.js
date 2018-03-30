import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "bloodborne",
      walmart: [],
      igdb: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getGames = this.getGames.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  getGames() {
    axios.get('/api/games/' + this.state.search)
      .then(response => {
        // map over this response
        // for each response title, look u in walmart, if there's aprice, add it to the new object
        // then set state with new object, which should have the prices now
          


        this.setState({
          igdb: response.data
        })
      })
      .catch(error => console.log(error.response))

    axios.get('api/walmart/' + this.state.search)
      .then(response => {
        this.setState({
          walmart: response.data.items.filter(item => !!item.categoryPath.match(/video game/gi))
        })

    })
    .catch(error => console.log(error.response))
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">A-Game</h1>
          <h5 className="App-subtitle">How cool &amp; How much?</h5>
          <hr />
        </header>
        <div className="container">
          <div className="row col-lg-10 col-md-10 col-sm-14">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  name="search"
                  type="text"
                  value={this.state.search}
                  onChange={this.handleChange}
                />

                <button className="btn btn-lg btn-dark" onClick={this.getGames}>
                  SEARCH
                </button>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-8">
              {this.state.igdb.map(igdb => (
                <ul className="igdb" key={igdb.id}>
                  <img
                    src={
                      igdb.cover
                        ? igdb.cover.url
                        : "http://via.placeholder.com/100/100"
                    }
                  />
                  <li name="name">{igdb.name}</li>
                  <li name="rating">
                    SCORE:{igdb.rating ? igdb.rating : "N/A"}
                  </li>
                </ul>
              ))}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-8">
              {this.state.walmart.map(walmart => (
                <ul className="walmart" key={walmart.itemId}>
                  {walmart.msrp && <li>{walmart.msrp}</li>}
                  {!walmart.msrp && <li>N/A</li>}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
