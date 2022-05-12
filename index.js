const express = require("express");
const app = express();
const port = 2000;
const axios = require("axios").default;

// KEY
// 944143a810402073e91619e119fa95ef

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/movie", (req, resp) => {
  const language = "it";
  const movie = req.query.movie;
  const axios = require("axios").default;
  // Make a request for a user with a given ID
  axios
    .get(
      `https://api.themoviedb.org/3/movie/550?api_key=944143a810402073e91619e119fa95ef&language=${language}`
    )
    .then(function (response) {
      const movie = {
        movie: response.data,
      };
      resp.send({ movie: movie });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
