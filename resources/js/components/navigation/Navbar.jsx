import React, { useContext, useState,useEffect , useRef } from "react";

import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

// import AuthContext from "../context/AuthContext";
import { useContacts } from "../context/UsersDetails.js";
import { useProductsContext } from "../pages/products/ProductContext.jsx";
import "./Navbar.css";

export default function Navbar()
{
    const navContent = useRef();
    const [showDropDown, setshowDropDown] = useState(true);

    const { value, EmptyUser } = useContacts();
    const { productCount } = useProductsContext();
    let emptyObj = {};

    const toggleNavContent = () =>
    {
        navContent.current.style.display ="none"
        // setshowDropDown(!showDropDown);
    }
    

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-sticky">
                <Link className="navbar-brand" to="/products">
                    <span>Farm-management</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    // data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => (navContent.current.style.display = "block")}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                    ref={navContent}
                >
                    <ul className="navbar-nav  ml-auto">
                        {value.User_Role == 1 ? (
                            <li
                                className="nav-item "
                                onClick={() => toggleNavContent()}
                            >
                                <Link
                                    className="nav-link react-link"
                                    to="/expense"
                                >
                                    Expense-Tracker
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}

                        <li
                            className="nav-item"
                            onClick={() => toggleNavContent()}
                        >
                            <Link
                                className="nav-link react-link"
                                to="/homechat"
                            >
                                Chat-Module
                            </Link>
                        </li>

                        <li
                            className="nav-item"
                            onClick={() => toggleNavContent()}
                        >
                            <Link
                                className="nav-link react-link"
                                to="/bloghome"
                            >
                                Blog
                            </Link>
                        </li>

                        <li
                            className="nav-item"
                            onClick={() => toggleNavContent()}
                        >
                            <Link
                                className="nav-link react-link"
                                to="/products"
                            >
                                Products
                            </Link>
                        </li>

                        <li
                            className="nav-item"
                            onClick={() => toggleNavContent()}
                        >
                            <Link
                                className="nav-link react-link"
                                to="/contactUs"
                            >
                                Contact Us
                            </Link>
                        </li>
                        {Object.keys(value).length === 0 ? (
                            <>
                                <li
                                    className="nav-item"
                                    onClick={() => toggleNavContent()}
                                >
                                    <Link
                                        className="nav-link react-link btn register  "
                                        to="/register"
                                    >
                                        <i className="icofont-people"></i>
                                        Register
                                    </Link>
                                </li>
                                <li
                                    className="nav-item"
                                    onClick={() => toggleNavContent()}
                                >
                                    <Link
                                        className="nav-link react-link btn loginbtn  mr-2"
                                        to="/login"
                                    >
                                        <i className="icofont-lock"></i>Login
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li
                                    className="nav-item"
                                    onClick={() => toggleNavContent()}
                                >
                                    <button
                                        className="btn btn-sm btn-danger nav-link text-light"
                                        onClick={() => {
                                            {
                                                axios.defaults.withCredentials = true;
                                                axios
                                                    .get("/sanctum/csrf-cookie")
                                                    .then((response) => {
                                                        axios
                                                            .post("/logout")
                                                            .then(
                                                                (response) => {
                                                                    EmptyUser();
                                                                }
                                                            );
                                                    });
                                            }
                                        }}
                                    >
                                        logout
                                    </button>
                                </li>
                            </>
                        )}
                        <li className="nav-item cartBox">
                            <Link
                                className="nav-link react-link btn"
                                to="/cart"
                            >
                                <i className="fa fa-shopping-cart fa-2x"></i>
                                <div className="ItemsInCart">
                                    {productCount}
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* <div className="widgetleft ">
                <a href="" style={{ backgroundColor: " #1da1f2" }}>
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="" style={{ backgroundColor: "#4267b2" }}>
                    <i className="fab fa-facebook " aria-hidden="true"></i>
                </a>

                <a href="" style={{ backgroundColor: "red" }}>
                    <i className="fab fa-youtube " aria-hidden="true"></i>
                </a>
            </div>
            git remote add origin https://github.com/markmunene/farm-mg-system.git
            
            */}
        </>
    );
}
