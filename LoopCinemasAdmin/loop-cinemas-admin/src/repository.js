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
async function updateMovie(argument) {
  const query = gql`
    mutation UpdateMovie($movie_id: ID, $image: String, $name: String, $year: Int) {
      update_movie(
        movie_id: $movie_id,
        image: $image,
        name: $name,
        year: $year
      ) {
        movie_id
        image
        name
        year
      }
    }
  `;

  try {
    const data = await request(GRAPH_QL_URL, query, argument);
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
async function getReviews() {
  const query = gql`
    query {
      all_reviews {
        review_id
        review
        rating
        user_id
        movie_id
        user {
          name
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.all_reviews;
}

async function deleteReview(reviewId) {
  const mutation = gql`
    mutation ($reviewId: ID) {
      delete_review(review_id: $reviewId)
    }
  `;

  await request(GRAPH_QL_URL, mutation, { reviewId });
}

async function blockUser(userId) {
  const mutation = gql`
    mutation ($userId: ID) {
      block_user(user_id: $userId)
    }
  `;

  await request(GRAPH_QL_URL, mutation, { userId });
}

async function unblockUser(userId) {
  const mutation = gql`
    mutation ($userId: ID) {
      unblock_user(user_id: $userId)
    }
  `;

  await request(GRAPH_QL_URL, mutation, { userId });
}

async function addMovie({ image, name, year }) {
  const query = gql`
    mutation AddMovie($image: String, $name: String, $year: Int) {
      create_movie(image: $image, name: $name, year: $year)
    }
  `;

  try {
    const data = await request(GRAPH_QL_URL, query, { image, name, year });
    return data.create_movie
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error; // Optionally re-throw the error for higher-level error handling
  }
}

export {
  getMovies, updateMovie, deleteMovie, getReviews, deleteReview, blockUser, unblockUser, addMovie
}
