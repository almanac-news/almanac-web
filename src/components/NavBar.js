import React from 'react'
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export class NavBar extends React.Component {

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            Almanac News
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to='/'>
              <NavItem eventKey={1}>News Feed</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to='/subscription'>
              <NavItem eventKey={2}>Subscribe</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to='/about'>
              <NavItem eventKey={3}>About Us</NavItem>
            </IndexLinkContainer>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={2} title='Explore Project' id='basic-nav-dropdown'>
              <MenuItem eventKey={2.1} href='http://www.github.com/almanac-news/almanac-web'>React Web App Repo</MenuItem>
              <MenuItem eventKey={2.2} href='http://www.github.com/almanac-news/almanac-app-service'>Python Service Repo</MenuItem>
              <MenuItem eventKey={2.3} href='http://www.github.com/almanac-news/docker-compose'>Project Architecture</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={2.4} href='http://www.github.com/almanac-news'>Follow On Github</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar
