const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = { };

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  type Booking {
    booking_id: ID
    movie_id: ID
    user_id: ID
    time: String
    seat: String
    suburb: String
  }
  
  type Movie {
    movie_id: ID
    image: String
    name: String
    year: Int
  }

  
  type Review {
    rating: Int
    review: String
    review_id: ID
    user_id: ID
    movie_id: ID
  }
  
  type User {
    user_id: ID
    email: String
    password_hash: String
    name: String
  }
  

  input MovieInput {
    image: String
    name: String
    year: Int
  }
  

  # Queries (read-only operations).
  type Query {
    all_movies: [Movie]
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    create_movie(input: MovieInput): Movie
    update_movie(input: MovieInput): Movie
    delete_movie(movie_id: ID): Boolean
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_movies: async () => {
    return await db.movies.findAll();
  },
  // Mutations.
  create_movie: async (args) => {
    const movie = await db.movies.create({
      image: args.input.image,
      name: args.input.name,
      year: args.input.year
    });

    return movie;
  },
  update_movie: async (args) => {
    // You should have a method to find the movie by its ID in your database.
    const movie = await db.movies.findByPk(args.input.movie_id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    // Update movie fields.
    movie.image = args.input.image;
    movie.name = args.input.name;
    movie.year = args.input.year;

    await movie.save();

    return movie;
  },
  delete_movie: async (args) => {
    // You should implement a logic to delete a movie by its ID in your database.
    // Here, I'm assuming you have such a method.
    const movie = await db.movies.findByPk(args.movie_id);
  
    if (!movie) {
      throw new Error("Movie not found");
    }

    // Delete the movie from the database.
    await movie.destroy();

    return true;
  }
};

module.exports = graphql;