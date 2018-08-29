import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationPage: 1
    };
  }

  componentWillReceiveProps(futureProps) {
    if (futureProps.showFilter !== this.props.showFilter) {
      this.setState({
        paginationPage: 1
      });
    }
  }

  componentWillUpdate() {
    window.addEventListener("scroll", this.ajaxWhenScroll); //For AJAX Request when scrolling
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.ajaxWhenScroll);
  }

  ajaxWhenScroll = event => {
    var scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    var userScrollHeight =
      window.pageYOffset + document.documentElement.clientHeight;

    if (scrollHeight === userScrollHeight) {
      window.scrollTo(0, 0);
      var pageNumber = this.state.paginationPage;
      this.setState({
        paginationPage: ++pageNumber
      });

      this.pagePagination(null, this.state.paginationPage);
      window.removeEventListener("scroll", this.ajaxWhenScroll);
    }
  };

  pagePagination = (event, pageNumber) => {
    var page = event && event.target.value;

    console.log(page || pageNumber, "FROM PAGIN!!!!!!!!!!!!!!!!!!!");
    // console.log(page, "PAGEEEEE", pageNumber);

    this.props.sendRequest(
      `${this.props.showFilter}&page=${page || pageNumber}&limit=10`
    );

    page &&
      this.setState({
        paginationPage: page
      });
  };

  render() {
    var { pageCount, showGenre } = this.props,
      pageCountStyle = { fontSize: "0.8em", color: "rgba(255, 250, 0, 0.6)" },
      showGenreStyle = {
        fontSize: "1.5em",
        color: "rgba(0, 195, 255, 0.788)",
        borderBottom: "1px solid grey"
      };
    return (
      <div className="pagination">
        <div style={this.inputStyle}>
          <h2>
            You are currently on page{" "}
            {/*<code>{this.state.paginationPage}</code>*/}
            <input
              value={this.state.paginationPage}
              className="inputYourPage"
              type="number"
              min="1"
              placeholder="Page №"
              onChange={this.pagePagination}
            />&nbsp;/
            <code style={pageCountStyle}>{pageCount}</code>
          </h2>
          {showGenre && (
            <h3
              style={{
                textAlign: "right",
                color: "rgba(209, 214, 214, 0.788)"
              }}
            >
              you have chosen genre:{" "}
              <code style={showGenreStyle}> "{showGenre}"</code>
            </h3>
          )}
        </div>
        {/* <div className="buttonGroup">{countPaginationPages}</div> //This is for Pagination with buttons*/}
      </div>
    );
  }
}

export default Pagination;
