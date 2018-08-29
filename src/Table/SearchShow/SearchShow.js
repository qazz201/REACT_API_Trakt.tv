import React, { Component } from "react";

class SearchShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findShowName: "",
      requestForSearchShow: "https://api.trakt.tv/search/show?query="
    };
  }

  showName = event => {
    this.setState({
      findShowName: event.target.value.trim()
    });

    //  console.log(event.target.value.trim())
  };

  findShow = () => {
    //console.log(this.state.findShowName);
    this.state.findShowName &&
      this.props.sendRequest(
        `${this.state.requestForSearchShow}${
          this.state.findShowName
        }&extended=full`
      );
  };

  render() {
    return (
      <div className="searchInput">
        <input
          type="search"
          className="searchShowInput  browser-default"
          onInput={this.showName}
          placeholder="Find your Show"
        />
        <button
          className="searchButton browser-default"
          onClick={this.findShow}
        >
          <svg>
            <use href="#search" />
          </svg>
        </button>
      </div>
    );
  }
}

export default SearchShow;
