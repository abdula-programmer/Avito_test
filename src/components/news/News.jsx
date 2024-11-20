import React, { useEffect } from "react";
import styles from "./News.module.css";
import { useParams } from "react-router-dom";
import { getActiveNews } from "../../slices/activeNewsSlice";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import Comments from "../comment/Comments";
import { Loader } from "../UI";
import { Link } from "react-router-dom";

const News = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    data: { by: author, kids, time, title, url },
    loading,
    error,
  } = useSelector((state) => state.activeNews);

  

  useEffect(() => {
    dispatch(getActiveNews(id));
  }, [dispatch]);


  const date = formatDate(time);

  return (
    <div className={styles["news"]}>
      <button className={`${styles['back-button']}`}>
        <Link to="/">Back to news</Link>
      </button>

      {loading && <Loader />}
      {!loading && !error && (
        <div>
          <h1 className={styles["news-title"]}>
            <a  className={styles['news-url']} href={url}>{title}</a>
          </h1>
          <div className={styles["news-description"]}>
            <h4 className={styles["author"]}>{author}</h4>
            <h4 className={styles["date"]}>{date}</h4>
          </div>
          {kids && <Comments id={id} />}
        </div>
      )}
    </div>
  );
};

export default News;
