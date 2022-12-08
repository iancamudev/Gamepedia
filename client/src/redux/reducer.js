import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENRES,
  FILTER_BY_GENRE,
  GET_VIDEOGAMES,
  RETURN_BACKUP,
  GET_ALL_FROM_DB,
  SORT_DESCENDENT,
  SORT_ASCENDENT,
  RATING_ASCENDENT,
  RATING_DESCENDENT,
  GET_VIDEOGAME_BY_NAME,
  GET_VIDEOGAME_BY_ID,
  GET_PLATFORMS,
  POST_VIDEOGAME,
  APPLY_FILTERS,
  RESET_VIDEOGAME,
} from "./actions";
// Importa las actions types que necesites acá:
import { descendent, ascendent, ratingAsc, ratingDesc } from "./functions";

const initialState = {
  videogames: [],
  filtered: [],
  videogamesBackup: [],
  videogame: {},
  genres: [],
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        videogamesBackup: action.payload,
      };
    case GET_ALL_GENRES:
      return { ...state, genres: action.payload };
    case FILTER_BY_GENRE:
      return {
        ...state,
        videogames: state.videogames.filter((juego) =>
          juego.genres.includes(action.payload)
        ),
      };
    case RETURN_BACKUP:
      return {
        ...state,
        videogames: state.videogamesBackup,
      };
    case GET_VIDEOGAMES:
      return {
        ...state,
      };
    case GET_ALL_FROM_DB:
      return {
        ...state,
        videogames: action.payload,
      };
    case SORT_DESCENDENT:
      return {
        ...state,
        videogames: descendent(state.videogames),
      };
    case SORT_ASCENDENT:
      return {
        ...state,
        videogames: ascendent(state.videogames),
      };
    case RATING_ASCENDENT:
      return {
        ...state,
        videogames: ratingAsc(state.videogames),
      };
    case RATING_DESCENDENT:
      return {
        ...state,
        videogames: ratingDesc(state.videogames),
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        videogame: action.payload,
      };
    case GET_PLATFORMS:
      let array = [];
      state.videogames.forEach((videogame) =>
        videogame.platforms.forEach((plataforma) => array.push(plataforma))
      );
      let mySet = new Set(array);
      let arrayPlatforms = Array.from(mySet);
      return {
        ...state,
        platforms: arrayPlatforms,
      };
    case POST_VIDEOGAME:
      return { ...state, videogames: [...state.videogames, action.payload] };
    case RESET_VIDEOGAME:
      return { ...state, videogame: {} };

    default:
      return { ...state };
  }
};

export default rootReducer;
