import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";

//to do its breaking after first calculation

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousInput: "",
      currentInput: "",
      operator: ""
    };
  }

  handleClear = () => {
    this.setState({
      previousInput: "",
      currentInput: "",
      operator: ""
    });
  }

  appendNumber = val => {
    if (this.state.currentInput.toString().includes(".") && val === ".") return
    this.setState({
      currentInput: this.state.currentInput.toString() + val.toString()
    });
  };

  handleOperator = val => {
    if(this.currentInput === "") return

    if(this.state.previousInput !== "") {
      this.handleCompute();
    }

    this.setState({
      previousInput: this.state.currentInput,
      currentInput: "",
      operator: val
    });
  }

  handleCompute = () => {
    
    let computation
    //make sure the elements are in the number form for computation
    const prev = parseFloat(this.state.previousInput)
    const current = parseFloat(this.state.currentInput)
    //if the previous and current values arent present stop the function
    if (isNaN(prev) || isNaN(current)) return
    //switch case to select the rigth operation then make the computation
    switch (this.state.operator) {
      case '/':
        computation = prev / current
        break
      case '*':
        computation = prev * current
        break
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      default:
        return
    }
    //update state
    this.setState({
      previousInput: "",
      currentInput: computation,
      operator: ""
    });
  };

  handleDelete = () =>{
    this.setState({
      currentInput: this.state.currentInput.toString().slice(0, -1)
    });
    ;
  }

  render() {
    
    return (
      
      <div className="app">
        <div className="calc-wrapper">
          <div className="display">
            <Input>
              {/* {this.state.previousInput ? <div> {this.state.previousInput}</div> : null}
              <div> {this.state.currentInput}</div> */}
              <div>{[this.state.previousInput, this.state.operator,this.state.currentInput]}</div>
            </Input>
          </div>
          <div className="row">
            <ClearButton handleClear={this.handleClear}>
              Clear
            </ClearButton>
            <Button handleClick={this.handleDelete}>
              Delete
            </Button>
          </div>
          <div className="row">
            <Button handleClick={this.appendNumber}>7</Button>
            <Button handleClick={this.appendNumber}>8</Button>
            <Button handleClick={this.appendNumber}>9</Button>
            <Button handleClick={this.handleOperator}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.appendNumber}>4</Button>
            <Button handleClick={this.appendNumber}>5</Button>
            <Button handleClick={this.appendNumber}>6</Button>
            <Button handleClick={this.handleOperator}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.appendNumber}>1</Button>
            <Button handleClick={this.appendNumber}>2</Button>
            <Button handleClick={this.appendNumber}>3</Button>
            <Button handleClick={this.handleOperator}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.appendNumber}>.</Button>
            <Button handleClick={this.appendNumber}>0</Button>
            <Button handleClick={() => this.handleCompute()}>=</Button>
            <Button handleClick={this.handleOperator}>-</Button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;