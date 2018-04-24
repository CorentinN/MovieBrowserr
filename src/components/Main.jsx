import React from 'react';
import {Link} from 'react-router-dom';

let pagination = undefined;
class Main extends React.Component {
    // handleReloader(){
    //     this.props.handleReload();
    // }
    handleSubmitId(id,e){
        this.props.handleSubmitId(id);
    }

    loadMore(e,pagination){
        this.props.loadMore();
        pagination++
    }

    render() { 
        return ( 
            <div className="movies__wrapper">
                {   
                    this.props.title.length === 0 ?
                    <div className="loader-wrapper">
                        
                        <div className="loader">
                            <div className="bigBox">
                                <div className="smallBox"></div>
                            </div>
                        </div>
                        <p className="wait-pls">Your movies are coming</p>
                    </div>
                    :
                    <div className="main-movies">
                        <h2>Current popular movies </h2>
                            <ul>
                                {this.props.title.map(title =>
                                    <li  key={title.title} className="film-wrapper">
                                        <Link to={"/film/"+ title.id}
                                            
                                            key={title.title}
                                            onClick={this.handleSubmitId.bind(this, title.id)}
                                            >
                                            <img alt={title.title} src={"https://image.tmdb.org/t/p/w300" + title.poster_path} />
                                        </Link>
                                    </li>
                                )}
                            </ul>
                    </div>
                }
                <div className="loadmore-wrapper">
                    <div 
                    className="btn-load-more"
                    onClick={this.loadMore.bind(this,pagination )}
                    >
                        More popular movies
                    </div>
                </div>
            </div>
         )
    }
}

export default Main;