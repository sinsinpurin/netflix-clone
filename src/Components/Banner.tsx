import rq, { requests } from '../utils/request'
import react from 'react'

import './Banner.scss'

const base_url = 'https://image.tmdb.org/t/p/original'

type movieProps = {
    title?: string
    name?: string
    orignal_name?: string
    backdrop_path?: string
    overview?: string
}

const Banner = () => {
    const [movie, setMovie] = react.useState<movieProps>({})

    react.useEffect(() => {
        async function fetchData() {
            const request = await rq.get(requests.feachNetflixOriginals)
            const rundomNum = Math.floor(Math.random() * request.data.results.length - 1)
            setMovie(request.data.results[rundomNum])
            //apiからランダムで値を取得している
            return request
        }
        fetchData()
    }, [])

    // descriptionの切り捨てよう関数
    function truncate(str: any, n: number) {
        // undefinedを弾く
        if (str !== undefined) {
            return str.length > n ? str?.substr(0, n - 1) + '...' : str
        }
    }

    return (
        <header
        className="Banner"
        style={movie.backdrop_path === undefined ? {}:{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie.backdrop_path}")`,
        backgroundPosition: "center center",
        }}>
            <div className="Banner-contents">
                    <h1 className="banner-title">
                        {movie?.title || movie?.name || movie?.orignal_name}
                    </h1>
                    <div className="Banner-buttons">
                        <button className="Banner-button">Play</button>
                        <button className="Banner-button">My List</button>
                    </div>
                    <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="Banner-fadeBottom" />
        </header>
    );
}

export default Banner;