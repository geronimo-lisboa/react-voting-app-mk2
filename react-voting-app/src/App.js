import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class AppTitle extends Component{
    render(){
        return(
          <div>
              Voting App - Teste de app react
          </div>
        );
    }
}

class App extends Component {
    constructor(props){
        super(props);
        //Seta o estado inicial, com zero opções
        this.state = {
            options : []
        }
    }
    render() {
        console.log(this.state);
        return (
        <div>
            <AppTitle/>
        </div>
    );
  }
}

export default App;
