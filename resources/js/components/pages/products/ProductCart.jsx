import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCartCols from "./productCartCols";
import { useContacts } from "../../context/UsersDetails";
import { useProductsContext } from "./ProductContext";

export default function ProductCart()
{
    const { filterSingleUserDetails } = useContacts();
    //getting product context functions
    const {
        cartData,
        removeProduct,
        handlequantityDecrement,
        handlequantityIncrement,
        
        productCartImage,
    } = useProductsContext();

    // deleting a single product from the cart
    const removeProductInCart = (id) => {
        let newCartData = cartData.filter((item) => item.id != id);
        removeProduct(newCartData);
    };
    let subTotal = 0;
    let InitialProductCount = 0;
    return (
        <>
            <div className="productCartContainer">
                <div className="header mt-3">
                    <div className="line"></div>
                    <h2 className="text-center">
                        <strong>Your Cart</strong>
                    </h2>
                </div>
                <ProductCartCols />
                <div className="">
                    {cartData.map((items, index) => {
                        return (
                            <React.Fragment key={items.id}>
                                <div className="row">
                                    <div className="col-md-2 productCartImg my-1">
                                        <img
                                            src={`../uploadedImages/${productCartImage
                                                .filter(
                                                    (item) =>
                                                        item.ProductId ===
                                                        items.id
                                                )
                                                .filter((m, i) => i === 0)
                                                .map((s) => s.ImageName)}`}
                                            height="100px"
                                            width="70px"
                                            className="img-fluid cartImage"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <p>
                                            {items.Product_name}
                                            <span
                                                className=" ml-2 fa fa-trash text-danger removeItem"
                                                onClick={() =>
                                                    removeProductInCart(
                                                        items.id
                                                    )
                                                }
                                            ></span>
                                        </p>
                                    </div>
                                    <div className="col-md-1">
                                        <p>
                                            <strong> Kes: {items.Price}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="d-flex">
                                            <button
                                                className="btnCartCount"
                                                onClick={() => {
                                                    handlequantityIncrement(
                                                        items.id
                                                    );
                                                }}
                                            >
                                                +
                                            </button>
                                            <span className="productCount">
                                                {InitialProductCount +
                                                    items.productCount}
                                            </span>
                                            <button
                                                className="btnCartCount"
                                                onClick={() => {
                                                    handlequantityDecrement(
                                                        items.id
                                                    );
                                                }}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <p>
                                            {
                                                filterSingleUserDetails(
                                                    items.Product_owner
                                                )[0].Phone_Number
                                            }
                                            <Link to="/homechat">
                                                <span className="ml-1">
                                                    Chat({" "}
                                                    {
                                                        filterSingleUserDetails(
                                                            items.Product_owner
                                                        )[0].name
                                                    }
                                                    )
                                                </span>
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="col-md-2">
                                        <p>
                                            <strong>Item Total</strong>
                                            {items.Price * items.productCount}
                                        </p>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="sectionTwo">
                    <Link to="/cart">
                        <button
                            className="btn btn-outline-danger px-5"
                            onClick={() => removeProduct([])}
                        >
                            Clear Cart
                        </button>
                    </Link>
                    <div className="totals">
                        <strong>
                            Total:{" "}
                            {cartData.forEach((items) => {
                                subTotal += items.Price * items.productCount;
                            })}
                            {subTotal}
                        </strong>
                    </div>
                    <Link to="/products">
                        <button
                            className="btn btn-outline-success px-5"
                            onClick={() => removeProduct([])}
                        >
                            Check Out
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
