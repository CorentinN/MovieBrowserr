import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search:[]
        };
    }
    
    handleSubmit(e){
        e.preventDefault();
    }

    handleSubmitId(id,e){
        document.getElementById('searchForm').value = '';
        this.props.handleSubmitId(id);
        this.setState({search:[]})//refresh the search state to make the search resulst disapear on click
    }

    deleteInputValue(e){
        document.getElementById('searchForm').value = '';
    }

    handleSearch(e){
        e.preventDefault();
        let search;
        if(e.target.value !== ""){
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
        console.log(this.state.search)
        return ( 
            <div className="inputWrapper">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" id="searchForm" onChange={this.handleSearch.bind(this)}/>
                </form>
                {this.state.search !== [] && 
                    <div className="searchWrapper">
                        <ul>
                            {this.state.search.map((results,index) => {
                                return (
                                    <li key={index}>
                                        <Link 
                                            to={'/film/'+results.id}
                                            onClick={this.handleSubmitId.bind(this, results.id)}
                                            >
                                            {results.title}
                                        </Link>
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