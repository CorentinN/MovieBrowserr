import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import './styles/App.css';

//components
import SearchBar from './components/SearchBar';
import Main from './components/Main';
import Movie from './components/Movie';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: [],
            film:[],
            error: 'error'
        };
    }

    componentDidMount(){
        // check the url if we are looking for a specific film
        let str = document.location.pathname;
        let rest = str.substring(0, str.lastIndexOf("/") + 1);
        let last = str.substring(str.lastIndexOf("/") + 1, str.length);
        if(rest === "/film/"){
            console.log('yespapy')
            this.getMovie(parseInt(last,10));
        }else{
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=b265a169ff1b9a5a938891de07d65b29&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=true&page=7')
            .then( response => {
                let title = response.data.results;
                this.setState({title :title});
            }).catch((error) =>{
                this.setState({error:error})
            })
        }
    }

    getMovie(id){
        axios.get('https://api.themoviedb.org/3/movie/'+ id +'?api_key=b265a169ff1b9a5a938891de07d65b29&language=en-UK')
        .then( response => {
            this.movie = response.data;
            this.setState({film:response.data})
        }).catch((error) =>{
            this.setState({error:error})
        })
    }

    componentWillReceiveProps(props){
        console.log(props)
    }

    handleSubmitId(id){
        console.log(id);
        this.getMovie(id);
    }

    render() {
        console.log(this.state.film)
        return (
            <BrowserRouter>
                <div>
                    <SearchBar handleSubmitId={this.handleSubmitId.bind(this)} />
                    <Switch>
                        <Route exact path="/">
                            <Main title={this.state.title}/>
                        </Route>
                        <Route exact path="/:id>">
                            <Main title={this.state.title}/>
                        </Route>
                        <Route exact path="/film/:id">
                            <Movie film={this.state.film}/>
                        </Route>
                    </Switch>    
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
