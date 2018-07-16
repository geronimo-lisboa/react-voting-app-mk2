import React, { Component } from 'react';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
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
            <Row>
                <Col md={8}>
                    {this.props.name}
                </Col>
                <Col md={3}>
                    {this.props.votes}
                </Col>
                <Col md={1}>
                    btnUp
                </Col>
            </Row>
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
    render() {
        //Ordena a lista por opções
        const sortedOptions = this.state.options.sort( (a,b)=>(b.votes - a.votes) );
        //Mapeia os dados para componentes de tela
        const options = sortedOptions.map( (option, i)=>{
            return <AOption name={option.name} votes={option.votes} key={i}/>
        });
        return(
        <Grid fluid={true}>
            {options}
        </Grid>
        )
    };
}

export default App;
