// app.get('/api/ricercaPerGenere' , (req, resp) => {
//     const axios = require('axios').default;
//     const selectedPage = req.query.page;
//     const selectedGenre = req.query.genre
//     axios.get("https://api.themoviedb.org/3/discover/movie",{
//       params:{
//         api_key: '',
//         language: 'it-IT',
//         sort_by: 'popularity.desc',
//         include_adult: false,
//         page: selectedPage,
//         with_genres: selectedGenre
//       }
//     })
