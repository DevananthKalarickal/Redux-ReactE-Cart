import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Container, Spinner, Badge, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchProducts, searchProduct } from '../Redux/Slice/productSlice';
import { addToWishlist } from '../Redux/Slice/wishlistSlice';
import { addToCart } from '../Redux/Slice/cartSlice';

function Home() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
 

  // Extracting products, wishlist, and cart from Redux state
  
  const { products, loading, error } = useSelector((state) => state.productReducer);
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const cart = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  // Fetch products when the component mounts
  useEffect(() => {
 
    dispatch(fetchProducts())
 
  }, [dispatch]);

  // Updating wishlist count when wishlist changes
  useEffect(() => {
      setWishlistCount(wishlist.length);
  }, [wishlist]);

  // Updating cart count when cart changes
  useEffect(() => {
      setCartCount(cart.length);
  }, [cart]);

  // Handle adding product to wishlist
  const handleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id === product.id);
    if (existingProduct) {
      alert('Product already exists in the wishlist');
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      alert('Product already exists in the cart');
    } else {
      dispatch(addToCart(product));
      alert('Item added to cart');
    }
  };

  return (
    <div>
      {/* Header component */}
      <Navbar expand="lg" className="bg-primary position-fixed top-0 w-100" style={{ zIndex: 1 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
              <i className="fa-solid fa-truck-fast fa-bounce"></i> E-Cart
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <input
                  onChange={(e) => dispatch(searchProduct(e.target.value.toLowerCase()))}
                  type="text"
                  className="form-control"
                  placeholder="Search products"
                  style={{ width: "500px", borderRadius: "20px", color: "darkcyan" }}
                />
              </Nav.Link>
              <Nav.Link className="btn btn-outline-light ms-2">
                <Link to="/wishlist" style={{ color: "black", fontWeight: "bold", textDecoration: "none" }}>
                  <i className="fa-solid fa-heart text-danger"></i> Wishlist
                  <Badge bg="success" className="rounded ms-2">{wishlistCount}</Badge>
                </Link>
              </Nav.Link>
              <Nav.Link className="btn btn-outline-light ms-2">
                <Link to="/cart" style={{ color: "black", fontWeight: "bold", textDecoration: "none" }}>
                  <i className="fa-solid fa-cart-shopping text-warning"></i> Cart
                  <Badge bg="success" className="rounded ms-2">{cartCount}</Badge>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ marginTop: '70px' }}>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" /> Loading...
          </div>
        ) : (
          <Container>
            <Row className="mt-5 justify-content-center g-3">
              {products.map((product) => (
                <Col className="mt-5" sm={12} md={6} lg={4} xl={3} key={product.id}>
                  <Card className="h-100 d-flex flex-column">
                    <Link to={`/view/${product.id}`}>
                      <Card.Img
                        variant="top"
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                        }}
                        src={product.thumbnail}
                        alt={product.title}
                      />
                    </Link>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>{product.description.slice(0, 50)}</Card.Text>
                      </div>
                      <div className="d-flex justify-content-between mt-auto">
                        <Button
                          className="btn btn-light"
                          onClick={() => handleWishlist(product)}
                        >
                          <i className="fa-solid fa-heart text-danger" />
                        </Button>
                        <Button className="btn btn-light" onClick={() => handleAddToCart(product)}>
                          <i className="fa-solid fa-cart-shopping text-warning" />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default Home;
