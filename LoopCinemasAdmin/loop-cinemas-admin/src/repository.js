import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Movies ---------------------------------------------------------------------------------------
async function getMovies() {
  // Get all movies
  const query = gql`
  {
    all_movies {
      movie_id
      image
      name
      year
    }
  }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_movies;
}

async function updateMovie(movie_id, image, name, year) {
  const query = gql`
    mutation($movie_id: ID, $image: String, $name: String, $year: Int) {
      update_movie(
        movie_id: $movie_id,
        image: $image,
        name: $name,
        year: $year
      ) {
        image
        name
        year
      }
    }
  `;

  const variables = {
    movie_id,
    image,
    name,
    year
  };

  try {
    const data = await request(GRAPH_QL_URL, query, variables);
    return data.update_movie;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error; // Optionally re-throw the error for higher-level error handling
  }
}

async function deleteMovie(movie_id) {
  const query = gql`
    mutation ($movie_id: ID) {
      delete_movie(movie_id: $movie_id)
    }
  `;

  const variables = { movie_id };


  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_owner;
}

export {
  getMovies, updateMovie, deleteMovie
}
