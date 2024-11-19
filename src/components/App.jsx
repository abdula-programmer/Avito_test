import React, { useEffect } from "react";
// Хуки находятся в react-redux
import { useDispatch } from "react-redux";
import { getNews } from "../slices/newsSlice";
import NewsList from "./newsList";
import styles from "./App.module.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import News from "./news/News";

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
