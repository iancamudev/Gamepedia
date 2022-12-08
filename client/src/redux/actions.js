import axios from "axios";

const BACKEND_HOST = process.env.REACT_APP_BACKEND;

//Los types:
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const RETURN_BACKUP = "RETURN_BACKUP";
export const GET_ALL_FROM_DB = "GET_ALL_FROM_DB";
export const SORT_DESCENDENT = "SORT_DESCENDENT";
export const SORT_ASCENDENT = "SORT_ASCENDENT";
export const RATING_ASCENDENT = "RATING_ASCENDENT";
export const RATING_DESCENDENT = "RATING_DESCENDENT";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const DELETE_VIDEOGAME = "DELETE";
export const RESET_VIDEOGAME = "RESET_VIDEOGAME";
//Actions:
export const getVideogames = () => {
  return { type: GET_ALL_VIDEOGAMES };
};

export const getAllVideogames = () => (dispatch) => {
  return fetch(`${BACKEND_HOST}/videogames`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: data }));
};

export const getAllGenres = () => (dispatch) => {
  return fetch(`${BACKEND_HOST}/genres`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_ALL_GENRES, payload: data }));
};

export const filterByGenre = (genero) => {
  return { type: FILTER_BY_GENRE, payload: genero };
};

export const returnBackup = () => {
  return { type: RETURN_BACKUP };
};

export const getAllFromDb = () => (dispatch) => {
  return fetch(`${BACKEND_HOST}/videogamesDb`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_ALL_FROM_DB, payload: data }));
};

export const sortDescendent = () => {
  return { type: SORT_DESCENDENT };
};
export const sortAscendent = () => {
  return { type: SORT_ASCENDENT };
};
export const ratingDescendent = () => {
  return { type: RATING_DESCENDENT };
};
export const ratingAscendent = () => {
  return { type: RATING_ASCENDENT };
};

export const getVideoGameByName = (name) => (dispatch) => {
  return fetch(`${BACKEND_HOST}/videogames?name=${name}`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_VIDEOGAME_BY_NAME, payload: data }));
};

export const getVideoGameById = (id) => (dispatch) => {
  return fetch(`${BACKEND_HOST}/videogames/${id}`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_VIDEOGAME_BY_ID, payload: data }));
};

export const getPlatforms = () => {
  return { type: GET_PLATFORMS };
};

export const postVideogame = (objeto) => (dispatch) => {
  return axios
    .post(`${BACKEND_HOST}/videogames`, objeto)
    .then((data) => dispatch({ type: POST_VIDEOGAME, payload: data }))
    .catch((error) => console.log(error));
};

// export const applyFilters = (objFiltros) => {
//   if (objFiltros.apiOrDb !== "") {
//     objFiltros.apiOrDb === "Api" ? getAllFromDb() : getVideogames();
//   }
//   if (objFiltros.genres !== "") {
//     filterByGenre(objFiltros.genres);
//   }
//   if (objFiltros.sort !== "") {
//     switch (objFiltros.sort) {
//       case "A-Z":
//         sortDescendent();
//         break;
//       case "Z-A":
//         sortAscendent();
//         break;
//       default:
//         console.log("No hizo ningun sort");
//     }
//   }
//   if (objFiltros.rating !== "") {
//     objFiltros.rating === "Most rated" ? ratingDescendent() : ratingAscendent();
//   }
//};

export const deleteVideoGame = (id) => (dispatch) => {
  return axios
    .delete(`${BACKEND_HOST}/${id}`)
    .then((data) => dispatch({ type: DELETE_VIDEOGAME, payload: data }));
};

export const resetVideogame = () => {
  return {
    type: RESET_VIDEOGAME,
  };
};
