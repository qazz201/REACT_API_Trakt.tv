import React, { Component } from "react";

import GenreFilter from "./GenreFilter/GenreFilter";

class TableHeader extends Component {
  render() {
    var heder = ["№", "Image", "Title", "Genre", "Seasons", "Year", "Country"];
  
    var { sendRequest, showFilter, setShowGenre } = this.props;

    var th = heder.map(elem => {
      if (elem === "Genre") {
        return (
          <th className="tableGenre">
            {/* {elem}&nbsp;*/}
            <GenreFilter
              sendRequest={sendRequest}
              showFilter={showFilter}
              setShowGenre={setShowGenre}
            />
          </th>
        );
      }
      return <th>{elem}</th>;
    });
    return <thead>{th}</thead>;
  }
}

export default TableHeader;
