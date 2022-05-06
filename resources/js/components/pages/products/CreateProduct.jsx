import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import { Redirect, useLocation, Link } from "react-router-dom";

export default function CreateProduct(props) {
    // creating userefs
    const countyRef = useRef();
    const categoryRef = useRef();

    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState([]);
    const [productId, setProductId] = useState("");
    const [productName, setproductName] = useState("");
    const [Price, setPrice] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Location, setLocation] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [ProductDesc, setProductDesc] = useState("");
    const [updateState, setupdateState] = useState(false);
    const [updateData2, setupdateData2] = useState([]);
    const location = useLocation();

    let updateRequest = false;
    let data = {};

    useEffect(() => {
        try {
            if (location.state) {
                updateCheck();
            }
        } catch (error) {}
    }, []);

    const updateCheck = () => {
        updateRequest = location.state.updateRequest;
        data = location.state.data;
        setupdateData2(data);
        setupdateState(updateRequest);
        setProductId(data.id);
        setproductName(data.Product_name);
        setPrice(data.Price);
        setProductDesc(data.ProductDesc);
        setQuantity(data.Quantity);
        setProductCategory(data.Product_category);
        categoryRef.current.value = data.Product_category;
        countyRef.current.value = data.Location;
    };

    const handleEdit = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append("productName", productName);
        fd.append("Product_category", productCategory);
        fd.append("Price", Price);
        fd.append("ProductDesc", ProductDesc);
        fd.append("Quantity", Quantity);
        fd.append("Location", Location);

        axios
            .post(`/api/product/update/${productId}`, fd)
            .then((res) => {
                setLocation("");
                setPrice("");
                setLocation("");
                setProductCategory("");
                setproductName("");
                setQuantity("");
            })
            .catch((err) => {
                setErrors(err.response.data.errors);


            });
    };

    const handleFileChange = (NewImg) => {
        if (NewImg) {
            const files = Array.from(NewImg);

            const promises = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener("load", (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener("error", reject);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then(
                (images) => {
                    setImage((prev) => [...prev, images]);
                },
                (error) => {
                    console.error(error);
                }
            );
        }
        if (props.onChange !== undefined) {
            props.onChange(e);
        }
    };
    // create a function to add to variables
    function add()
    {
    
}
    const handlefile = (file) => {
        let newFiles = Array.from(file);

        setImage((prev) => [...prev, newFiles]);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        let imagefiledata = [];
         for (let i = 0; i < image.length; i++) {
             const element = image[i];
             element.forEach((gal) => {
                fd.append('image[]', gal)
             });
         }
        //  console.log(fd.getAll("image[]"));
        fd.append("productName", productName);
        fd.append("Product_category", productCategory);
        fd.append("Price", Price);
        fd.append("ProductDesc", ProductDesc);
        fd.append("Quantity", Quantity);
        fd.append("Location", Location);

        const imagedata = new FormData();

        if (updateState) {
            axios.post(`/api/product/update/${productId}`, fd).then((res) => {
                setLocation("");
                setPrice("");
                setLocation("");
                setProductDesc("");
                setProductCategory("");
                setproductName("");
                setQuantity("");
                props.history.push("/products");
            });
        } else {
            axios
                .post("/api/product/store", fd)
                .then((result) => {
                   

                    setLocation("");
                    setPrice("");
                    setLocation("");
                    setProductDesc("");
                    setProductCategory("");
                    setproductName("");
                    setQuantity("");
                    imagefiledata = [];

                    props.history.push("/products");
                })
                .catch((err) => {
                    imagefiledata = [];
                    if (err.response.status === 422) {
                        setErrors(err.response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            <div className="header my-3">
                <div className="line"></div>
                <h2 className="text-center px-5 mx-5">
                    <strong>
                        {updateState ? "Update Product" : "Create Product"}
                    </strong>
                </h2>
            </div>

            <div className="ProductCreateContainer ">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="">
                        <div className="form-group">
                            <label>ProductName:</label>
                            <input
                                type="text"
                                className={`form-control ${
                                    hasErrorFor("productName")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                id="productName"
                                placeholder="product Name"
                                name="productName"
                                value={productName}
                                onChange={(e) => {
                                    setproductName(
                                        e.target.value.replace(/[^A-Za-z]/g, "")
                                    );
                                }}
                                required
                            />
                            {renderErrorFor("productName")}
                        </div>
                        {/* end of product Name */}
                        <div className="form-group">
                            <label>Price (per unit):</label>
                            <input
                                type="number"
                                className={`form-control ${
                                    hasErrorFor("Price") ? "is-invalid" : ""
                                }`}
                                id="Price"
                                placeholder="Price"
                                min ={0}
                                name="Price"
                                value={Price}
                                onChange={(e) => {
                                    setPrice(
                                        e.target.value.replace(/[^0-9]/g, "")
                                    );
                                }}
                                required
                            />
                            {renderErrorFor("Price")}
                        </div>
                        {/* end of price */}

                        <div className="form-group">
                            <label>Quantity(units):</label>
                            <input
                                type="number"
                                className={`form-control ${
                                    hasErrorFor("Quantity") ? "is-invalid" : ""
                                }`}
                                id="Quantity"
                                placeholder="Quantity"
                                name="Quantity"
                                value={Quantity}
                                onChange={(e) => {
                                    setQuantity(
                                        e.target.value.replace(/[^0-9]/g, "")
                                    );
                                }}
                                required
                            />
                            {renderErrorFor("imageName")}
                        </div>
                        {/* end of quantity */}
                        {/*  */}
                        <div className="form-group">
                            <label>Product Description:</label>
                            <textarea
                                type="text"
                                className={`form-control ${
                                    hasErrorFor("ProductDesc")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                id="ProductDesc"
                                placeholder="Product Description"
                                name="ProductDesc"
                                value={ProductDesc}
                                onChange={(e) => {
                                    setProductDesc(e.target.value);
                                }}
                                required
                                maxLength={510}
                            />
                            {renderErrorFor("ProductDesc")}
                        </div>
                        <label>Location:</label>
                        <select
                            ref={countyRef}
                            className={`form-control ${
                                hasErrorFor("Location") ? "is-invalid" : ""
                            }`}
                            name="county"
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="Baringo">Baringo</option>
                            <option value="Bomet">Bomet</option>
                            <option value="Bungoma">Bungoma</option>
                            <option value="Busia">Busia</option>
                            <option value="Elgeyo-Marakwet">
                                Elgeyo-Marakwet
                            </option>
                            <option value="Embu">Embu</option>
                            <option value="Garissa">Garissa</option>
                            <option value="Homa Bay">Homa Bay</option>
                            <option value="Isiolo">Isiolo</option>
                            <option value="Kajiado">Kajiado</option>
                            <option value="Kakamega">Kakamega</option>
                            <option value="Kericho">Kericho</option>
                            <option value="Kiambu">Kiambu</option>
                            <option value="Kilifi">Kilifi</option>
                            <option value="Kirinyaga">Kirinyaga</option>
                            <option value="Kisii">Kisii</option>
                            <option value="Kisumu">Kisumu</option>
                            <option value="Kitui">Kitui</option>
                            <option value="Kwale">Kwale</option>
                            <option value="Laikipia">Laikipia</option>
                            <option value="Lamu">Lamu</option>
                            <option value="Machakos">Machakos</option>
                            <option value="Makueni">Makueni</option>
                            <option value="Mandera">Mandera</option>
                            <option value="Marsabit">Marsabit</option>
                            <option value="Meru">Meru</option>
                            <option value="Migori">Migori</option>
                            <option value="Mombasa">Mombasa</option>
                            <option value="Murang'a">Murang'a</option>
                            <option value="Nairobi-City">Nairobi City</option>
                            <option value="Nakuru">Nakuru</option>
                            <option value="Nandi">Nandi</option>
                            <option value="Narok">Narok</option>
                            <option value="Nyamira">Nyamira</option>
                            <option value="Nyandarua">Nyandarua</option>
                            <option value="Nyeri">Nyeri</option>
                            <option value="Samburu">Samburu</option>
                            <option value="Siaya">Siaya</option>
                            <option value="Taita-Taveta">Taita-Taveta</option>
                            <option value="Tana-River">Tana River</option>
                            <option value="Tharaka-Nithi">Tharaka-Nithi</option>
                            <option value="Trans-Nzoia">Trans Nzoia</option>
                            <option value="Turkana">Turkana</option>
                            <option value="Uasin-Gishu">Uasin Gishu</option>
                            <option value="Vihiga">Vihiga</option>
                            <option value="West-Pokot">West Pokot</option>
                            <option value="wajir">wajir</option>
                        </select>
                        {renderErrorFor("Location")}
                        <br />
                        {/* Location */}
                        <label>ProductCategory:</label>
                        <select
                            ref={categoryRef}
                            name="ProductCategories"
                            className={`form-control ${
                                hasErrorFor("Product_category")
                                    ? "is-invalid"
                                    : ""
                            }`}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option value="1">Aquaculture</option>
                            <option value="2">Horticulture</option>
                            <option value="3">LiveStock</option>
                        </select>
                        {renderErrorFor("Product_category")}
                        {/* end of Product Category */}

                        <div className="custom-file pb-3 my-4">
                            <input
                                multiple
                                type="file"
                                className={`form-control custom-file-input ${
                                    hasErrorFor("image") ? "is-invalid" : ""
                                }`}
                                onChange={(e) => handlefile(e.target.files)}
                            />
                            <label className="custom-file-label">
                                choose an image
                            </label>

                            {renderErrorFor("image")}
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Link to="/products" className="btn btn-danger">
                            Close
                        </Link>
                        <input
                            type="submit"
                            className="btn btn-success"
                            value=" Save"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
