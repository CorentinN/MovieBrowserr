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
            film:[],
            title: [],
            error: 'error',
            page:1
        };
    }
    // handleReload(){
    //     this.setState
    // }
    componentDidMount(){
        // check the url if we are looking for a specific film
        let str = document.location.pathname;
        let rest = str.substring(0, str.lastIndexOf("/") + 1);
        let last = str.substring(str.lastIndexOf("/") + 1, str.length);
        if(rest === "/film/"){
            this.getMovie(parseInt(last,10));
        } else {
            // this.page = 12;
            console.log('HELLO',this.state.page)
            this.getMoviePage();
        }
    }
    
    getMoviePage(){
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b265a169ff1b9a5a938891de07d65b29&language=en-UK&page='+ this.state.page)
            .then( response => {
                console.log('test',this.state.page)
                let title = response.data.results;
                this.setState({
                   title: [...this.state.title, ...title],
                   page : this.state.page + 1
                });
            }).catch((error) =>{
                this.setState({error:error})
            })
    }

    loadMore(){
        this.getMoviePage();
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
                            <Main 
                            title={this.state.title}
                            // page={this.state.page}
                            handleSubmitId={this.handleSubmitId.bind(this)}
                            loadMore={this.loadMore.bind(this)}
                            />
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
