import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export default function contactMessages() {
    const [fetchedMessages, setfetchedMessages] = useState([]);
    const [imageDeleteId, setDeleteId] = useState(0);

    const modalDelete = useRef({});
    const handleDelete = (id) => {
        $(modalDelete.current)?.modal("show");
        return setDeleteId(id);
    };
    const [succ, setSucc] = useState("");
    const [feedback, setFeedback] = useState(false);
    const removeTour = (id) => {
        const newImg = fetchedMessages.filter((item) => item.id !== id);
        setfetchedMessages(newImg);
    };
    
    // fetching all user compplains
    const getMessages = async () => {
        try {
            await axios.get("api/contact").then(res =>
            {
                setfetchedMessages(res.data)
            });
        } catch (error) {}
    };
    useEffect(() =>
    {
        getMessages();
        return () =>
        {
            
        }
    }, []);
    return (
        <div>
            <div className="modal fade" id="modal-default" ref={modalDelete}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete Message</h4>
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
                                <h5>
                                    do you relay want to Delete this Message ?
                                </h5>
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
                                                `/api/Expense/${imageDeleteId}`
                                            )
                                            .then((response) => {
                                                removeTour(imageDeleteId);
                                                $(modalDelete.current).modal(
                                                    "hide"
                                                );

                                                setFeedback(true);
                                                setTimeout(() => {
                                                    setFeedback(false);
                                                }, 2500);
                                                setSucc(
                                                    "Expense Deleted Succcessively"
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
            <div className="table-responsive-sm ExpenseTable ">
                <table className="table table-striped " >
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedMessages.map((items) => {
                            return (
                                <React.Fragment key={items.id}>
                                    <tr>
                                        <td>{items.id}</td>
                                        <td>{items.Name}</td>
                                        <td>{items.Email}</td>
                                        <td>{items.subject}</td>
                                        <td>{items.message}</td>
                                        <td>
                                            <i
                                                style={{ cursor: "pointer" }}
                                                className="fa fa-trash text-danger"
                                                onClick={() =>
                                                    handleDelete(items.id)
                                                }
                                            ></i>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
