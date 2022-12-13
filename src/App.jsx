import React from "react";
import { Cat } from "./Cat";
import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: undefined,
      loading: false,
      text: "",
      filter: "none",
      isGif: false,
      history: [],
      historyIndex: 0
    };
  }

  async componentDidMount() {
    let history;
    try {
      history = JSON.parse(localStorage.getItem("cat_history"));
    } catch (error) {}
    if (history) {
      this.setState({ history: history });
    }
    await this.refreshCat();
  }

  async refreshCat() {
    this.setState({ error: undefined, loading: true });
    try {
      let url = "https://cataas.com/cat";

      if (this.state.isGif) {
        url += `/gif`;
      }
      if (this.state.text) {
        url += `/says/${this.state.text}`;
      }
      if (this.state.filter !== "none") {
        url += `?filter=${this.state.filter}`;
      }

      const response = await fetch(url);
      const catBlob = await response.blob();
      const cat = URL.createObjectURL(catBlob);

      this.setState({
        error: undefined,
        loading: false,
        history: [cat, ...this.state.history]
      });
      localStorage.setItem("cat_history", JSON.stringify(this.state.history));
    } catch (error) {
      this.setState({ error: error, loading: false });
    }
  }

  render() {
    let content = "";

    if (this.state.loading) {
      content = "Loading...";
    } else if (this.state.error) {
      content = `Error: ${this.state.error}`;
    } else if (
      this.state.historyIndex >= 0 &&
      this.state.historyIndex < this.state.history.length
    ) {
      content = (
        <Cat src={this.state.history[this.state.historyIndex]} size="L" />
      );
    }

    const history = this.state.history.map((item, index) => (
      <Cat
        src={item}
        size="S"
        active={index === this.state.historyIndex}
        onClick={() => this.setState({ historyIndex: index })}
      />
    ));

    return (
      <div>
        <Checkbox
          id="gif"
          checked={this.state.isGif}
          onChange={() => this.setState({ isGif: !this.state.isGif })}
        />
        <Select
          options={[
            "none",
            "blur",
            "mono",
            "sepia",
            "negative",
            "paint",
            "pixel"
          ]}
          onChange={(option) => this.setState({ filter: option })}
        />
        <Input
          id="text"
          value={this.state.text}
          onChange={(text) => this.setState({ text: text })}
        />
        <Button text="Refresh cat" onClick={() => this.refreshCat()} />
        <br />
        {content}
        <br />
        {history}
      </div>
    );
  }
}
