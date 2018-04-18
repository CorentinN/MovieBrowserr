import React, { Component } from 'react';
// import { Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import '../styles/search.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search:[],
            cursor:0,
            redirect:false
        };
    }

    handleKeyDown(e){
        const { cursor } = this.state
        if (e.key === 'ArrowUp' && cursor > 0) {
            this.setState( prevState => ({
                cursor : prevState.cursor - 1
            }))
        } if (e.key === 'ArrowDown' && this.state.cursor < this.state.search.length -1 ) {
            this.setState( prevState => ({
                cursor : prevState.cursor + 1
            }))
        } else if (e.key === 'Enter'){
            if(e.target.value !== ''){
                // let activeEl = document.getElementsByClassName('active > a[href]')[0];
                let activeEl = document.querySelectorAll('.active a')[0];
                let activeid = activeEl.getAttribute('dataid')
                this.handleredirect();
                this.handleSubmitId(activeid,e);
            }
            // this.setState({
            //     redirect: true,
            // })
        }
    }

    handleredirect(){
        this.props.setRedirect()
    }

    handleSubmit(e){
        e.preventDefault();
    }
    
    handleSubmitId(id,e){
        e.preventDefault();
        this.props.handleSubmitId(id);
        document.getElementById('searchForm').value = '';
        this.setState({search:[]})//refresh the search state to make the search resulst disapear on click
        this.setState({cursor:0});//reset cursor to top after selection
        // this.setState({redirectlink:""});
        // this.setState({redirect:false});
    }

    handleSearch(e){
        e.preventDefault();
        let search;
        if (e.target.value !== ""){
          search = e.target.value;
        };
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=e303177ca8412d17986e325b2b00a147&language=en-UK&query='+ search +'&page=1&include_adult=false')
        .then((response) => {
            let search = response.data.results;
            this.setState({search: search})
        }).catch((error)=>{
            console.log(error)
        })
    }

    render() { 
        const { cursor } = this.state;
        return ( 
            <div className="inputWrapper">
                <form onSubmit={this.handleSubmit.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
                    <input autoComplete="off" type="text" id="searchForm" onChange={this.handleSearch.bind(this)}/>
                </form>
                {this.state.search !== [] && 
                    <div className="searchWrapper">
                        <ul>
                            {this.state.search.map((results,index) => {
                                return (
                                    <li key={index-1} className={`${cursor === index ? 'active' : ''}`}>
                                        <a
                                            key={index -1}
                                            href={results.title}
                                            dataid={results.id}
                                            onClick={this.handleSubmitId.bind(this, results.id)}
                                            >
                                            {results.title}
                                        </a>
                                    </li> 
                                )})}
                        </ul>
                    </div>
                }
                
            </div>

         )
    }
}
 
export default SearchBar;