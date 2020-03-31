import React, { Component } from "react";

const AppContext = React.createContext();

class ContextProvider extends Component {
  state = {
    wrongAnswers: 0,
    whichWrongKey: [], // keyCode array
    pass: 0
  };

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const ContextConsumer = AppContext.Consumer;

export { ContextProvider, ContextConsumer, AppContext };
