import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import Header from "./components/Header";
import Contribution from "./pages/Contribution";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header
        title="hangman game"
        fb="https://fb.com/le.van.nam.192"
        github="https://github.com/namxg6626"
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contribution" component={Contribution} />
      </Switch>
    </div>
  );
}

export default App;
