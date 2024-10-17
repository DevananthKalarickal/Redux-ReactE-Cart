import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, emptyCart } from '../Redux/Slice/cartSlice';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';

function Cart() {
    const dispatch = useDispatch();

    // Fetching cart and wishlist from Redux store
    const cart = useSelector((state) => state.cartReducer);
    const wishlist = useSelector((state) => state.wishlistReducer.wishlist); // Ensure this points to the wishlist array

    // State for wishlist and cart counts
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    // Updating wishlist and cart counts when respective states change
    useEffect(() => {
        setWishlistCount(wishlist.length); // Ensure this is set correctly
    }, [wishlist]);

    useEffect(() => {
        setCartCount(cart.length);
    }, [cart]);

    // Function to handle removing an item from the cart
    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    // Function to handle emptying the cart
    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };

    // Calculate total price and number of products
    const totalProducts = cart.length;
    const totalPrice = cart.reduce((total, item) => total + item.Totalprice, 0);

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

            <div className='container' style={{ marginTop: "100px" }}>
                <div className="row mt-5">
                    <div className="col-lg-8">
                        {cart.length === 0 ? (
                            <div className="alert alert-info text-center">
                                Your cart is empty.
                            </div>
                        ) : (
                            <table className="table shadow">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((product, index) => (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td>{product.title}</td>
                                            <td>
                                                <Link to={`/view/${product.id}`}>
                                                    <img
                                                        style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                    />
                                                </Link>
                                            </td>
                                            <td>${product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>${product.Totalprice.toFixed(2)}</td>
                                            <td>
                                                <i
                                                    className="fa-solid fa-trash text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleRemove(product.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <div className="d-flex justify-content-between">
                            <button className='btn btn-light btn-outline-danger' onClick={handleEmptyCart}>
                                Empty Cart
                            </button>
                            <Link to='/' style={{ textDecoration: "none" }} className='btn btn-light btn-outline-success'>
                                Shop More
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="container border rounded shadow mt-5 p-5 w-70">
                            <h1>Cart Summary</h1>
                            <h4>Total Products: {totalProducts}</h4>
                            <h5>Total: <span className='text-danger fw-bolder'>${totalPrice.toFixed(2)}</span></h5>
                        </div>
                        <div className="d-grid">
                            <button className='btn btn-success m-3 rounded'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
