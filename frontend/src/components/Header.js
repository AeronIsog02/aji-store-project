import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/UserAction";

function Header(props){
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(logout());
    };

    return(
        <header className="row">
            <div>
                <Link className="brand" to="/">AJI Store</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                    {props.cartItems.length > 0 && (<span className="badge">{props.cartItems.length}</span>)}
                </Link>
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">
                                {userInfo.name} <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                            <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/orderhistory">Order History</Link>
                                </li>
                                <li>
                                    <Link to="#logout" onClick={logOutHandler}>Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    ):
                    (
                        <Link to="/login">Login</Link>
                    )
                }
                {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                        <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                        <ul className="dropdown-content">
                            <li>
                                <Link to="/productlist">Products</Link>
                            </li>
                            <li>
                                <Link to="/orderlist">Order List</Link>
                            </li>
                            <li>
                                <Link to="/userlist">Users</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;