import React, { Component } from 'react';
import tmdblogo from '../tmdb-logo.svg';
import '../styles/base/settings.scss';
class Footer extends Component {
    render() { 
        return ( 
            <div className="footer__wrapper">
                <div className="info__wrapper">
                    <ul>
                        <li>
                            <a href="https://www.themoviedb.org/?language=en">
                                <img className ="tmdb-logo" src={tmdblogo} alt ="Logo of 'The movie Database'."/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/corentin-noirot/">
                                <i className="fa fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/corentinn">
                                <i className="fa fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/Kaouren">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

         )
    }
}

export default Footer;