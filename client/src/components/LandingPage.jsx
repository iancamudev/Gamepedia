import { Link } from "react-router-dom";
import styles from "../styles/landingpage.module.css";

function LandingPage() {
  return (
    <body className={styles.body}>
      <div className={styles.div}>
        <div className={styles.div2}>
          <h1 className={styles.h1}>Gamepedia</h1>
          <p className={styles.p}>
            There is a simple application, here you can explore, create or
            filter videogames and get details from them. Developed with React,
            PostreSQL and NodeJS.
          </p>
          <Link to="/home">
            <button className={styles.button}>Lets start</button>
          </Link>
          <p className={styles.p2}>Developed by: iancamudev</p>
        </div>
        <div>
          <img className={styles.img} />
        </div>
      </div>
    </body>
  );
}

export default LandingPage;
