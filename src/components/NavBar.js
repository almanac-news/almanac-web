import React from 'react'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
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
            <IndexLinkContainer to='/about'>
              <NavItem eventKey={2}>About Us</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to='/subscription'>
              <NavItem eventKey={3}>Subscription</NavItem>
            </IndexLinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href='http://www.github.com/almanac-news'>Our Github</NavItem>
            <NavDropdown eventKey={2} title='Account' id='basic-nav-dropdown'>
              <LinkContainer to='/settings'>
                <MenuItem eventKey={2.1}>Settings</MenuItem>
              </LinkContainer>
              <LinkContainer to='/profile'>
                <MenuItem eventKey={2.2}>User Profile</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={2.3}>Login/Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar
