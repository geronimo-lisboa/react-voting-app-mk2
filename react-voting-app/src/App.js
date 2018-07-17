import React, { Component } from 'react';
import {/*Bootstrap,*/ Grid, Row, Col, Panel, Label, Button} from 'react-bootstrap';
import './App.css';

class ServerInterface{
    constructor(serverPath){
        this.serverPath = serverPath;
    }
    //Faz o fetch de todas as opções de voto. O fetch, a essa altura, já está com json, é só passar o callback que usa
    //json.
    getAllVotingOptions(){
        return fetch(this.serverPath).then(response=>response.json());
    }
}
let serverInterface = new ServerInterface("http://localhost:8080/votingoptions/");

class AOption extends Component {
    render(){
        console.log(this.props);
        return(
            <Row>
            <Col md={12}>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">
                        <Grid fluid={true}>
                            <Row>
                                <Col md={10}>
                                    {this.props.name}
                                </Col>
                                <Col md={1}>
                                    <Label bsStyle="info">
                                        {this.props.votes}
                                    </Label>
                                </Col>
                                <Col md={1}>
                                    <Button>VOTE</Button>
                                </Col>
                            </Row>
                        </Grid>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        {this.props.description}
                    </Panel.Body>
                </Panel>
            </Col>
            </Row>
        );
    }
}

class App extends Component {
    ///Cria o componente principal da app com zero opções
    constructor(props){
        super(props);
        this.state = {
            options : []
        }
    }

    componentDidMount(){
        serverInterface.getAllVotingOptions().then(data=>{
            console.log(data);
            this.setState({options:data});
        });
        console.log("a");
    }
    render() {
        //Ordena a lista por opções
        const sortedOptions = this.state.options.sort( (a,b)=>(b.votes - a.votes) );
        //Mapeia os dados para componentes de tela
        const options = sortedOptions.map( (option, i)=>{
            return <AOption name={option.name} description={option.description} votes={option.votes} key={i}/>
        });
        return(
        <Grid className={"Container"}>
            {options}
        </Grid>
        )
    };
}

export default App;
