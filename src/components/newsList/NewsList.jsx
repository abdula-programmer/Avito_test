import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../newsItem";
import styles from "./NewList.module.css";
import { getNews } from "../../slices/newsSlice";
import { clearNewsState } from "../../slices/activeNewsSlice";
import Loader from "../UI/Loader";

const NewsList = () => {
  const [intervalId, setIntervalId] = useState(null);
  const { data, loading, error } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNewsState());
    const interval = loadData();

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const loadData = () => {
    // Очищаем текущий интервал, если он существует
    if (intervalId) {
      clearInterval(intervalId);
    }

    dispatch(getNews());
    const newInterval = setInterval(() => {
      dispatch(getNews());
    }, 60000);

    setIntervalId(newInterval);
    return newInterval;
  };

  const updateData = () => {
    loadData();
  };

  return (
    <div className={styles["news-list-container"]}>
      <div className={styles['header']}>
        <h1 className={styles["news-list__header"]}>Новости</h1>
        <button className={styles['update-btn']} onClick={updateData}>Обновить</button>
      </div>

      {loading && <Loader/>}

      <ul className={styles["news-list"]}>
        {data.map(({ title, score, id, time, by }) => (
          <NewsItem
            title={title}
            score={score}
            id={id}
            key={id}
            time={time}
            author={by}
          />
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
