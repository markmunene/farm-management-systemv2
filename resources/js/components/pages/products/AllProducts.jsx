import React, { useRef, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import moment from "moment";

import ProductCart from "./ProductCart";
import "./products.css";
import SingleProduct from "./SingleProduct";
import CreateProduct from "./CreateProduct";
import { useContacts } from "../../context/UsersDetails";

import { useProductsContext } from "./ProductContext";
import axios from "axios";
import Select from "react-select";

export default function AllProducts() {
    const { value, user, contacts } = useContacts();

    const modalProductReq = useRef({});
    const modalAllProductRequests = useRef({});
    const modalTable = useRef({});

    const categoryRef = useRef();
    const { setProductCartImage, storeProducts } = useProductsContext();
    const [showCreateInput, setshowCreateInput] = useState(false);
    const [ProductCategory, setProductCategory] = useState("");

    const [ProductName, setProductName] = useState("");
    const [Description, setDescription] = useState("");
    const [ApproxPrice, setApproxPrice] = useState("");

    const [productSearch, setproductSearch] = useState([]);
    const [productsArray2, setproductsArray2] = useState([]);

    const [allProductImages, setallProductImages] = useState([]);
       const [fetchedProducts, setfetchedProducts] = useState([]);
       const [fetchedProductReq, setfetchedProductReq] = useState([]);
       const [errors, setErrors] = useState([]);


    useEffect(() => {
        getallFimages();
        // fetchProductImages();
        if (value.User_Role === 1) {
            setshowCreateInput(!showCreateInput);
        }
    }, [value.length]);

    const options = [
        {label:"All products" , value:"0"},
        { label: "Aquaculture", value: "1" },
        { label: "Horticulture", value: "2" },
        { label: "Livestock", value: "3" },
    ];

    const handleSelectChange = (selectedOption) => {
        let filteredProducts;

        setProductCategory(selectedOption.value);
        filteredProducts = productsArray2;
       
        
            filteredProducts = filteredProducts.filter((items) => {
                //  filteredPost.Product_name.toLowerCase().includes;
                if (items.Product_category == parseInt(selectedOption.value)) {
                    return items;
                }
            });
         if (parseInt(selectedOption.value) == 0) {
             filteredProducts = productsArray2;
         }
    
        // console.log(filteredProducts);
        setfetchedProducts(filteredProducts);
    };
 
    useEffect(() => {
        getProducts();
        getAllProductRequest();
        //  storeProducts(fetchedProducts);
        return () => {};
    }, []);
    const getProducts = async () => {
        try {
            await axios.get("/api/product").then((res) => {
                setfetchedProducts(res.data);
                setproductsArray2(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };
    // fetching all the images of a specific user
    const getallFimages = async () => {
        await axios.get("api/product/show").then((res) => {
            setallProductImages(res.data);
            setProductCartImage(res.data);
        });
    };
    // function that submits the product requests to db
    const handleproductRequestSubmit = (event) => {
        try {
            event.preventDefault();
            const fd = new FormData();
            fd.append("ProductName", ProductName);
            fd.append("Description", Description);
            fd.append("ApproxPrice", ApproxPrice);

            axios
                .post("api/productRequest/store", fd)
                .then((result) => {
                    setDescription("");
                    setProductName("");
                    setApproxPrice("");
                    setErrors("");
                    $(modalProductReq.current).modal("hide");
                    {
                        <div class="toast" data-autohide="false">
                            <div class="toast-header">
                                <strong class="mr-auto text-primary">
                                    Toast Header
                                </strong>
                                <small class="text-muted">5 mins ago</small>
                                <button
                                    type="button"
                                    class="ml-2 mb-1 close"
                                    data-dismiss="toast"
                                >
                                    &times;
                                </button>
                            </div>
                            <div class="toast-body">
                                Some text inside the toast body
                            </div>
                        </div>;
                    }
                })
                .catch((err) => {
                    if (err.response.status == 422) {
                        setErrors(err.response.data.errors);
                    }
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };
    // fetching all product request
    const getAllProductRequest = () => {
        try {
            axios
                .get("api/productRequest")
                .then((result) => {
                    setfetchedProductReq(result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {}
    };
    const handleMakeProReq = () => {
        $(modalProductReq.current).modal("show");
    };

    const handleshowProductReq = () => {
        $(modalAllProductRequests.current).modal("show");
    };
    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{errors[field][0]}</strong>
                </span>
            );
        }
    };
    const hasErrorFor = (field) => {
        return !!errors[field];
    };
    // handle product request delete
    const handleDeleteRequestDelete = async (id) => {
        try {
            await axios
                .delete(`/api/productRequest//${id}`)
                .then((response) => {
                    props.history.push("/");
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div
                className="modal fade w-100"
                id="modal-default"
                // style={{width : '100vh'}}
                ref={modalAllProductRequests}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-2">
                            <h4 className="modal-title">
                                All Product Requests
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="table-responsive-sm ExpenseTable ">
                            <table
                                className="table table-striped "
                                ref={modalTable}
                            >
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>ProductName</th>
                                        <th>Description</th>
                                        <th>Approx Price</th>
                                        <th>Buyer Contact</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchedProductReq.map((items) => {
                                        return (
                                            <React.Fragment key={items.id}>
                                                <tr>
                                                    <td>{items.id}</td>
                                                    <td>{items.ProductName}</td>
                                                    <td>{items.Description}</td>
                                                    <td>{items.ApproxPrice}</td>

                                                    <td>
                                                        {contacts.map(
                                                            (item) => {
                                                                if (
                                                                    items.RequestCreator ==
                                                                    item.id
                                                                ) {
                                                                    return item.Phone_Number;
                                                                }
                                                            }
                                                        )}
                                                    </td>
                                                    <td>
                                                        {moment(
                                                            items.created_at
                                                        ).fromNow()}
                                                    </td>
                                                    <td>
                                                        {value.User_Role ===
                                                        4 ? (
                                                            <i
                                                                className="fa fa-trash text-danger"
                                                                onClick={() =>
                                                                    handleDeleteRequestDelete(
                                                                        items.id
                                                                    )
                                                                }
                                                            ></i>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

            <div
                className="modal fade"
                id="modal-default"
                ref={modalProductReq}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                {" "}
                                Add Product Request
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            onSubmit={handleproductRequestSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                {/*  */}
                                <div className="form-group">
                                    <label>ProductName:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("ProductName")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="ProductName"
                                        placeholder="ProductName"
                                        name="ProductName"
                                        value={ProductName}
                                        onChange={(e) => {
                                            setProductName(
                                                e.target.value.replace(
                                                    /[^A-Za-z]/g,
                                                    ""
                                                )
                                            );
                                        }}
                                        required
                                    />
                                    {renderErrorFor("ProductName")}
                                </div>

                                {/*  */}
                                <div className="form-group">
                                    <label>ApproxPrice:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("ApproxPrice")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="ApproxPrice"
                                        placeholder="ApproxPrice"
                                        name="ApproxPrice"
                                        min={0}
                                        value={ApproxPrice}
                                        onChange={(e) => {
                                            setApproxPrice(
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                )
                                            );
                                        }}
                                        required
                                    />
                                    {renderErrorFor("ApproxPrice")}
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea
                                        className={`form-control ${
                                            hasErrorFor("Description")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Description"
                                        placeholder="Description"
                                        name="Description"
                                        value={Description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Description")}
                                </div>
                            </div>

                            <div className="modal-footer justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value=" Save"
                                />
                            </div>
                        </form>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>
            <div className="header my-3">
                <div className="line"></div>
                <h2 className="text-center px-5 mx-5">
                    <strong>Market Place</strong>
                </h2>
            </div>

            <div className="row ">
                <div className="col-md-9 ">
                    <div className="row">
                        {fetchedProducts
                            .filter((filteredPost) => {
                                if (productSearch == "") {
                                    return filteredPost;
                                } else if (
                                    filteredPost.Product_name.toLowerCase().includes(
                                        productSearch.toLowerCase()
                                    )
                                ) {
                                    return filteredPost;
                                }
                            })
                            .map((items, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="productCard container col-md-3 mx-3 my-2 ">
                                            <div className="">
                                                <div className="col-md-3 px-2">
                                                    <div
                                                        className="card "
                                                        style={{
                                                            backgroundImage: `url("../uploadedImages/${allProductImages
                                                                .filter(
                                                                    (item) =>
                                                                        item.ProductId ===
                                                                        items.id
                                                                )
                                                                .filter(
                                                                    (m, i) =>
                                                                        i === 0
                                                                )
                                                                .map(
                                                                    (s) =>
                                                                        s.ImageName
                                                                )}")`,

                                                            width: "20rem",
                                                        }}
                                                    >
                                                        {/* <img
                                                        src={`/UProductImages/${items.Image_name}`}
                                                        className="card-img-top img-fluid"
                                                    /> */}
                                                        <div className="Productbody">
                                                            <div className="d-flex justify-content-between  ">
                                                                <h5>
                                                                    <strong>
                                                                        {
                                                                            items.Product_name
                                                                        }
                                                                    </strong>
                                                                </h5>
                                                                <h5>
                                                                    <strong>
                                                                        Kes
                                                                        {
                                                                            items.Price
                                                                        }
                                                                    </strong>
                                                                </h5>
                                                            </div>
                                                            <h5>
                                                                <strong>
                                                                    {
                                                                        items.Location
                                                                    }
                                                                    , Kenya
                                                                </strong>
                                                            </h5>
                                                            <div className="">
                                                                <Link
                                                                    to={{
                                                                        pathname:
                                                                            "/singleProduct",
                                                                        state: {
                                                                            data: items,
                                                                        },
                                                                    }}
                                                                >
                                                                    <button className="btn btn-success">
                                                                        <strong>
                                                                            More
                                                                            Details
                                                                        </strong>
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="searchInput mx-4">
                        <div className="serahcTitle d-flex justify-content-center">
                            <h4>Search for Products</h4>
                        </div>
                        <div className="inputForm mx-auto w-100">
                            <div className="form-group ">
                                <label>Search By Category:</label>
                                <Select
                                    className="selectSearch "
                                    options={options}
                                    onChange={handleSelectChange}
                                    value={ProductCategory}
                                />
                            </div>

                            <div
                                className="form-group my-2"
                                style={{
                                    width: "200px",
                                }}
                            >
                                <label>Search By ProductName:</label>
                                <input
                                    type="text"
                                    // name="table_search"
                                    className="form-control "
                                    placeholder="product Title"
                                    value={productSearch}
                                    onChange={(e) =>
                                        setproductSearch(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {showCreateInput ? (
                        <div className="createProductInput my-2 mx-4">
                            <Link
                                to="/createProduct"
                                className="btn btn-info m-2"
                            >
                                <i className="fas fa-plus-square mr-1"></i>
                                Create Product
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="d-flex my-1 mx-4">
                        <button
                            className="btn btn-success mr-2"
                            onClick={() => handleMakeProReq()}
                        >
                            <i className="fas fa-plus-square mr-1"></i>
                            Make Product Request
                        </button>
                        <button
                            className="btn btn-success "
                            onClick={() => handleshowProductReq()}
                        >
                            <i className="fas fa-plus-square mr-1"></i>
                            See Product Request
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
