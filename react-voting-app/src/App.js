import React, { Component } from 'react';
import {/*Bootstrap,*/ Grid, Row, Col, Panel, Label, Button} from 'react-bootstrap';
import './App.css';

class ServerInterface{
    constructor(serverPath){
        this.serverPath = serverPath;
        this.getAllVotingOptions = this.getAllVotingOptions.bind(this);
        this.updateVote = this.updateVote.bind(this);
    }

    updateVote(option){
        console.log(this.serverPath + option.id)
        return fetch(this.serverPath + option.id, {
            method:'PUT',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(option),
        });
    }

    //Faz o fetch de todas as opções de voto. O fetch, a essa altura, já está com json, é só passar o callback que usa
    //json.
    getAllVotingOptions(){
        return fetch(this.serverPath).then(response=>response.json());
    }

}
let serverInterface = new ServerInterface("http://localhost:8080/votingoptions/");
class AOption extends Component {
    constructor(props){
        super(props);
        this.handleOnVoteClick = this.handleOnVoteClick.bind(this);
    }
    handleOnVoteClick(){
        this.props.onVoteButtonClick(this.props.id);
    }
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
                                    <Button onClick={this.handleOnVoteClick}>VOTE</Button>
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

class OptionService{
    constructor(){
        this.sortByVotes = this.sortByVotes.bind(this);
        this.getOptionById = this.getOptionById.bind(this);

    }
    sortByVotes(options){
        const sortedOptions = options.sort( (a,b)=>(b.votes - a.votes) );
        return sortedOptions;
    }
    getOptionById(options, id){
        const chosen =  options.filter((opt)=>{
            if(opt.id === id)
                return opt;
        });
        return chosen[0];
    }
}
let optionServices = new OptionService();

class App extends Component {
    ///Cria o componente principal da app com zero opções
    constructor(props){
        super(props);
        this.state = {
            options : []
        }
        this.onVoteButtonClick = this.onVoteButtonClick.bind(this);
    }

    componentDidMount(){
        serverInterface.getAllVotingOptions().then(data=>{
            this.setState({options:data});
        });
    }

    onVoteButtonClick(optionId){
        const chosen = optionServices.getOptionById(this.state.options, optionId);
        const increasedVote = Object.assign({}, chosen, {votes:chosen.votes+1});
        serverInterface.updateVote(increasedVote);
    }

    render() {
        console.log('a');
        const sortedOptions = optionServices.sortByVotes(this.state.options);
        //Mapeia os dados para componentes de tela
        const options = sortedOptions.map( (option, i)=>{
            return <AOption
                name={option.name}
                description={option.description}
                votes={option.votes}
                key={i}
                id={option.id}
                onVoteButtonClick={this.onVoteButtonClick}
            />
        });
        return(
        <Grid className={"Container"}>
            {options}
        </Grid>
        )
    };
}

export default App;
