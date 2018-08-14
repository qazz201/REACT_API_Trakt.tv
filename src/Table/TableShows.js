import React, { Component } from "react";

import Table from "./Table";

import TableHeader from "./TableHeader";

class TableShows extends Component {
  render() {
    //console.log(this.props.shows);

    var row = this.props.shows.map((elem, key) => {
      return (
        <tr key={key} className="tableRow">
          <td>{++key}</td>
          <td>
            {elem.Poster != "N/A" ? (
              <img src={elem.Poster} alt={elem.Title} className="showPoster" />
            ) : (
              <img
                src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-343406.jpg"
                width="300"
                height="300"
                alt={elem.Title}
                className="showPoster"
              />
            )}
          </td>
          <td>{elem.Title} </td>
          <td>
            <p>{elem.Genre}</p>
          </td>
          <td>{elem.totalSeasons}</td>
          <td>{elem.Year}</td>
          <td>{elem.Country}</td>
          <td>{elem.trailer}</td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <tbody>
          {/*  <TableHeader/>*/}
          {row ? row : "LOAD///"}
        </tbody>
      </React.Fragment>
    );
  }
}

export default TableShows;
