import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class AppTitle extends Component{
    render(){
        return(
          <div >
              Voting App - Teste de app react
          </div>
        );
    }
}

class AOption extends Component {
    render(){
        console.log(this.props);
        return(
            <div>
                <span>{this.props.name}</span>
                <span>{this.props.votes}</span>
            </div>
        );
    }
}

class App extends Component {
    ///Cria o componente principal da app com zero opções
    ///TODO:Puxar as opções do serviço rest a ser criado
    constructor(props){
        super(props);
        this.state = {
            options : []
        }
    }

    ///TODO:Puxar as opções do serviço rest a ser criado
    componentDidMount(){
        this.setState({options:[
                {
                    name:"Able",
                    votes:10
                },
                {
                    name:"Baker",
                    votes:5
                }
            ]});
    }
    ///Renderiza o componente principal da aplicação
    render() {
        //Ordena a lista por opções
        const sortedOptions = this.state.options.sort( (a,b)=>(b.votes - a.votes) );
        //Mapeia os dados para componentes de tela
        const options = sortedOptions.map( (option)=>{
            return <AOption name={option.name} votes={option.votes}/>
        });
        return (
        <div>
            <AppTitle/>
            {options}
        </div>
    );
  }
}

export default App;
