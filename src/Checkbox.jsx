import React from "react";

export class Checkbox extends React.Component {
  render() {
    return (
      <>
        <label htmlFor={this.props.id}>GIF</label>
        <input
          type="checkbox"
          id={this.props.id}
          name={this.props.id}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </>
    );
  }
}
