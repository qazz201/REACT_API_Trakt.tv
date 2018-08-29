import React, { Component } from "react";

import Pagination from "../Pagination/Pagination.js";

class ShowFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular:
        "https://api.trakt.tv/shows/popular?extended=full&page=1&limit=10",

      trending:
        "https://api.trakt.tv/shows/trending?extended=full&page=1&limit=10",
      played:
        "https://api.trakt.tv/shows/played/weekly?extended=full&page=1&limit=10",
      watched:
        "https://api.trakt.tv/shows/watched/all?extended=full&page=1&limit=10",
      anticipated:
        "https://api.trakt.tv/shows/anticipated?extended=full&page=1&limit=10"
    };
  }

  filterHrefs = event => {
    this.props.sendRequest(event.target.value);
  };

  render() {
    var sendRequest = this.props.sendRequest;

    return (
      <select className="showFilter" onInput={this.filterHrefs}>
        <option value="" disabled selected>
          Choose show type
        </option>
        <option value={this.state.popular}>Most popular</option>
        <option value={this.state.trending}>Most trending</option>
        <option value={this.state.played}>Most played</option>
        <option value={this.state.watched}>Most watched</option>
        <option value={this.state.anticipated}>Most anticipated</option>
      </select>
    );
  }
}

export default ShowFilter;
