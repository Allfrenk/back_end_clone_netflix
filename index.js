const express = require("express");
const app = express();
const port = 2000;
const axios = require("axios").default;

// VARIABILI UTILI
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "944143a810402073e91619e119fa95ef";
const language = "it";

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// DISCOVER
app.get("/discover", (req, resp) => {
  //
  axios
    .get(`${API_URL}discover/movie`, {
      params: {
        api_key: "944143a810402073e91619e119fa95ef",
        language: "it",
        sort_by: "popularity.desc",
        include_adult: false,
        page: 1,

        //
      },
    })
    .then((response) => {
      const data = response.data.results;
      resp.send(data);
    });
});

app.get("/api/movie", (req, resp) => {
  const movie = req.query.movie;
  const axios = require("axios").default;
  // richiesta api, movie e id
  axios
    .get(
      `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}ef&language=${language}`
    )
    .then(function (response) {
      const movie = response.data;
      resp.send(movie);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
