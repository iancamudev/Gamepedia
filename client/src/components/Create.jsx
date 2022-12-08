import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postVideogame } from "../redux/actions";
import { Link } from "react-router-dom";
import styles from "../styles/create.module.css";

const Create = () => {
  const dispatch = useDispatch();

  const { genres, platforms } = useSelector((state) => state);

  const [form, setForm] = useState({
    name: "",
    background_image: "",
    released: "",
    rating: "",
    description: "",
    genres: [],
    platforms: [],
  });

  const [error, setError] = useState({});
  const [created, setCreated] = useState(false);
  const validator = (property, value) => {
    switch (property) {
      case "name":
        if (!/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/.test(value)) {
          setError({
            ...error,
            [property]:
              "El nombre no debe contener caracteres especiales ($,@,%,#,etc)",
          });
        } else {
          delete error[property];
          setError({ ...error });
        }
        break;
      case "background_image":
        if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
          setError({
            ...error,
            [property]: "La imagen debe ser una url valida.",
          });
        } else {
          delete error[property];
          setError({ ...error });
        }
        break;

      case "released":
        if (new Date().getTime() < new Date(value).getTime()) {
          setError({
            ...error,
            [property]: "Debes elegir una fecha coherente.",
          });
        } else {
          delete error[property];
          setError({ ...error });
        }
        break;
      case "rating":
        if (Number(value) < 0 || Number(value) > 5) {
          setError({
            ...error,
            [property]: "El rating debe ser un numero del 1 al 5.",
          });
        } else {
          delete error[property];
          setError({ ...error });
        }
        break;
      case "genres":
        if (typeof value === "string") {
          if (!genres.map((genero) => genero.name).includes(value)) {
            setError({
              ...error,
              [property]: "No es un genero valido.",
            });
          } else {
            delete error[property];
            setError({ ...error });
          }
        } else {
          if (
            value
              .map((input) =>
                genres.map((genero) => genero.name).includes(input)
              )
              .includes(false)
          ) {
            setError({
              ...error,
              [property]: "No es un genero valido.",
            });
          } else {
            delete error[property];
            setError({ ...error });
          }
        }
        break;
      case "platforms":
        if (typeof value === "string") {
          if (!platforms.includes(value)) {
            setError({
              ...error,
              [property]: "No es una plataforma valida.",
            });
          } else {
            delete error[property];
            setError({ ...error });
          }
        } else {
          if (value.map((input) => platforms.includes(input)).includes(false)) {
            setError({
              ...error,
              [property]: "No es una plataforma valida.",
            });
          } else {
            delete error[property];
            setError({ ...error });
          }
        }

        break;
      default:
        setError({ ...error });
        break;
    }
  };

  const handlerChange = (e) => {
    e.preventDefault();
    setCreated(false);
    const property = e.target.name;
    const value = e.target.value;

    validator(property, value);

    if (value) {
      if (property === "genres" || property === "platforms") {
        if (form[property].includes(value)) {
          setForm({ ...form });
        } else {
          setForm({ ...form, [property]: [...form[property], value] });
        }
      } else setForm({ ...form, [property]: value });
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const properties = Object.keys(form);
    const values = Object.values(form);

    for (let i = 0; i < properties.length; i++) {
      validator(properties[i], values[i]);
    }

    if (Object.keys(error).length) {
      console.log("Hay errores");
    } else {
      let nuevoGenres = [];
      for (let objeto of genres) {
        if (form.genres.includes(objeto.name)) {
          nuevoGenres.push(objeto.id);
        }
      }
      setForm({
        name: "",
        background_image: "",
        released: "",
        rating: "",
        description: "",
        genres: [],
        platforms: [],
      });
      await dispatch(postVideogame({ ...form, genres: nuevoGenres }));
      setCreated(true);
    }
  };

  return (
    <div className={styles.div}>
      <Link to="/home">
        <button className={styles.back}></button>
      </Link>
      <h3>Add a videogame</h3>
      <form onSubmit={handlerSubmit}>
        <div>
          <label for="name">Name: </label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label for="background_image">Image: </label>
          <input
            type="text"
            name="background_image"
            value={form.background_image}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label for="released">Released: </label>
          <input
            name="released"
            type="date"
            value={form.released}
            min="1950-01-01"
            max={new Date().toISOString().split("T")[0]}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label for="rating">Rating: </label>
          <p>{form.rating}</p>
          <input
            name="rating"
            type="range"
            min={0}
            max={5}
            value={form.rating}
            onChange={handlerChange}
          />
        </div>
        <div>
          <label for="genres">Genres: </label>
          <input
            name="genres"
            type="text"
            className={styles.invisible}
            value={form.genres.join(", ")}
          />
          <select name="genres" onChange={(e) => handlerChange(e)}>
            <option value="">Select genres</option>
            {genres &&
              genres.map((genero) => {
                return <option value={genero.name}>{genero.name}</option>;
              })}
          </select>
          <div className={styles.contenedorOptions}>
            {form.genres &&
              form.genres.map((genero) => {
                return (
                  <div className={styles.divOption}>
                    <p>{genero}</p>
                    <button
                      value={genero}
                      onClick={(e) => {
                        let nuevoGenres = form.genres.filter(
                          (genero) => genero !== e.target.value
                        );
                        setForm({ ...form, genres: nuevoGenres });
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <label for="platforms">Platforms: </label>
          <input
            className={styles.invisible}
            name="platforms"
            type="text"
            value={form.platforms.join(", ")}
          />
          <select name="platforms" onChange={(e) => handlerChange(e)}>
            <option value="">Select platform</option>
            {platforms &&
              platforms.map((plataforma) => {
                return <option value={plataforma}>{plataforma}</option>;
              })}
          </select>
          <div className={styles.contenedorOptions}>
            {form.platforms &&
              form.platforms.map((platform) => {
                return (
                  <div className={styles.divOption}>
                    <p>{platform}</p>
                    <button
                      value={platform}
                      onClick={(e) => {
                        let nuevoPlatforms = form.platforms.filter(
                          (plat) => plat !== e.target.value
                        );
                        setForm({ ...form, platforms: nuevoPlatforms });
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <label for="description">Description: </label>
          <textarea
            name="description"
            type="textt"
            value={form.description}
            onChange={handlerChange}
            className={styles.description}
          />
        </div>
        {error &&
          Object.values(error).map((error) => {
            return <p className={styles.error}>* {error}</p>;
          })}
        {created && <p>Se ha creado correctamente.</p>}
        <button
          className={styles.button}
          type="submit"
          disabled={
            !form.name ||
            !form.background_image ||
            !form.released ||
            !form.rating ||
            !form.genres.length ||
            !form.platforms.length ||
            !Object.keys(error)
          }
        >
          Create
        </button>
      </form>
    </div>
  );
};

// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
// Posibilidad de seleccionar/agregar varios géneros
// Posibilidad de seleccionar/agregar varias plataformas
// Botón/Opción para crear un nuevo videojuego
export default Create;
