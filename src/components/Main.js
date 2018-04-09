import React from 'react';
import {Link} from 'react-router-dom';

class Main extends React.Component {

    handleSubmitId(id,e){
        this.props.handleSubmitId(id);
    }
    render() { 
        return ( 
            <div className="main">
                {this.props.title.map(title =>
                    <Link to={"/film/"+ 21861}
                     className="film-wrapper"
                      key={title.title}
                      onClick={this.handleSubmitId.bind(this, title.id)}
                      >
                        <img alt={title.title}className="" src={"https://image.tmdb.org/t/p/w500" + title.backdrop_path} />
                    </Link>
                )}
                <div 
                className="btn-load-more"
                onClick={this.handleReload.bind(this)}
                >
                    
                </div>
            </div>
         )
    }
}

export default Main;