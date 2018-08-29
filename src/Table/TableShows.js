import React, { Component } from "react";

import Table from "./Table";
import TableHeader from "./TableHeader";

class TableShows extends Component {
  style = { width: 300, height: 430, position: "relative" };

  render() {
    var { shows, showsImg } = this.props;

    console.log(shows, "SHOWS");

    var row = shows.map((elem, key) => {
      var showCounter = key,
        kindOfImg = showsImg[key] ? (
          <img
            src={showsImg[key]}
            alt={elem.title}
            className="showPoster"
            style={{ width: 300, position: "relative" }}
          />
        ) : (
          <img
            src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-343406.jpg"
            style={this.style}
            alt={elem.title}
            className="showPoster"
          />
        ),
        showOverview = elem.overview || elem.show.overview,
        showTitle = elem.title || elem.show.title,
        showRating = (elem.rating || elem.show.rating).toFixed(1),
        showGenres = (elem.genres || elem.show.genres).join(", "),
        showEpisodes = elem.aired_episodes || elem.show.aired_episodes,
        showYear = elem.year || elem.show.year,
        showCountry = elem.country || elem.show.country;

      return (
        <tr key={key} className="tableRow">
          <td>{++showCounter}</td>
          <td className="imgContainer" style={this.style}>
            {kindOfImg}
            <div className="showPlot">
              <p>{showOverview}</p>
            </div>
          </td>

          <td style={{ padding: 10 }}>
            <h1>{showTitle}</h1>
            <div className="rating">
              Rating:&nbsp;
              <span>{showRating}</span>
            </div>
          </td>

          <td>
            <p style={{ textTransform: "uppercase" }}>{showGenres}</p>
          </td>
          <td>{showEpisodes}</td>
          <td>{showYear}</td>
          <td style={{ textTransform: "uppercase" }}>{showCountry}</td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <tbody>
          {/*  <TableHeader/>*/}
          {row}
        </tbody>
      </React.Fragment>
    );
  }
}

export default TableShows;
