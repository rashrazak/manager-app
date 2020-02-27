import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";

import {Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import Posts from './Components/Posts';
import Post from './Components/Post';
import PostProvider from './Context/Post'


function App() {
  const [collapsed, setCollapsed] = useState(false)


  return (
      
    <React.Fragment>
      <Router>
        <PostProvider>
        <Navbar color="light" light expand="xl" fixed="top">
            <Container>
            <NavbarBrand><span style={{paddingTop:'10px',margin:'8px 7px',color:'#d80d0d',fontSize:'20px',fontWeight:'900'}}>Manager App</span></NavbarBrand>
            <NavbarToggler onClick={ () => setCollapsed(!collapsed)} />
            <Collapse isOpen={collapsed} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                <NavLink style={{fontWeight:'700'}} >Notifications</NavLink>
                </NavItem>
                <NavItem>
                <NavLink style={{fontWeight:'700'}} >Alert</NavLink>
                </NavItem>
            </Nav>   
            </Collapse>
            </Container>
        </Navbar>
        <div style={{background:'#fff'}}>
            <Posts />          
        </div>
        <footer className="footerx">
            <Container>
                <span className="text-muted">MANAGER - APP</span>
            </Container>
        </footer>
        <Switch>
          <Route path={`/post/:id`}>
            <Posts />
          </Route>
        </Switch>
        </PostProvider>
      </Router>
      

    </React.Fragment>
  );
}

export default App;
