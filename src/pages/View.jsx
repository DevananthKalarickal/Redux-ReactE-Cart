import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToWishlist } from '../Redux/Slice/wishlistSlice';
import { addToCart } from '../Redux/Slice/cartSlice';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';

function View() {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.productReducer);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  
  // Extracting wishlist and cart from Redux state
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const cart = useSelector((state) => state.cartReducer);

  // State for wishlist and cart counts
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Updating wishlist and cart counts when respective states change
  useEffect(() => {
    setWishlistCount(wishlist.length);
  }, [wishlist]);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  // Fetch product details based on ID
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products'));
    if (products) {
      const foundProduct = products.find((product) => product.id.toString() === id); // Ensure id is matched as string
      setProduct(foundProduct);
    }
  }, [id]);

  // Handle adding product to wishlist
  const handleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id === product.id);
    if (existingProduct) {
      alert('Product already exists in the wishlist');
    } else {
      dispatch(addToWishlist(product)); // Dispatch action to add product to wishlist
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
             
              <Nav.Link className='btn btn-outline-light ms-2'>
                <Link to="/wishlist" style={{ color: "black", fontWeight: "bold", textDecoration: "none" }}>
                  <i className="fa-solid fa-heart text-danger"></i> Wishlist
                  <Badge bg="success" className="rounded ms-2">{wishlistCount}</Badge>
                </Link>
              </Nav.Link>
              <Nav.Link className='btn btn-outline-light ms-2'>
                <Link to="/cart" style={{ color: "black", fontWeight: "bold", textDecoration: "none" }}>
                  <i className="fa-solid fa-cart-shopping text-warning"></i> Cart
                  <Badge bg="success" className="rounded ms-2">{cartCount}</Badge>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="mt-5">
        {loading ? (
          <div>
            <Spinner animation="border" variant="warning" /> Loading...
          </div>
        ) : (
          <div className="container row" style={{ marginTop: '100px' }}>
            <div className="col-lg-4">
              <img
                style={{ width: '130%', height: '400px', objectFit: 'cover' }}
                src={product?.thumbnail}
                alt={product?.title}
              />
            </div>

            <div className="col-lg-2"></div>

            <div className="col-lg-6">
              <p>Pid: {product?.id}</p>
              <h1>{product?.title}</h1>
              <h5 className="fw-bolder">Price: <span style={{ color: 'red' }}>${product?.price}</span></h5>
              <p>{product?.description}</p>

              <div className="d-flex justify-content-between mt-4">
                <Button 
                  className="btn btn-outline-light"
                  onClick={() => handleWishlist(product)} // Attach handleWishlist function
                >
                  <i className="fa-solid fa-heart text-danger"></i> Wishlist
                </Button>
                <Button className="btn btn-outline-light" onClick={() => handleAddToCart(product)}>
                  <i className="fa-solid fa-cart-shopping text-warning"></i> Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
