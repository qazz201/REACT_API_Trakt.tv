import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    var heder = [
      "№",
      "Image",
      "Title",
      "Genre",
      "Seasons",
      "Year",
      "Country",
      "Trailer"
    ];

    return heder.map(elem => {
      return <th>{elem}</th>;
    });
  }
}

export default TableHeader;
