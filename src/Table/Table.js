import React, { Component } from "react";

class Table extends Component {
  render() {
    // console.log(this.props.children);
    return (
      <div>
        <table className="table">{this.props.children}</table>
      </div>
    );
  }
}

export default Table;
