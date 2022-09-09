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
      isLiked @client
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };

  console.log(data, loading);

  return (
    <>
      <div className={styles.movie}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            {loading ? "Fetching movie..." : data?.movie?.title}
          </h1>
          <div className={styles.small}>
            <p className={styles.rating}>⭐️ {data?.movie?.vote_average}</p>
            <button className={styles.button} onClick={onClick}>
              {data?.movie?.isLiked ? "Liked" : "Like "}
            </button>
          </div>
          <p className={styles.overview}>{data?.movie?.overview}</p>
          <ul className={styles.list}>
            {data?.movie?.genres_list.map((genre, index) => (
              <li key={index} className={styles.genre}>
                {genre}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.container} ${styles.imageContainer}`}>
          <img
            className={styles.image}
            src={data?.movie?.image_portrait}
            alt={data?.movie?.title}
          />
        </div>
      </div>
    </>
  );
}
