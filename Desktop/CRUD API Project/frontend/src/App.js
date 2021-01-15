import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ShowAll from "./components/showAll"
import Add from "./components/add"
import Update from "./components/update"
import "./App.css";
import "./styles/mystyle.module.css"

const App = () => {
  
  return (
    
    <div>
      <Router>
        <u1>
        <li>
          <a href="/">
            Dimosthenis Kokkonos
          </a>
          </li>
          <div>
            <li >
              <a href={"/SelectAll"} >
                Select All
              </a>
            </li>
            <li>
              <a href={"/Add"}>
                Add an entry
              </a>
            </li>
            <li>
              <a href={"/Update"}>
                Update an entry
              </a>
            </li>
          </div>
        </u1>

        <div>
          <Switch>
            <Route exact path="/SelectAll" component={ ShowAll }/>
            <Route exact path="/Add" component={ Add } />
            <Route exact path="/Update" component={ Update } />
          </Switch>
        </div>
      </Router>

    </div>
  );
};

export default App;