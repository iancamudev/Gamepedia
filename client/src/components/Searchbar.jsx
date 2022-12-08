import React from "react";
import styles from "../styles/searchbar.module.css";
import { useDispatch } from "react-redux";
import { getVideoGameByName } from "../redux/actions";
import { useState } from "react";

const Searchbar = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getVideoGameByName(name));
    props.setCurrentPage(1);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Search by name..."
        type="text"
        onChange={handleChange}
        value={name}
      />
      <input className={styles.invisible} type="submit" />
    </form>
  );
};

export default Searchbar;
