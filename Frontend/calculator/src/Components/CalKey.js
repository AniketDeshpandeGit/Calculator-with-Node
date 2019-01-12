import React, { Component } from "react";

class CalKey extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onKeyPressed(this.props.text);
  }

  render() {
    return (
      <button class={this.props.cls} onClick={this.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default CalKey;
