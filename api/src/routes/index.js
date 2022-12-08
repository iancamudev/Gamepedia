const { Router } = require("express");
require("dotenv").config();
const { KEY } = process.env;
const axios = require("axios");
const {
  findVideoGames,
  findVideoGamesByName,
  modifyGenres,
} = require("../controllers");
const { Videogame, Genre } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/videogames", async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      const call = await axios
        .get(`https://api.rawg.io/api/games?search=${name}?&key=${KEY}`)
        .then((response) => response.data)
        .then((response) => response.results);
      return res.status(200).send(await findVideoGamesByName(call));
    } else {
      res.status(201).send(await findVideoGames());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/videogamesDb", async (req, res) => {
  try {
    const call = await Videogame.findAll({ include: Genre });
    const videogamesJSON = call.map((v) => v.toJSON());
    const videogames = videogamesJSON.map((v) => ({
      id: v.id,
      name: v.name,
      background_image: v.background_image,
      genres: v.Genres.map((genero) => genero.name),
    }));
    res.status(201).send(videogames);
  } catch (error) {
    res.status(400).send(error.message);
  }
  // {
  // 	"id": 3498,
  // 	"name": "Grand Theft Auto V",
  // 	"background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  // 	"genres": [
  // 		"Action",
  // 		"Adventure"
  // 	]
  // }
});

router.get("/videogames/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (/^([a-z]|[A-Z]|[0-9]|[-]){36}$/.test(id)) {
      const videogame = await Videogame.findOne({
        where: { id: id },
        include: Genre,
      });
      if (videogame) {
        console.log("Trajo de la bdd");
        const videogameJSON = videogame.toJSON();
        return res.status(200).send({
          ...videogameJSON,
          genres: videogameJSON.Genres.map((g) => g.name),
        });
      }
    }

    const call = await axios
      .get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)
      .then((response) => response.data);

    const miObj = {
      id: call.id,
      name: call.name,
      background_image: call.background_image,
      genres: call.genres.map((genero) => genero.name),
      description: call.description
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&#39;/gi, `'`),
      released: call.released,
      rating: call.rating,
      platforms: call.platforms.map((plataforma) => plataforma.platform.name),
    };
    console.log("Trajo de la api");
    res.status(200).send(miObj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/genres", async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).send(genres);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/videogames", async (req, res) => {
  try {
    const { name, genres, description } = req.body;
    if (!name || !description) {
      return res.status(400).send("Faltan parametros obligatorios");
    }
    const videogame = await Videogame.create(req.body);
    console.log(videogame);
    await videogame.addGenres(genres);
    res.status(201).send(videogame);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// nombre, imagen y genero
router.get("/videogames2", async (req, res) => {
  try {
    let call = await axios
      .get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40`)
      .then((response) => response.data)
      .then((response) => response.results);

    let arrObj = [];
    call.forEach((game) => {
      arrObj.push({
        name: game.name,
        image: game.background_image,
        genres: game.genres,
      });
    });
    res.status(200).send(arrObj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
