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
    allTweets {
      text
      id
      author {
        fullName
      }
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);
  if (loading) {
    return <h1 className={styles.heading}>Loading...</h1>;
  }
  if (error) {
    return <h1 className={styles.heading}> Couldn't fetch :( </h1>;
  }

  return (
    <div className={styles.movies}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Movies</h1>
      </div>
      <div className={styles.container}>
        <ul>
          {data.allMovies.map((movie) => (
            <div className={styles.card}>
              <Link to={`/movies/${movie.id}`}>
                <li key={movie.id}>
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
