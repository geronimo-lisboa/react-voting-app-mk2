import React, { Component } from 'react';
import {Bootstrap, Grid, Row, Col, Panel, Label, Button} from 'react-bootstrap';
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
                    name:"Able Baker Charlie Delta Easy",
                    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis, purus vel congue pellentesque, nisl nulla interdum nisl, sit amet blandit eros odio in nulla. Integer id sollicitudin erat. Quisque pretium lacus sed ipsum ultrices, a fringilla eros congue. Phasellus sollicitudin non neque sit amet blandit. Vivamus mauris risus, pellentesque sit amet laoreet vestibulum, efficitur ac metus. Nunc et dictum sapien. Mauris sit amet pellentesque purus, id cursus arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; ",
                    votes:10
                },
                {
                    name:"Hotel India Kilo Mike XRay",
                    description:"Ut magna elit, maximus ultricies rutrum ac, posuere non mi. Phasellus ut auctor mauris. Pellentesque ultricies faucibus urna varius ornare. Nam imperdiet libero eget ex egestas maximus. Donec lacinia, eros laoreet cursus blandit, purus erat facilisis velit, fringilla viverra orci arcu at odio. Aenean ut elit eros. In non lectus nunc. Sed tempus tincidunt arcu vitae suscipit. ",
                    votes:5
                }
            ]});
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
