import React from "react";
import { useDispatch } from "react-redux";

import {
  filterByGenre,
  returnBackup,
  getAllFromDb,
  sortDescendent,
  sortAscendent,
  ratingDescendent,
  ratingAscendent,
} from "../redux/actions";

const Filter = (props) => {
  const dispatch = useDispatch();

  return (
    <li
      onClick={async () => {
        props.setCurrentPage(1);
        await dispatch(returnBackup());
      }}
    >
      {props.name}
    </li>
  );
};

export default Filter;
