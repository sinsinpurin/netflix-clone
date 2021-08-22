import rq from '../utils/request'
import react from 'react'

import './Row.scss'
import YouTube from 'react-youtube'

const base_url = 'https://image.tmdb.org/t/p/original'

interface Props {
    title: string
    fetchUrl: string
    isLargeRow?: boolean
}

interface Movie {
    id: string
    name: string
    title: string
    original_name: string
    poster_path: string
    backdrop_path: string
}

interface Options{
    height: string,
    width: string,
    playerVars: {
        autoplay: 0 | 1 | undefined
    }
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
    const [movies, setMovies] = react.useState<Movie[]>([])
    const [trailerUrl, setTrailerUrl] = react.useState<string | null>("")

    react.useEffect(() => {
        const fetchData = async () => {
            const request = await rq.get(fetchUrl)
            let data: Movie[] = []
            for (const movie of request.data.results) {
                if (movie.backdrop_path !== null) {
                    data.push(movie)
                }
            }
            setMovies(data)
            return request
        }
        if (fetchUrl !== null) {
            fetchData()
        }
    }, [fetchUrl])

    const opts: Options = {
        height: "360",
        width: "640",
        playerVars:{
            autoplay: 1
        }
    }

    const handleClick = async (movie: Movie) => {
        if(trailerUrl){
            setTrailerUrl("")
        }else{
            let resp = await rq.get(`/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
            setTrailerUrl(resp.data.results[0]?.key)
        }
    }

    return (
        <div className="Row">
            <h2>{title}</h2>
            <div className="Row-posters">
                {/* ポスターコンテンツ */}
                {movies.map((movie, i) => {
                    return (
                        <img
                            key={movie.id}
                            className={`Row-poster ${
                                isLargeRow && 'Row-poster-large'
                            }`}
                            src={`${base_url}${
                                isLargeRow
                                    ? movie.poster_path
                                    : movie.backdrop_path
                            }`}
                            alt={movie.name}
                            onClick = {() => handleClick(movie)}
                        />
                    )
                })}
            </div>
            <div className="Row-trailer">
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
            </div>
        </div>
    )
}

export default Row
