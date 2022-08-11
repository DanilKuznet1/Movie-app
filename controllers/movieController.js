const Movie = require("../models/movieModel");
const User = require("../models/userModel");

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ category: "Movie" }).populate({
      path: "whoLiked whoBookmarked",
      select: "-__v",
    });

    res.status(200).json({
      status: "success",
      results: movies.length,
      data: {
        data: movies,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        data: newMovie,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getMovie = async (req, res, next) => {
  const movie = await Movie.find({ _id: req.params.id }).populate({
    path: "whoLiked whoBookmarked",
    select: "-__v",
  });

  res.status(200).json({
    status: "success",
    data: {
      data: movie,
    },
  });
};

exports.getAllTVSeries = async (req, res, next) => {
  try {
    const tvSeries = await Movie.find({
      // '$options: i' field is neccessary because we need to specify case insensiity
      category: { $regex: "tv s", $options: "i" },
    });

    res.status(200).json({
      status: "success",
      results: tvSeries.length,
      data: {
        data: tvSeries,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getTrending = async (req, res, next) => {
  try {
    const trendings = await Movie.find({ isTrending: true });

    res.status(200).json({
      status: "success",
      results: trendings.length,
      data: {
        data: trendings,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.likeMovie = async function (req, res, next) {
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    $push: { whoLiked: req.user.id },
  });

  const user = await User.findByIdAndUpdate(req.user.id, {
    $push: { liked: req.params.id },
  });

  res.status(200).json({
    status: "success",
    data: {
      data: movie,
    },
  });
};

// Will be done after user authentication/authorization is done
exports.getBookmarked = async (req, res, next) => {};
exports.getLikedMovies = async (req, res, next) => {};
