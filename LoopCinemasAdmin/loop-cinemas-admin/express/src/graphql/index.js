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
    isBlocked: Boolean
  }
  

  input MovieInput {
    image: String
    name: String
    year: Int
  }
  

  # Queries (read-only operations).
  type Query {
    all_movies: [Movie]
    all_reviews: [Review]
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    delete_review(review_id: ID): Boolean
    block_user(user_id: ID): Boolean
    unblock_user(user_id: ID): Boolean
    update_movie(movie_id: ID, image: String, name: String, year: Int): Movie
    delete_movie(movie_id: ID): Boolean
    create_movie(image: String, name: String, year: Int): Boolean
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_movies: async () => {
    return await db.movie.findAll();
  },
  // Mutations.
  create_movie: async (args) => {
    const movie = await db.movie.create({
      image: args.image,
      name: args.name,
      year: args.year
    });

  return true;
  },
  update_movie: async (args) => {
    const { movie_id, image, name, year } = args; // Destructure the arguments
    const movie = await db.movie.findByPk(movie_id);
  
    if (!movie) {
      throw new Error("Movie not found");
    }
  
    // Update movie fields.
    movie.movie_id = movie_id;
    movie.image = image;
    movie.name = name;
    movie.year = year;
  
    await movie.save();
  
    return movie;
  },
  delete_movie: async (args) => {
    // You should implement a logic to delete a movie by its ID in your database.
    // Here, I'm assuming you have such a method.
    const movie = await db.movie.findByPk(args.movie_id);
  
    if (!movie) {
      throw new Error("Movie not found");
    }

    // Delete the movie from the database.
    await movie.destroy();

    return true;
  },

  delete_review: async (args) => {
    try {
      // Ensure the review model is properly initialized
      if (!db || !db.review) {
        throw new Error("Review model is not initialized");
      }
      
      // Ensure that the reviewId is provided
      if (!args.review_id) {
        throw new Error("Review ID is not provided");
      }
      
      const review = await db.review.findByPk(args.review_id);
      if (!review) {
        throw new Error("Review not found");
      }
      
      // Mark the review as deleted instead of actually deleting it
      review.isDeleted = true;
      await review.save();
      
      return true;
      
    } catch (error) {
      console.error('Error in delete_review resolver:', error);
      throw error;
    }
  },  

  block_user: async (args) => {
    const user = await db.user.findByPk(args.user_id);
    if (!user) {
      throw new Error("User not found");
    }
  
    user.isBlocked = true;
    await user.save();
    
    return true;
  },
  

  unblock_user: async (args) => {
    const user = await db.user.findByPk(args.user_id);
    if (!user) {
      throw new Error("User not found");
    }
  
    user.isBlocked = false;
    await user.save();
    
    return true;
  },
  

  create_review: async (args) => {
    const user = await db.users.findByPk(args.user_id);
    if (user && user.isBlocked) {
        throw new Error("User is blocked from submitting reviews.");
    }

    // Continue with review creation logic...
    const review = await db.reviews.create({
      user_id: args.user_id,
      movie_id: args.movie_id,
      rating: args.rating,
      review: args.review
    });

    return review;
  },

  all_reviews: async () => {
    try {
      const reviews = await db.review.findAll({
        include: [db.user, db.movie] // Including related user and movie info
      });

      console.log('Reviews fetched:', reviews); // Log the fetched reviews for debugging
      return reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error); // Log errors if any
      throw error;
    }
  }
};

module.exports = graphql;