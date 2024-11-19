import React from "react";
import styles from "./NewsItem.module.css";
import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";

const NewsItem = ({ title, score, id, time, author }) => {
  const date = formatDate(time);

  return (
    <Link className={styles['link']} to={`/${id}`}>
      <li className={styles["news-item"]} key={id}>
        <div className={styles["lft-data"]}>
          <h5 className={styles["author"]}>{author}</h5>
          <h3 className={styles["title"]}>{title}</h3>
        </div>

        <div className={styles["rgth-data"]}>
          <span className={styles["score"]}>Счет: {score}</span>
          <span className={styles["date"]}>{date}</span>
        </div>
      </li>
    </Link>
  );
};

export default NewsItem;
