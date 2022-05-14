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

// OUTPUT TERMINALE (USARE NODEMON)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
