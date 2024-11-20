import React from "react";
import NewsList from "./newsList";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import News from "./news";

const App = () => {
  return (
    <div className={styles["app"]}>
      <Switch>
        <Route exact path="/:id" component={News} />
        <Route exact path="/" component={NewsList} />
      </Switch>
    </div>
  );
};

export default App;
