import React, { Component } from "react";
import CalKey from "./CalKey";
import axios from "axios";

//Create a Calculator Component

class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      expression: "0"
    };

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onEvaluatePressed = this.onEvaluatePressed.bind(this);
    this.onDeletePressed = this.onDeletePressed.bind(this);
  }

  onKeyPressed(text) {
    this.setState(prev => ({ expression: prev.expression + text }));
  }

  //doEval() {}

  // getEval() {
  //   console.log("Im here");
  //   axios.get("http://localhost:3001/evaluation").then(response => {
  //     //update the state with the response data
  //     console.log(response.data);
  //     this.setState({
  //       expression: response.data
  //     });
  //   });
  // }

  onEvaluatePressed(e) {
    // const result = math.eval(this.state.expression);
    // this.setState({ expression: result.toString() });
    console.log("Expression Before: " + this.state.expression);
    const data = {
      expression: this.state.expression
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data

    console.log("Inside doEval, data: " + data);

    console.log(data);
    axios.post("http://localhost:3001/evaluation", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Expression Evaluated: " + data);
        console.log(response.data);
        this.setState({
          expression: response.data
        });
        //return (window.location.href = "/home");
      }
    });
  }

  onDeletePressed() {
    this.setState(prev => ({
      expression: "0"
    }));
  }

  render() {
    let numberKeys = [];
    for (let i = 0; i < 10; i++) {
      numberKeys.push(
        <CalKey
          text={i}
          cls="btn btn-primary"
          onKeyPressed={this.onKeyPressed}
        />
      );
    }

    return (
      <div>
        <DisplayWindow expression={this.state.expression} />
        <br />
        <br />
        {numberKeys[1]}
        &nbsp;
        {numberKeys[2]}
        &nbsp;
        {numberKeys[3]}
        &nbsp;
        <br />
        <br />
        {numberKeys[4]}
        &nbsp;
        {numberKeys[5]}
        &nbsp;
        {numberKeys[6]}
        &nbsp;
        <br />
        <br />
        {numberKeys[7]}
        &nbsp;
        {numberKeys[8]}
        &nbsp;
        {numberKeys[9]}
        &nbsp;
        <br />
        <br />
        {numberKeys[0]}
        &nbsp;
        <br />
        <br />
        <CalKey
          text="+"
          cls="btn btn-warning"
          onKeyPressed={this.onKeyPressed}
        />
        &nbsp;
        <CalKey
          text="-"
          cls="btn btn-warning"
          onKeyPressed={this.onKeyPressed}
        />
        &nbsp;
        <CalKey
          text="*"
          cls="btn btn-warning"
          onKeyPressed={this.onKeyPressed}
        />
        &nbsp;
        <CalKey
          text="/"
          cls="btn btn-warning"
          onKeyPressed={this.onKeyPressed}
        />
        &nbsp;
        <br />
        <br />
        <CalKey
          text="C"
          cls="btn btn-danger"
          onKeyPressed={this.onDeletePressed}
        />
        &nbsp;
        <button class="btn btn-success" onClick={this.onEvaluatePressed}>
          =
        </button>
        &nbsp;
      </div>
    );
  }
}
//Export The Calculator Component
export default Calculator;

const DisplayWindow = props => (
  <div>
    <br />
    <input type="text" value={props.expression} disabled="true" />
    <br />
  </div>
);
