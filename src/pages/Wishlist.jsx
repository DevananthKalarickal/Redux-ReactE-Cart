import React, { useEffect } from 'react';
import { Badge, Container, Nav, Navbar, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../Redux/Slice/wishlistSlice';
import { addToCart } from '../Redux/Slice/cartSlice'; // Ensure this is correctly imported

function Wishlist() {
  const dispatch = useDispatch();

  // Extracting wishlist and cart from Redux state
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const cart = useSelector((state) => state.cartReducer);

  // Handle adding product to cart
  function handleAddToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      alert('Product already exists in the cart');
    } else {
      dispatch(addToCart(product));
      alert('Item added to cart');
    }
  }

  return (
    <div>
      {/* Header component */}
      <Navbar expand="lg" className="bg-primary position-fixed top-0 w-100" style={{ zIndex: 1 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
              <i className="fa-solid fa-truck-fast fa-bounce"></i> E-Cart
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="btn btn-outline-light ms-2">
                <Link to="/wishlist" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  <i className="fa-solid fa-heart text-danger"></i> Wishlist
                  <Badge bg="success" className="rounded ms-2">{wishlist.length}</Badge>
                </Link>
              </Nav.Link>
              <Nav.Link className="btn btn-outline-light ms-2">
                <Link to="/cart" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  <i className="fa-solid fa-cart-shopping text-warning"></i> Cart
                  <Badge bg="success" className="rounded ms-2">{cart.length}</Badge>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Wishlist page content */}
      <div style={{ marginTop: '70px' }}>
        <Row className="mt-5 container">
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <Col className="mt-5" sm={12} md={6} lg={4} xl={3} key={product.id}>
                <Card style={{ width: '18rem' }}>
                  <Link to={`/view/${product.id}`}>
                    <Card.Img
                      variant="top"
                      style={{ width: '100%' }}
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{product.title.slice(0, 10)}</Card.Title>
                    <div className="d-flex justify-content-between">
                      <Button
                        className="btn btn-light"
                        onClick={() => dispatch(removeFromWishlist(product.id))}
                      >
                        <i className="fa-solid fa-trash text-danger"></i>
                      </Button>
                      <Button
                        className="btn btn-light"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="fa-solid fa-cart-shopping text-warning"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center mt-5" style={{ width: '100%' }}>
              <img
                src="https://bakestudio.in/assets/images/cart/empty-cart.gif"
                alt="Empty Wishlist"
                style={{ width: '150px' }}
              />
              <h1>Your wishlist is empty...</h1>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Wishlist;
