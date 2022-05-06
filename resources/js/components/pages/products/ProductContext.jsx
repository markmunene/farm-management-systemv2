import axios from "axios";
import React, { useContext, useState, useEffect, useCallback } from "react";
// import UseLocalStorage from "../UseLocalStorage";

const AllproductsContext = React.createContext();

export function useProductsContext() {
    return useContext(AllproductsContext);
}

export function ProductsProvider({ children }) {
    const [productCount, setproductCount] = useState(-1);
    const [Quantity, setQuantity] = useState(0);
    const [productCartImage, setproductCartImage] = useState("");
    const [cartData, setcartData] = useState([]);

    const [allProducts, setallProducts] = useState([]);

    // storing data in localstorage
    const [LocalCartData, setLocalCartData] = useState("ProductInCart");

    const addProductsToCart = (data) => {
        setcartData((prev) => [...prev, data]);
        setLocalCartData((prev) => [...prev, data]);
    };
    const removeProduct = (data) => {
        setcartData(data);
        setLocalCartData(data);
    };

    const storeProducts = (data) => {
        // console.log(data);
        return setallProducts(data);
    };
    const setProductCartImage = (image) => {
        setproductCartImage(image);
    };

    useEffect(() => {
        try {
            axios.get("/api/product").then((res) => {
                setallProducts(res.data);
            });
        } catch (error) {
            console.log(error);
        }

        setproductCount(cartData.length);

        return () => {};
    }, [cartData.length]);

    const handlequantityDecrement = (id) => {
        // setcartData((data) => {
        //     data.forEach((element) => {
        //         if (element.id === id) {
        //             return (element.productCount -= 1);
        //         }
        //     });
        // });
        cartData.forEach((elements, i) => {
            if (elements.id === id) {
                return (cartData[i].productCount -= 1);
            }
        });
        setQuantity(Quantity + 1);
    };
    const handlequantityIncrement = (id) => {
        // setcartData((data) =>
        // {
        //     data.forEach(elements =>
        //     {
        //         if (elements.id === id) {
        //             return (elements.productCount += 1);
        //         }
        //     })
        // })
        cartData.forEach((elements, i) => {
            if (elements.id === id) {
                return (cartData[i].productCount += 1);
            }
        });
        setQuantity(Quantity + 1);
    };

    return (
        <AllproductsContext.Provider
            value={{
                addProductsToCart,
                cartData,
                LocalCartData,
                removeProduct,
                handlequantityDecrement,
                handlequantityIncrement,
                productCount,
                setProductCartImage,
                productCartImage,
                storeProducts,
                allProducts,
            }}
        >
            {children}
        </AllproductsContext.Provider>
    );
}
