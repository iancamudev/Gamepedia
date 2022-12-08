import styles from "../styles/card.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Card(props) {
  const [isActive, setIsActive] = useState(false);
  const imgDefault = "https://cdn-icons-png.flaticon.com/512/44/44091.png";
  const dispatch = useDispatch();
  return (
    <div className={styles.div}>
      <div className={styles.divRating}>
        <img
          className={styles.icon}
          src="https://cdn-icons-png.flaticon.com/512/686/686384.png"
        />
        <p className={styles.ratingValue}>{props.rating}</p>
      </div>
      <Link to={`/videogames/${props.id}`}>
        <img
          src={props.img ? props.img : imgDefault}
          onMouseEnter={() => setIsActive((current) => !current)}
          onMouseLeave={() => setIsActive((current) => !current)}
          className={isActive ? styles.imgHover : styles.img}
        />
      </Link>
      <p className={styles.genre}>{props.genres.join(", ")}</p>
      <Link className={styles.Link} to={`/videogames/${props.id}`}>
        <p className={styles.name}>{props.name}</p>
      </Link>
    </div>
  );
}

export default Card;
