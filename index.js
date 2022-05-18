const express = require("express");
const app = express();
const port = 2000;
const axios = require("axios").default;

// VARIABILI UTILI
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY_V4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQxNDNhODEwNDAyMDczZTkxNjE5ZTExOWZhOTVlZiIsInN1YiI6IjYyN2I4NzY1NTExZDA5MGQ2MWI2NmE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2TU_pbRc04jOwDjuLSAQQjB_e7aFQyZ7StYcx_kGvMk";
const API_KEY_V3 = "944143a810402073e91619e119fa95ef";
const language = "it";
const region = "IT";

// DEFAULT ROUTE + ISTRUZIONI
app.get("/", (req, res) => {
  res.send({
    title: "NETFLIX CLONE BACK-END",
    discover_movie: "/discover/movie",
    discover_tv: "/discover/tv",
    search_multi: "/search/multi?query=",
    discover_tv_genre: "/discover/tv/genre?genre=",
    discover_movie_genre: "/discover/movie/genre?genre=",
  });
});

// DISCOVER MOVIE
app.get("/discover/movie", (req, resp) => {
  axios
    .get(`${API_URL}discover/movie`, {
      params: {
        api_key: API_KEY_V3,
        language: language,
        sort_by: "popularity.desc",
        include_adult: false,
        page: 1,
        region: region,
      },
    })
    .then((response) => {
      const data = response.data.results;
      resp.send(data);
    });
});

// TV SERIES
app.get("/discover/tv", (req, resp) => {
  axios
    .get(`${API_URL}discover/tv`, {
      params: {
        api_key: API_KEY_V3,
        language: language,
        sort_by: "popularity.desc",
        include_adult: false,
        page: 1,
      },
    })
    .then((response) => {
      const data = response.data.results;
      resp.send(data);
    });
});

//SEARCH BY TV/MOVIE NAME, TV/MOVIE ACTOR
app.get("/search/multi", (req, resp) => {
  const query = req.query.query;
  axios
    .get(`${API_URL}search/multi`, {
      params: {
        api_key: API_KEY_V3,
        language: language,
        query: query,
        page: 1,
        include_adult: false,
        region: region,
      },
    })
    .then((response) => {
      const results = response.data.results;
      resp.send(results);
    });
});

// CERCA PER GENERE TV
app.get("/discover/tv/genre", (req, resp) => {
  const genre = req.query.genre.toLowerCase();

  // let genres = new Map();
  // genres.set("azione", "10759");
  // genres.set("avventura", "10759");
  // genres.set("animazione", "16");
  // genres.set("commedia", "35");
  // genres.set("crime", "80");
  // genres.set("documentario", "99");
  // genres.set("dramma", "18");
  // genres.set("famiglia", "10751");
  // genres.set("kids", "10762");
  // genres.set("mistero", "9648");
  // genres.set("news", "10763");
  // genres.set("reality", "10764");
  // genres.set("sci-fi", "10765");
  // genres.set("fantasy", "10765");
  // genres.set("soap", "10766");
  // genres.set("talk", "10767");
  // genres.set("war", "10768");
  // genres.set("politics", "10768");
  // genres.set("western", "37");

  axios
    .get(`${API_URL}discover/tv`, {
      params: {
        api_key: API_KEY_V3,
        language: language,
        sort_by: "popularity.desc",
        page: 1,
        with_genres: genre,
        // with_genres: genres.get(genre),

        include_null_first_air_dates: false,
      },
    })
    .then((response) => {
      const series = response.data.results;
      resp.send(series);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// CERCA PER GENERE MOVIE
app.get("/discover/movie/genre", (req, resp) => {
  const genre = req.query.genre.toLowerCase();

  axios
    .get(`${API_URL}discover/movie`, {
      params: {
        api_key: API_KEY_V3,
        language: language,
        region: region,
        sort_by: "popularity.desc",
        include_adult: false,
        // include_video: false,
        page: 1,
        with_genres: genre,
        include_null_first_air_dates: false,
        // with_watch_monetization_types: filtrate,
      },
    })
    .then((response) => {
      const movies = response.data.results;
      resp.send(movies);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// OUTPUT TERMINALE (USARE NODEMON)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
