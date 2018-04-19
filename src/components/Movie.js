import React from 'react';
import '../styles/Normalize.css';
import '../styles/Movie.css';


class Movie extends React.Component {
    render() { 
        let film = this.props.film;
        console.log('filmlength',film)
        console.log('poster',film.poster_path)
        return ( 

            <div className="movie__wrap">
                <div className="movie">
                    <img 
                        alt={film.title} 
                        className="movie__img"
                        src=
                        {film.poster_path !== null || undefined ? "https://image.tmdb.org/t/p/w300" + film.poster_path : "http://www.rsoilfield.com/wp-content/uploads/image-unavailable.jpg"} 
                    />
                    <div className="info__wrap">
                        {<h2 className ="movie__title">{film.title}</h2>} 
                        {film.overview !== null ? <p className="movie__overview">{film.overview}</p> : <p>"No overview available."</p>}
                    
                        {<p className="">{film.status}</p>}
                    </div>
                    
               </div>
            </div>
         )
    }
}

export default Movie