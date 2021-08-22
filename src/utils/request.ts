import axios from 'axios'

const apikey = process.env.REACT_APP_API_KEY

export const requests = {
    feachTrending: `/trending/all/week?api_key=${apikey}&language=en-us`,
    feachNetflixOriginals: `/discover/movie?api_key=${apikey}&with_networks=213`,
    feactTopRated: `/discover/movie?api_key=${apikey}&languager=en-us`,
    feactActionMovies: `/discover/movie?api_key=${apikey}&with_genres=28`,
    feactComedyMovies: `/discover/movie?api_key=${apikey}&with_genres=35`,
    feactHorrorMovies: `/discover/movie?api_key=${apikey}&with_genres=27`,
    feactRomanceMovies: `/discover/movie?api_key=${apikey}&with_genres=10749`,
    feactDocumentMovies: `/discover/movie?api_key=${apikey}&with_genres=99`,
}

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

export default instance
