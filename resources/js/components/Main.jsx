import { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";


import Routes from "./Routes.jsx";

// import Contact from "./Contact.jsx";

import { UsersDetailsprovider, useContacts } from "./context/UsersDetails.js";
import { ProductsProvider } from "./pages/products/ProductContext.jsx";
import { ExpenseProvider } from "./pages/ExpenseSection/expenseContext.js";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    useRouteMatch,
} from "react-router-dom";



const Main = () => {
   
   
    return (
        <>
            {/* wrapping all routes with context */}
            <Router>
                <ProductsProvider>
                    <UsersDetailsprovider>
                        <ExpenseProvider>
                            <Routes />
                        </ExpenseProvider>
                    </UsersDetailsprovider>
                </ProductsProvider>
            </Router>
        </>
    );
};

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
