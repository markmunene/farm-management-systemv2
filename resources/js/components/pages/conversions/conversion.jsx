import React, { useState, useEffect,useRef } from 'react'

import { useContacts } from '../../context/UsersDetails';
export default function Conversion({ sendCurrentConId, FarmerConversions, authId }) {
    const ConRecivers = useRef([]);
    const Consenders = useRef([]);
    const [conDeleteId, setconDeleteId] = useState(0)
    const [conversationSearch, setconversationSearch] = useState("");

    const [checkRec, setCheckRec] = useState(true)
    const { contacts } = useContacts();

    const modalDelete = useRef({});


       const removeConversation = (id) => {
           return FarmerConversions.filter((item) => item.id !== id);

           
       };

    // console.log(authId);
    const handleDelete = (id) =>
    {
        setconDeleteId(id)
        $(modalDelete.current).modal('show')
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search From Conversions"
                className="farmerMenuInput form-control"
                value={conversationSearch}
                onChange={(e) => setconversationSearch(e.target.value)}
            />
            {FarmerConversions.map((items, index) => {
                return (
                    <React.Fragment key={items.id}>
                        <div
                            className="modal fade"
                            id="modal-default"
                            ref={modalDelete}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">
                                            Delete Main section
                                        </h4>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">
                                                &times;
                                            </span>
                                        </button>
                                    </div>

                                    <div className="modal-body">
                                        <center>
                                            <h5>
                                                do you relay want to Delete this
                                                Coversation?
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
                                                            `/api/deleteConversion/${conDeleteId}`
                                                        )
                                                        .then((response) => {
                                                            removeConversation(
                                                                conDeleteId
                                                            );

                                                            $(
                                                                modalDelete.current
                                                            ).modal("hide");
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

                        <div className="converion m-1">
                            <button
                                className="conversationDelete"
                                onClick={() => {
                                    handleDelete(items.id);
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div
                                role="button"
                                className="converionName d-flex btn"
                                onClick={() =>
                                    sendCurrentConId(items.id, items)
                                }
                            >
                                {/* <img
                                src="./img/avatar.png"
                                alt=""
                                className="coversionImage"
                            /> */}
                                <div className="userRole">
                                    {items.conType == 2 ? "EX" : "FA"}
                                </div>

                                <span className=" pl-2 conName">
                                    {/* <span>{cons.name}</span>; */}
                                    {contacts
                                        .filter((cons) => {
                                            if (
                                                items.Receiver_id == cons.id &&
                                                items.Receiver_id != authId
                                            ) {
                                                return cons;
                                            }
                                        })
                                        .filter((items) => {
                                            if (
                                                items.name
                                                    .toLowerCase()
                                                    .includes(
                                                        conversationSearch.toLowerCase()
                                                    )
                                            ) {
                                                return items;
                                            }
                                        })
                                        .map((item) => (
                                            <React.Fragment key={item.id}>
                                                <span>{item.name}</span>
                                            </React.Fragment>
                                        ))}
                                    {contacts
                                        .filter((cons) => {
                                            if (
                                                items.Sender_id === cons.id &&
                                                items.Receiver_id === authId
                                            ) {
                                                return cons;
                                            }
                                        })
                                        .filter((items) => {
                                            if (
                                                items.name
                                                    .toLowerCase()
                                                    .includes(
                                                        conversationSearch.toLowerCase()
                                                    )
                                            ) {
                                                return items;
                                            }
                                        })
                                        .map((item) => (
                                            <React.Fragment key={item.id}>
                                                <span>{item.name}</span>
                                            </React.Fragment>
                                        ))}
                                </span>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
        </>
    );
}
