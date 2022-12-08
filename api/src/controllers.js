const { Model } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { KEY } = process.env;
const { Videogame, Genre } = require("./db");

const findVideoGames = async () => {
  const call = await axios
    .get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40`)
    .then((response) => response.data)
    .then((response) => response.results);
  const call2 = await axios
    .get(`https://api.rawg.io/api/games?key=${KEY}&page=2&page_size=40`)
    .then((response) => response.data)
    .then((response) => response.results);
  const call3 = await axios
    .get(`https://api.rawg.io/api/games?key=${KEY}&page=3&page_size=40`)
    .then((response) => response.data)
    .then((response) => response.results);
  let array = [];
  call.forEach((juego) =>
    array.push({
      id: juego.id,
      name: juego.name,
      rating: juego.rating,
      background_image: juego.background_image,
      genres: juego.genres.map((genero) => genero.name),
      platforms: juego.platforms.map((plataforma) => plataforma.platform.name),
    })
  );
  call2.forEach((juego) =>
    array.push({
      id: juego.id,
      name: juego.name,
      rating: juego.rating,
      background_image: juego.background_image,
      genres: juego.genres.map((genero) => genero.name),
      platforms: juego.platforms.map((plataforma) => plataforma.platform.name),
    })
  );
  call3.forEach((juego) =>
    array.push({
      id: juego.id,
      name: juego.name,
      rating: juego.rating,
      background_image: juego.background_image,
      genres: juego.genres.map((genero) => genero.name),
      platforms: juego.platforms.map((plataforma) => plataforma.platform.name),
    })
  );
  return array;
};

const findVideoGamesByName = async (call) => {
  let array = [];
  for (let i = 0; i < 15; i++) {
    let juego = call[i];
    array.push({
      id: juego.id,
      name: juego.name,
      rating: juego.rating,
      background_image: juego.background_image,
      genres: juego.genres.map((genero) => genero.name),
    });
  }
  return array;
};

const loadGenres = async () => {
  try {
    const call = await axios
      .get(`https://api.rawg.io/api/genres?key=${KEY}`)
      .then((response) => response.data)
      .then((response) => response.results);

    const genresFromApi = call.map((generos) => ({
      name: generos.name,
    }));
    const promises = genresFromApi.map(async (genre) => {
      await Genre.findOrCreate({ where: { name: genre.name } });
    });
    await Promise.all(promises);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  findVideoGames,
  findVideoGamesByName,
  loadGenres,
};
