import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  

  class IntegrationAutosuggest extends React.Component {
    constructor() {
        super();
    
        this.state = {
          nicknameValue: '',
          nicknameSuggestions: [],
          emailValue: '',
          emailSuggestions: [],
          search: [],
          users: [],
        };    
      }

    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
    
      search(){
        let films = this.state.search;
        let users = [];
        let title = [];
        if(films && films.length > 0){
            console.log("test")
            films.map((film)=>{
                let title = {'nickname': film.title, 'email': film.id}
                users.push(title)
                
            })
        }
        this.setState({
            nicknameSuggestions: users
        });
        return users;
      }
      
       getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');
        console.log(this.search())
        return this.state.nicknameSuggestions.filter(user => regex.test(user.nickname) || regex.test(user.email));
      }
      
      getSuggestionNickname(suggestion) {
        return suggestion.nickname;
      }
      
      getSuggestionEmail(suggestion) {
        return suggestion.email;
      }
      
      renderSuggestion(suggestion) {
        return (
          <span>{suggestion.nickname} - {suggestion.email}</span>
        );
      }
    
      onNicknameChange = (event, { newValue }) => {
        this.setState({
          nicknameValue: newValue
        });
        this.handleSearch(newValue);
      };

      handleSearch(title){
        let search;
        if (title !== ""){
          search = title;
        };
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=e303177ca8412d17986e325b2b00a147&language=en-UK&query='+ search +'&page=1&include_adult=false')
        .then((response) => {
            let search = response.data.results;
            this.setState({search: search});
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    
      onEmailChange = (event, { newValue }) => {
        this.setState({
          emailValue: newValue
        });
      };
      
      onNicknameSuggestionsFetchRequested = ({ value }) => {  
        this.getSuggestions(value)
        // this.setState({
        //   nicknameSuggestions: this.getSuggestions(value)
        // });
      };
    
      onNicknameSuggestionsClearRequested = () => {
        // this.setState({
        //   nicknameSuggestions: []
        // });
      };
    
      onNicknameSuggestionSelected = (event, { suggestion }) => {
        this.setState({
          emailValue: suggestion.email
        });
      };
    
      onEmailSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          emailSuggestions: this.getSuggestions(value)
        });
      };
    
      onEmailSuggestionsClearRequested = () => {
        this.setState({
          emailSuggestions: []
        });
      };
    
      onEmailSuggestionSelected = (event, { suggestion }) => {
        this.setState({
          nicknameValue: suggestion.nickname
        });
      };

      render() {
        const { 
          nicknameValue, 
          nicknameSuggestions, 
          emailValue, 
          emailSuggestions 
        } = this.state;
        const nicknameInputProps = {
          placeholder: "nickname",
          value: nicknameValue,
          onChange: this.onNicknameChange
        };
        const emailInputProps = {
          placeholder: "email",
          value: emailValue,
          onChange: this.onEmailChange
        };
    
        return (
          <div className="container">
            <Autosuggest 
              suggestions={this.state.nicknameSuggestions}
              onSuggestionsFetchRequested={this.onNicknameSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onNicknameSuggestionsClearRequested}
              onSuggestionSelected={this.onNicknameSuggestionSelected}
              getSuggestionValue={this.getSuggestionNickname}
              renderSuggestion={this.renderSuggestion}
              inputProps={nicknameInputProps}
            />
            <Autosuggest 
              suggestions={emailSuggestions}
              onSuggestionsFetchRequested={this.onEmailSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onEmailSuggestionsClearRequested}
              onSuggestionSelected={this.onEmailSuggestionSelected}
              getSuggestionValue={this.getSuggestionEmail}
              renderSuggestion={this.renderSuggestion}
              inputProps={emailInputProps}
            />
          </div>
        );
      }
    }
export default IntegrationAutosuggest;
