import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

import Table from "./Table";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRequest:
        "https://api.trakt.tv/shows/popular?extended=full&page=1&limit=10",

      apiKeyImage: "8d1f23e693489e22109871c84cd01437",
      shows: ["initLength"],
      showsImg: [],
      pageCount: "",
      showGenre: "",
      imgLoading: true
    };
  }

  componentWillMount() {
    this.sendRequest(this.state.initialRequest);
  }
  setShowGenre = genre => {
    this.setState({ showGenre: genre });
  };

  /*---------------------------GET_DATA_START----------------------------------------------------*/

  sendRequest = initialRequest => {
    this.setState(nextState => {
      if (nextState.initialRequest !== initialRequest) {
        return {
          imgLoading: true,
          initialRequest: initialRequest
        };
      }
    });

    var header = {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key":
        "78cc10532d459b67e34f0d2ff41daf47df1178cafd5e8885d6dc31dbcafd855c"
    };

    var requestProps = {
      method: "GET",
      headers: header
    };

    fetch(initialRequest, requestProps)
      .then(response => {
        var responsePageCount = response.headers.get("X-Pagination-Page-Count");
        this.setState({
          pageCount: responsePageCount
        });

        return response.json();
      })
      .then(res => {
        console.log(res, "INITIAL");
        var showId = [];

        showId = res.map(elem => {
          if (elem.thetvdb_id) {
            return elem.thetvdb_id;
          } else if (elem.show) {
            return elem.show.ids.tvdb;
          } else {
            return elem.ids.tvdb;
          }
        });
        console.log(showId, "SHOW ID");

        this.setState(
          {
            shows: res
          },
          this.getImage(showId)
        );

        return res;
      })
      .catch(error => error.message);
  };

  getImage = showId => {
    Promise.all(
      showId.map(elem => {
        return fetch(
          `https://webservice.fanart.tv/v3/tv/${elem}&api_key=${
            this.state.apiKeyImage
          }`
        )
          .then(response => response.json())
          .catch(error => error.message);
      })
    )
      .then(result => {
        console.log(result, "JSON");
        var imgArray = [];

        result.map(elem => {
          var imgExist = elem.tvposter
            ? elem.tvposter[0].url
            : elem.hdclearart
              ? elem.hdclearart[0].url
              : null;

          if (elem.status === "error") return null; //Img not exist..

          return imgArray.push(imgExist);
        });

        this.setState({
          imgLoading: false,
          showsImg: imgArray
        });
        console.log(this.state.shows, "Promise");
      })
      .catch(error => error.message);
  };
  /*---------------------------GET_DATA_End----------------------------------------------------*/

  render() {
    var showFilterHref = this.state.initialRequest.split("&page=")[0];

    console.clear();

    return (
      <div>
        <Table.ShowFilter sendRequest={this.sendRequest} />
        <Table.SearchShow sendRequest={this.sendRequest} />

        {/* -------PAGINATION_SRART--------*/}
        <Table.Pagination
          sendRequest={this.sendRequest}
          showFilter={showFilterHref}
          pageCount={this.state.pageCount}
          showGenre={this.state.showGenre}
        />
        {/* -------PAGINATION_END--------*/}

        {/* -------TABLE_START--------*/}

        {this.state.imgLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <Table>
            <Table.Header
              sendRequest={this.sendRequest}
              showFilter={showFilterHref}
              setShowGenre={this.setShowGenre}
            />

            <Table.Shows
              shows={this.state.shows}
              showsImg={this.state.showsImg}
            />
          </Table>
        )}
        {/* -------TABLE_END--------*/}

        {this.state.shows.length === 0 && (
          <div
            style={{
              left: 0,
              right: 0,
              margin: "auto",
              textAlign: "center"
            }}
          >
            <h1>We have nothing to show you :(</h1>
          </div>
        )}
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
