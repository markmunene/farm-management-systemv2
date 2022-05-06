import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useContacts } from "../context/UsersDetails.js";

import { useProductsContext } from "../pages/products/ProductContext.jsx";

import { useExpenseContent } from "../pages/ExpenseSection/expenseContext.js";

export default function AllStat() {
    const { allProducts } = useProductsContext();
    const [DeleteId, setDeleteId] = useState(0);
    const [feedback, setFeedback] = useState(false);

    const modalDelete = useRef({});
    const { expenseRecords } = useExpenseContent();
    const { contacts, Farmercontacts, Expertcontacts, BuyerContact } =
        useContacts();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/blog").then((response) => {
            setPosts(response.data);
        });
        return () => {};
    }, []);
    const handleDelete = (id) => {
        $(modalDelete.current)?.modal("show");
        return setDeleteId(id);
    };

    const removeTour = (id) => {
        const newImg = fetchedExpense.filter((item) => item.id !== id);

        setfetchedExpense(newImg);
    };

    // deleteUser
    return (
        <>
            <div className="modal fade" id="modal-default" ref={modalDelete}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete User</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <center>
                                <h5>do you relay want to Delete this User ?</h5>
                            </center>
                        </div>

                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={async () => {
                                    try {
                                        await axios
                                            .delete(
                                                `/api/deleteUser/${DeleteId}`
                                            )
                                            .then((response) => {
                                                removeTour(DeleteId);
                                                $(modalDelete.current).modal(
                                                    "hide"
                                                );

                                                setFeedback(true);
                                                setTimeout(() => {
                                                    setFeedback(false);
                                                }, 2500);
                                                setSucc(
                                                    "User Deleted Succcessively"
                                                );
                                            });
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>
            {/* statistics cards */}
            <div className="AllStatWrapper  my-2">
                <div className="StatCards ">
                    <div className="d-flex">
                        <div className="numbers">
                            <h2>{contacts.length}</h2>
                            <div className="">Users</div>
                        </div>
                        <div className="Staticon ml-2">
                            <i className="fa fa-users fa-3x"></i>
                        </div>
                    </div>
                </div>
                <div className="StatCards ">
                    <div className="d-flex">
                        <div className="numbers">
                            <h2>{Farmercontacts.length}</h2>
                            <div className="">Farmers</div>
                        </div>
                        <div className="Staticon ml-2">
                            <i className="fa fa-users fa-3x"></i>
                        </div>
                    </div>
                </div>
                <div className="StatCards ">
                    <div className="d-flex">
                        <div className="numbers">
                            <h2>{Expertcontacts.length}</h2>
                            <div className="">Experts</div>
                        </div>
                        <div className="Staticon ml-2">
                            <i className="fa fa-users fa-3x"></i>
                        </div>
                    </div>
                </div>

                <div className="StatCards ">
                    <div className="d-flex">
                        <div className="numbers">
                            <h2>{BuyerContact.length}</h2>
                            <div className="">Buyers</div>
                        </div>
                        <div className="Staticon ml-2">
                            <i className="fa fa-users fa-3x"></i>
                        </div>
                    </div>
                </div>

                <div className="StatCards">
                    <div className="d-flex">
                        <div className="numbers">
                            <h2>{allProducts.length}</h2>
                            <div className="">Products</div>
                        </div>
                        <div className="Staticon ml-2">
                            <i className="fa fas-product-hunt fa-3x"></i>
                        </div>
                    </div>
                </div>
                <div className="StatCards">
                    <div className="d-flex">
                        <div className="numbers">
                            <h2>{posts.length}</h2>
                            <div className="">Posts</div>
                        </div>
                        <div className="Staticon ml-2">
                            <i className="fa fa-blog fa-3x"></i>
                        </div>
                    </div>
                </div>
                <div className="StatCards">
                    <div className="d-flex">
                        <div className="numbers">
                            <h2>{expenseRecords.length}</h2>
                            <div className="">Expense T</div>
                        </div>
                        <div className="Staticon ml-2">
                            <i className="fa fa-book fa-3x"></i>
                        </div>
                    </div>
                </div>
            </div>
            {/* all users table */}
            <div className="usersTable">
                <h2 className="text-center">All Users</h2>
                <div className="table-responsive-sm ExpenseTable ">
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>UserRole</th>
                                <th>Phone Number</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((items) => {
                                return (
                                    <React.Fragment key={items.id}>
                                        <tr>
                                            <td>{items.id}</td>
                                            <td>{items.name}</td>
                                            <td>{items.email}</td>
                                            <td>
                                                {items.User_Role == 1 &&
                                                    "farmer"}
                                                {items.User_Role == 2 &&
                                                    "Expert"}
                                                {items.User_Role == 3 &&
                                                    "Buyer"}
                                                {items.User_Role == 4 &&
                                                    "Admin"}
                                            </td>

                                            <td>{items.Phone_Number}</td>

                                            <td className="d-flex">
                                                <i
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    className="fa fa-trash text-danger mr-2"
                                                    onClick={() =>
                                                        handleDelete(items.id)
                                                    }
                                                ></i>
                                                <Link
                                                    to={{
                                                        pathname: "updateUser",
                                                        state: { data: items },
                                                    }}
                                                >
                                                    UpdateUser
                                                </Link>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
