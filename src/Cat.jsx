import React from "react";

export class Cat extends React.Component {
  render() {
    return this.props.src && this.props.src.length > 0 ? (
      <img
        src={this.props.src}
        onClick={this.props.onClick}
        style={{
          border: `${this.props.active ? "1" : "0"}px solid red`,
          width: `${this.props.size === "S" ? "25%" : "100%"}`
        }}
        alt="cat"
      />
    ) : (
      ""
    );
  }
}
