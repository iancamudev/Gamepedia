import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Card from "./Card";
import { getAllVideogames } from "../redux/actions";
import styles from "../styles/games.module.css";

const Games = (props) => {
  return (
    <div className={styles.body}>
      {!props.videogames.error && props.videogames.length ? (
        props.videogames.map((juego) => {
          return (
            <Card
              name={juego.name}
              genres={juego.genres}
              img={juego.background_image}
              rating={juego.rating}
              key={juego.id}
              id={juego.id}
            />
          );
        })
      ) : (
        <h4>Loading...</h4>
      )}
      {props.videogames.error && <h4>Games not found</h4>}
    </div>
  );
};

export default Games;
