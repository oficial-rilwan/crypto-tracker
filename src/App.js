import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoinPage from "./pages/CoinPage";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/coins/:id" component={CoinPage} />
      </Switch>
    </Router>
  );
};

export default App;
