import "./App.css";
import LandingPage from "./components/LandingPage";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllVideogames, getAllGenres, getPlatforms } from "./redux/actions";
import Detail from "./components/Detail";
import Create from "./components/Create";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideogames())
      .then(() => dispatch(getAllGenres()))
      .then(() => dispatch(getPlatforms()));
  }, []);
  return (
    <div className="App">
      <Route exact path="/" render={() => <LandingPage />} />
      <Route exact path="/home" component={Home} />
      <Route path="/videogames/:id" component={Detail} />
      <Route path="/home/create" component={Create} />
    </div>
  );
}

export default App;
