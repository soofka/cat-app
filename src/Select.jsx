import React from "react";

export class Select extends React.Component {
  render() {
    const options = this.props.options.map((option, id) => (
      <option value={option} key={id}>
        {option}
      </option>
    ));
    return (
      <select onChange={(event) => this.props.onChange(event.target.value)}>
        {options}
      </select>
    );
  }
}
