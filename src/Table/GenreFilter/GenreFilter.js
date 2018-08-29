import React, { Component } from "react";

class GenreFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: "&genres=action",
      comedy: "&genres=comedy",
      drama: "&genres=drama",
      crime: "&genres=crime",
      fantasy: "&genres=fantasy",
      adventure: "&genres=adventure",
      thriller: "&genres=thriller",
      mystery: "&genres=mystery",
      horror: "&genres=horror",
      selectedElement: ""
    };
  }

  filterHrefs = event => {
    this.props.sendRequest(event.currentTarget.value);

    this.props.setShowGenre(
      event.currentTarget[event.currentTarget.selectedIndex].innerText
    );
  };

  render() {
    var hrefForGenre = this.props.showFilter;
    console.log(this.props.showFilter, "FROM GENRE FILTER");

    return (
      <select className="GenreFilter" onInput={this.filterHrefs}>
        <option value="" disabled selected>
          Choose Genre
        </option>
        <option value={`${hrefForGenre}${this.state.action}`}>Action</option>
        <option value={`${hrefForGenre}${this.state.comedy}`}>Comedy</option>
        <option value={`${hrefForGenre}${this.state.drama}`}>Drama</option>
        <option value={`${hrefForGenre}${this.state.crime}`}>Crime</option>
        <option value={`${hrefForGenre}${this.state.fantasy}`}>Fantasy</option>
        <option value={`${hrefForGenre}${this.state.adventure}`}>
          Adventure
        </option>
        <option value={`${hrefForGenre}${this.state.thriller}`}>
          Thriller
        </option>
        <option value={`${hrefForGenre}${this.state.mystery}`}>Mystery</option>
        <option value={`${hrefForGenre}${this.state.horror}`}>Horror</option>
      </select>
    );
  }
}

export default GenreFilter;
