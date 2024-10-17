import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProduct } from '../Redux/Slice/productSlice';

function Header() {
    const [wishlistCount, setWishlistCount] = useState(0);

    const [cartCount, setCartCount] = useState(0);
    const { wishlist } = useSelector((state) => state.wishlistReducer);
    const cart  = useSelector((state) => state.cartReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        setWishlistCount(wishlist.length);
    }, [wishlist]);
    
    useEffect(() => {
        setCartCount(cart.length);
    }, [cart]);

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
                            <Nav.Link>
                                <input 
                                    onChange={e => dispatch(searchProduct(e.target.value.toLowerCase()))}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search products" 
                                    style={{ width: "500px", borderRadius: "20px", color: "darkcyan" }} 
                                />
                            </Nav.Link>
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
        </div>
    );
}

export default Header;
