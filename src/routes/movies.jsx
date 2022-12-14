import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styles from "./movies.module.css";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
      image_landscape
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  console.log("loading", loading);
  console.log("data on movies", data);

  return (
    <div className={styles.movies}>
      <div className={styles.header}>
        {error && <h1 className={styles.loading}>Couldn't fetch :(</h1>}
        <h1 className={styles.heading}>{loading ? "Loading..." : "Movies"}</h1>
      </div>
      <div className={styles.container}>
        <ul>
          {data?.allMovies?.map((movie) => (
            <div className={styles.card} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <li>
                  <img
                    className={styles.image}
                    src={movie.image_landscape}
                    alt={movie.title}
                  />
                  <p className={styles.movieTitle}>{movie.title}</p>
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
