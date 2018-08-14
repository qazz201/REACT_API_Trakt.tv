import React, { Component } from "react";
import ReactDOM from "react-dom";

import Table from "./Table";
//import TableRow from "./Table/TableRow";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findShowName: "",
      shows: [],
      showId: []
    };
  }

  componentDidMount() {
    this.sendRequest(
      "https://api.trakt.tv/shows/popular?extended=full&page=1&limit=40"
    );
  }

  sendRequest = initialRequest => {
    var header = {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key":
        "78cc10532d459b67e34f0d2ff41daf47df1178cafd5e8885d6dc31dbcafd855c"
    };

    var init = {
      method: "GET",
      headers: header
    };
    /*https://api.trakt.tv/search/show?query=tron*/
    /*http://www.omdbapi.com/?i=tt3896198&apikey=3e1c9722*/
    fetch(initialRequest, init)
      .then(response => response.json())
      .then(res => {
        var showId = [];

        if (this.state.findShowName) {
          showId = res.map(elem => {
            return elem.show.ids.imdb;
          });
          this.getImage(showId);
        }

        this.setState({
          shows: res,
          showId: showId
        });

        // console.log(res)
        return res;
      });
  };

  getImage = showId => {
    console.log(showId, "LLLLL");

    var showOnlyWithImg = showId.filter(removeNullelement => removeNullelement); //Remove null string in array showId

    Promise.all(
      showOnlyWithImg.map(elem => {
        return fetch(`https://www.omdbapi.com/?i=${elem}&apikey=3e1c9722`)
          .then(response => response.json())
          .catch(error => error.message);
      })
    ).then(result => {
      this.setState({
        shows: result
      });
      console.log(this.state.shows, "Promise");
    });
  };

  showName = event => {
    this.setState({
      findShowName: event.target.value.trim()
    });
    //  console.log(event.target.value.trim())
  };

  findShow = () => {
    this.sendRequest(
      `https://api.trakt.tv/search/show?query=${this.state.findShowName}`
    );
    console.log(this.state.findShowName);
  };

  render() {
    return (
      <div>
        <div className="searchInput">
          <input onInput={this.showName} />
          <button onClick={this.findShow}>Find Show</button>
        </div>
        {/* <Search/>*/}

        <Table>
          <Table.Header />

          <Table.Shows shows={this.state.shows} />
        </Table>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
