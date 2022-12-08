import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGameById, resetVideogame } from "../redux/actions";
import styles from "../styles/detail.module.css";
import { Link } from "react-router-dom";

const Detail = (props) => {
  const dispatch = useDispatch();

  const { id } = props.match.params;
  useEffect(() => {
    dispatch(getVideoGameById(id));
  }, []);

  const videogame = useSelector((state) => state.videogame);

  return (
    <div className={styles.body}>
      <div className={styles.div}>
        {Object.keys(videogame).length > 0 ? (
          <>
            <div className={styles.contenedor}>
              <Link to="/home">
                <button
                  className={styles.back}
                  onClick={() => dispatch(resetVideogame())}
                ></button>
              </Link>
              <img className={styles.img} src={videogame.background_image} />
              <div className={styles.specs}>
                <h3>{videogame.name}</h3>

                <span className={styles.rocket}>{videogame.released}</span>

                <span className={styles.platforms}>
                  {videogame.platforms.join(", ")}
                </span>
                <span className={styles.list}>
                  {videogame.genres.join(", ")}
                </span>
              </div>
            </div>
            <p className={styles.description}>{videogame.description}</p>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Detail;
