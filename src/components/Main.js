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
            <div className="main">
                {this.props.title.map(title =>
                    <Link to={"/film/"+ title.id}
                        className="film-wrapper"
                        key={title.title}
                        onClick={this.handleSubmitId.bind(this, title.id)}
                        >
                        <img alt={title.title} src={"https://image.tmdb.org/t/p/w500" + title.poster_path} />
                    </Link>
                )}
                <div 
                className="btn-load-more"
                onClick={this.loadMore.bind(this,pagination )}
                >
                    Load More
                </div>
            </div>
         )
    }
}

export default Main;