const server = require("./src/app.js");
const { loadGenres } = require("./src/controllers.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const genres = await loadGenres();
  if (genres) console.log("Generos cargados");
  server.listen(PORT, () => {
    console.log(`listening at ${PORT}`); // eslint-disable-line no-console
  });
});
