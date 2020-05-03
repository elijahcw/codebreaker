import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import GameBoard from './Components/GameBoard/GameBoard';


export default class  App extends React.Component {



render(){
      return (
            <Router>
              <div>
                <Navbar bg="dark" expand="lg" style={{color: 'white'}}>
                  <Navbar.Brand style={{color: 'white'}} href={window.location.origin}>CodeBreaker</Navbar.Brand>
                  <Navbar.Toggle style={{color: 'white'}} aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse style={{color: 'white'}} id="basic-navbar-nav">
                    <Nav className="mr-auto" >
                      <Nav.Link style={{color: 'white'}} href={window.location.origin}>Home</Nav.Link>
                      <Nav.Link style={{color: 'white'}} href={window.location.origin + '/about'}>Instructions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>

                <br />

                {/*
                  A <Switch> looks through all its children <Route>
                  elements and renders the first one whose path
                  matches the current URL. Use a <Switch> any time
                  you have multiple routes, but you want only one
                  of them to render at a time
                */}
                <Switch>
                  <Route exact path="/" component={Home}  />
   
                  <Route path="/about" component={About}/>

                  <Route path="/board/:boardId" component={GameBoard}/>

                </Switch>
              </div>
            </Router>
            
          );
}
}



