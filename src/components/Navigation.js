import {Button, Container, Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import './navbar.scss';
import {Component} from "react";

class Navigation extends Component {

  filterRecipeByName = (event) => {
    if (this.props.filterRecipeByName) {
      this.props.filterRecipeByName(event.target.value);
    }
  }

  render() {
    return (
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">Recipes Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{maxHeight: '100px'}}
                  navbarScroll>
                <Nav.Link href="show-recipes">Mostrar recetas</Nav.Link>
                <Nav.Link href="new-recipe">Nueva receta</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end" style={{visibility: this.props.searchDivVisibility}}>
              <Form className="d-flex" onChange={this.filterRecipeByName}>
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                {/*<Button onChange={this.filterRecipeByName} variant="secondary">Search</Button>*/}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
  }
}

export default Navigation;
