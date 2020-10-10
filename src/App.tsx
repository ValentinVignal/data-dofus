import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <Header />
            <h1>Data Dofus</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
