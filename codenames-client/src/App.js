import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, Button, FormControl} from 'react-bootstrap';
import Home from './Components/Home/Home';
import About from './Components/About/About';

import GameBoard from './Components/GameBoard/GameBoard';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" expand="lg" style={{color: 'white'}}>
          <Navbar.Brand style={{color: 'white'}} href={window.location.origin}>CodeBreaker</Navbar.Brand>
          <Navbar.Toggle style={{color: 'white'}} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse style={{color: 'white'}} id="basic-navbar-nav">
            <Nav className="mr-auto" >
              <Nav.Link style={{color: 'white'}} href={window.location.origin}  >Home</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="about">Instructions</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="dashboard">Get Started!</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" >
            <Home/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <GameBoard/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}



