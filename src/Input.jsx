import React from "react";

export class Input extends React.Component {
  render() {
    return (
      <input
        type="text"
        id={this.props.id}
        name={this.props.id}
        value={this.props.value}
        onChange={(event) => this.props.onChange(event.target.value)}
      />
    );
  }
}
