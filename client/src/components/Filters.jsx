import React from "react";
import styles from "../styles/filters.module.css";
import {
  filterByGenre,
  returnBackup,
  getAllFromDb,
  sortDescendent,
  sortAscendent,
  ratingDescendent,
  ratingAscendent,
  applyFilters,
} from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";

const Filters = (props) => {
  const dispatch = useDispatch();
  const [currentFilters, setCurrentFilters] = useState({
    genres: "",
    apiOrDb: "",
    sort: "",
  });

  useEffect(() => {
    if (currentFilters.apiOrDb !== "") {
      if (currentFilters.apiOrDb === "Api") {
        dispatch(returnBackup());
      } else {
        dispatch(getAllFromDb());
      }
      // } else {
      //   dispatch(returnBackup());
    }
    if (currentFilters.genres !== "") {
      dispatch(filterByGenre(currentFilters.genres));
    } else {
      dispatch(returnBackup());
    }
    if (currentFilters.sort !== "") {
      if (currentFilters.sort === "A-Z") {
        dispatch(sortDescendent());
      } else if (currentFilters.sort === "Z-A") {
        dispatch(sortAscendent());
      } else if (currentFilters.sort === "Most rated") {
        dispatch(ratingDescendent());
      } else if (currentFilters.sort === "Lesser rated") {
        dispatch(ratingAscendent());
      }
    } else {
      dispatch(ratingDescendent());
    }
  }, [currentFilters]);

  return (
    <div className={styles.principal}>
      <p className={styles.p}>Filters:</p>
      <div className={styles.actualFilters}>
        {Object.values(currentFilters) &&
          Object.values(currentFilters).map((filtro) => {
            if (filtro !== "")
              return (
                <div
                  className={styles.option}
                  onClick={(e) => {
                    Object.keys(currentFilters).forEach((key) => {
                      if (currentFilters[key] === filtro) {
                        setCurrentFilters({ ...currentFilters, [key]: "" });
                      }
                    });
                  }}
                >
                  <p>{filtro}</p>
                </div>
              );
          })}
      </div>
      <p className={styles.p}>Genres</p>
      <div className={styles.div}>
        {props.genres &&
          props.genres.map((genero) => (
            <button
              className={styles.button}
              onClick={async () => {
                props.setCurrentPage(1);
                setCurrentFilters({ ...currentFilters, genres: genero.name });
                await dispatch(filterByGenre(genero.name));
              }}
            >
              {genero.name}
            </button>
          ))}
      </div>

      <p className={styles.p}>Api/Database</p>
      <div className={styles.div}>
        <button
          className={styles.button}
          onClick={async () => {
            props.setCurrentPage(1);
            setCurrentFilters({ ...currentFilters, apiOrDb: "Api" });
          }}
        >
          Api
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            props.setCurrentPage(1);
            setCurrentFilters({ ...currentFilters, apiOrDb: "Database" });
          }}
        >
          Database
        </button>
      </div>
      <p className={styles.p}>Sort</p>
      <div className={styles.div}>
        <button
          className={styles.button}
          onClick={async () => {
            props.setCurrentPage(1);
            setCurrentFilters({ ...currentFilters, sort: "A-Z" });
          }}
        >
          A-Z
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            props.setCurrentPage(1);
            setCurrentFilters({ ...currentFilters, sort: "Z-A" });
          }}
        >
          Z-A
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            props.setCurrentPage(1);
            setCurrentFilters({ ...currentFilters, sort: "Most rated" });
          }}
        >
          Most rated
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            props.setCurrentPage(1);
            setCurrentFilters({ ...currentFilters, sort: "Lesser rated" });
          }}
        >
          Lesser rated
        </button>
      </div>
      <p
        className={styles.buttonReset}
        onClick={async () => {
          props.setCurrentPage(1);
          setCurrentFilters({
            genres: "",
            apiOrDb: "",
            sort: "",
            rating: "",
          });
          await dispatch(returnBackup());
        }}
      >
        Reset filters
      </p>
    </div>
  );
};

export default Filters;
