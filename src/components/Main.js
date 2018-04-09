import React from 'react';

class Main extends React.Component {
    render() { 
        return ( 
            <div className="main">
                {this.props.title.map(title => 
                    <div className="film-wrapper" key={title.title}>
                        <img alt={title.title}className="" src={"https://image.tmdb.org/t/p/w500" + title.backdrop_path} />
                        <div className="film__text">
                            <h2 className="film__title">{title.title}</h2>
                            <p>{title.overview}</p>
                        </div>
                    </div>
                )}
                <div className="pagination">
                    <div>  Previous page</div>
                    <div>  Next page</div>
                </div>
            </div>
         )
    }
}

export default Main;