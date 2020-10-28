import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Favicon from "react-favicon";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import OurTeam from "./components/OurTeam";

function App() {
  return (
    <div className="app">
      <Favicon url="https://www.dafont.com/forum/attach/orig/2/4/24836.png" />

      <Helmet>
        <title>Data Dofus</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.dafont.com/forum/attach/orig/2/4/24836.png"
          sizes="16x16"
        />
      </Helmet>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/our-team">
              <OurTeam/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
