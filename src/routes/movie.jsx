import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styles from "./movie.module.css";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      vote_average
      overview
      image_portrait
      genres_list
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  console.log(data, loading);
  if (loading) {
    return <h1 className={styles.heading}>Fetching movie...</h1>;
  }
  return (
    <>
      <div className={styles.movie}>
        <div className={styles.container}>
          <h1 className={styles.heading}>{data.movie.title}</h1>
          <p className={styles.rating}>⭐️ {data.movie.vote_average}</p>
          <p className={styles.overview}>{data.movie.overview}</p>
          <ul className={styles.list}>
            {data.movie.genres_list.map((genre, index) => (
              <li key={index} className={styles.genre}>
                {genre}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.container} ${styles.imageContainer}`}>
          <img
            className={styles.image}
            src={data.movie.image_portrait}
            alt={data.movie.title}
          />
        </div>
      </div>
    </>
  );
}
