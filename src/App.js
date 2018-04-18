import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
            page:1,
            redirect:false
        };
    }

    componentDidMount(){
        // check the url if we are looking for a specific film
        console.log(this.state.film !== [])
        let str = document.location.pathname;
        let rest = str.substring(0, str.lastIndexOf("/") + 1);
        let last = str.substring(str.lastIndexOf("/") + 1, str.length);
        if(rest === "/film/"){
            this.getMovie(parseInt(last,10));
        } else {
            this.getMoviePage();
        }
    }

    getMoviePage(){
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b265a169ff1b9a5a938891de07d65b29&language=en-UK&page='+ this.state.page)
            .then( response => {
                let title = response.data.results;
                this.setState({
                   title: [...this.state.title, ...title],
                   page : this.state.page + 1
                });
            }).catch((error) =>{
                this.setState({error:error})
            })
    }

    // triggered on pushed of ' Load more ' button
    loadMore(){
        this.getMoviePage();
    }

    setRedirect(){
        this.setState({ redirect:true })
    }

    getMovie(id){
        console.log(!this.state.film === [])
        axios.get('https://api.themoviedb.org/3/movie/'+ id +'?api_key=b265a169ff1b9a5a938891de07d65b29&language=en-UK')
        .then( response => {
            this.movie = response.data;
            this.setState({film:response.data})
            // Not optimal but  the project need to move forward time 
            //*TO REFACTOR*
            let str = document.location.pathname;
            let rest = str.substring(0, str.lastIndexOf("/") + 1);
            if(rest !=   "/film/"){
                window.location = '/film/' + response.data.id;
            }
        }).catch((error) =>{
            this.setState({error:error})
        })
    }


    handleSubmitId(id){
        //window.history.pushState("", "", "/film/"+id)
        // this.props.history.push('/movie'); 
        console.log('history',this.props.match)
        console.log('aye')
        console.log('document.location.pathname',document.location.pathname)
        this.getMovie(id);
    }
    // redirection(){
    //     console.log('ok')
    //     return (
            
    //         <Redirect to="/movie"  />
    //     ) 
    // }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <SearchBar 
                        handleSubmitId={this.handleSubmitId.bind(this)}
                        setRedirect={this.setRedirect.bind(this)}
                    />
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
