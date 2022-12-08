import React from "react";
import styles from "../styles/pagination.module.css";
import { useState } from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let menor = "<";
  let mayor = ">";
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.principal}>
      {currentPage - 1 >= 1 ? (
        <i
          className={styles.leftArrow}
          onClick={() => setCurrentPage(currentPage - 1)}
        ></i>
      ) : (
        <></>
      )}

      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? styles.active : styles.button}
          >
            {page}
          </button>
        );
      })}
      {currentPage + 1 <= pages.length ? (
        <i
          className={styles.rightArrow}
          onClick={() => setCurrentPage(currentPage + 1)}
        ></i>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pagination;
