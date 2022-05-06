import { useContext, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import HomeChat from "./pages/homeChat.jsx";
import CreateProduct from "./pages/products/CreateProduct.jsx";

import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import Create from "./blog/Create.jsx";
import BlogHome from "./blog/BlogHome.jsx";
import SinglePost from "./blog/SinglePost.jsx";
import SingleProduct from "./pages/products/SingleProduct.jsx";
import ProductCart from "./pages/products/ProductCart.jsx";
import Testing from "./Testing.jsx";

import Navbar from "./navigation/Navbar.jsx";
import AllProducts from "./pages/products/AllProducts.jsx";
import AdminDashBord from "./Admin/AdminDashBord.jsx";
import Update from "./Admin/UpdateUser";
import MainExpense from "./pages/ExpenseSection/MainExpense.jsx";
import NotFound from "./NotFound.jsx";

import Contact from "./Contact.jsx";

import { useContacts } from "./context/UsersDetails.js";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    useRouteMatch,
    useHistory,
    Redirect,
} from "react-router-dom";
import UpdateUser from "./Admin/UpdateUser";

const Routes = (props) => {
    const { value } = useContacts();
    // console.log(value);

    const AdminRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() => {
                    return value.User_Role != 5 ? (
                       ""
                    ) : (
                        children
                    );
                }}
            />
        );
    };
    return (
        <>
            <Navbar />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {Object.keys(value).length === 0 ? (
                <Redirect to="/login" />
            ) : (
                <>
                    <Switch>
                        <Route
                            path="/singleProduct"
                            component={SingleProduct}
                        ></Route>
                        <AdminRoute path="/admin">
                            <AdminDashBord />
                        </AdminRoute>
                        {value.User_Role == 5 ? (
                            <Route
                                path="/updateUser"
                                component={UpdateUser}
                            ></Route>
                        ) : (
                            ""
                            // <Redirect to="/" />
                        )}

                        <Route path="/products" component={AllProducts}></Route>

                        <Route path="/cart" component={ProductCart}></Route>

                        <Route path="/" exact component={AllProducts} />
                        {value.User_Role == 1 ? (
                            <Route
                                path="/createProduct"
                                component={CreateProduct}
                            />
                        ) : (
                            ""
                            // <Redirect to="/" />
                        )}

                        <Route path="/contactUs" component={Contact} />
                        <Route
                            path="/homechat"
                            exact
                            component={HomeChat}
                        ></Route>
                        {value.User_Role == 1 ? (
                            <Route
                                path="/expense"
                                exact
                                component={MainExpense}
                            ></Route>
                        ) : (
                            ""
                            // <Redirect to="/" />
                        )}

                        {value.User_Role == 2 ? (
                            <Route path="/create" component={Create} />
                        ) : (
                            ""
                            // <Redirect to="/" />
                        )}

                        <Route
                            path={`/singlePost`}
                            exact
                            component={SinglePost}
                        />

                        <Route path="/bloghome" exact component={BlogHome} />
                        <Route component={NotFound} />
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                </>
            )}
        </>
    );
};

export default Routes;
