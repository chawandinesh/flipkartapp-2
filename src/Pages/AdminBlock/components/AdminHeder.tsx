import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Adminpage.css'

export const AdminHeader = () => {
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary bg-primary">
      <Container fluid>
        <Navbar.Brand href="/"style={{color:"white"}}><img className='logo' src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png' alt=''/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/admin" style={{color:"white"}}>Dashboard</Nav.Link>
            
            <Nav.Link href="/admin/users"style={{color:"white"}}>Users</Nav.Link>
            <Nav.Link href="/admin/customers"style={{color:"white"}}>Customers</Nav.Link>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className='btn-success' style={{color:"white"}}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>





    </div>
  )
}

export default AdminHeader