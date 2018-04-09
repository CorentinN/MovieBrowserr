import React from 'react';

class Movie extends React.Component {
    render() { 
        let film = this.props.film;
        return ( 
            <div className="main">
               {<h2>{film.title}</h2>} 
               {film.overview !== null ? <p>{film.overview}</p> : <p>"No overview available."</p>}
               {<p>{film.status}</p>}
               {<p>{film.release_date}</p>}

               <img alt={film.title}className="" src=
               {film.poster_path !== null || undefined ? "https://image.tmdb.org/t/p/w300" + film.poster_path : "http://www.rsoilfield.com/wp-content/uploads/image-unavailable.jpg"} />
            </div>
         )
    }
}

export default Movie