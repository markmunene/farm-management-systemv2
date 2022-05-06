import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    useCallback,
} from "react";

import Conversion from "./conversions/conversion.jsx";
import Message from "./messages/message.jsx";
import ExpertCons from "./conversions/expertConversion.jsx";
import "./homechat.css";
import { useContacts } from "../context/UsersDetails.js";

// import AuthContext from "../context/AuthContext.js";
import { io } from "socket.io-client";
import axios from "axios";
export default function homeChat() {
    const { contacts, user, filterSingleUserDetails } = useContacts();
    const ExpertConsRef = useRef();
    const conversationRef = useRef();

    const Scroll = useCallback((node) => {
        node?.scrollIntoView({ behavior: "smooth" });
    }, []);
    // declaring react state for data management
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [messageinput, setmessageinput] = useState("");
    const [farmerSearch, setfarmerSearch] = useState("");
    const [expertSearch, setExpertSearch] = useState("");
    const [conversionName, setconversationName] = useState("");
    const [currentId, setCurrentId] = useState([]);
    const [expertCon, setepertCon] = useState([]);
    const [farmerCon, setfarmerCon] = useState([]);

    const [fetchedMessages, setfetchedMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [conMembers, setconMembers] = useState([]);
    const [showFarmContacts, setshowFarmContacts] = useState(true);
    const [showExpeContacts, setshowExpeContacts] = useState(true);
    const [showinitialMessage, setshowinitialMessage] = useState(true);
    const [ToggleConversations, setToggleConversations] = useState(true);
    const [conChange, setconChange] = useState(1);
    const [feedBack, setfeedBack] = useState("");
    const [conExist, setconExist] = useState([]);


    const conTrue = useRef(1);
    const socket = useRef();
    // recieving a messages on page refresh
    useEffect(() => {
        socket.current = io("ws://localhost:3000");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                Sender_id: data.senderId,
                conid: data.Conver_id,
                Text: data.text,
                created_at: Date.now(),
            });
        });
        socket.current.emit("addUser", user.id);
    }, []);
    useEffect(() => {
        arrivalMessage &&
            conMembers.id === arrivalMessage.conid &&
            // adding new mes to messageState
            setNewMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentId]);

    // fetching messages
    useEffect(() => {
        fetchingAllMessages();
        // return () => {};
    }, [currentId]);
    const fetchmesages = async (id) => {
        await axios.get(`/api/chat/${id}/edit`).then((res) => {
            setfetchedMessages(res.data);
        });
    };
    const fetchingAllMessages = async () => {
        await axios.get(`/api/chat`).then((res) => {
            setfetchedMessages(res.data);
        });
    };

    useEffect(() => {
        filterexperts();
        fetchingAllMessages();
        axios.get("api/fetchConvs").then((res) => {
            setfarmerCon(res.data);
        });

        // scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        return () => {};
    }, []);
    useEffect(() => {
        socket.current.emit("addUser", user.id);
        socket.current.on("getUsers", (users) => {});
    }, [user.id]);

    // user  contacts
    // function to display expert names for conversion  creation
    const expertNames = () => {
        return (
            <>
                <div>
                    <div className="expertrMenu">
                        <div className="farmersMenuWrapper">
                            <input
                                type="text"
                                placeholder="search for experts names"
                                className="farmerMenuInput form-control"
                                value={expertSearch}
                                onChange={(e) =>
                                    setExpertSearch(e.target.value)
                                }
                            />
                            {contacts
                                .filter((items) => {
                                    if (
                                        items.User_Role == 2 &&
                                        user.id != items.id
                                    ) {
                                        return items;
                                    }
                                })
                                .filter((items) => {
                                    if (
                                        items.name
                                            .toLowerCase()
                                            .includes(
                                                expertSearch.toLowerCase()
                                            )
                                    ) {
                                        return items;
                                    }
                                })
                                .map((names, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div
                                                onClick={() => {
                                                    createFarmerConversion(
                                                        names.id,
                                                        2
                                                    );
                                                }}
                                                className="contacts"
                                            >
                                                <img
                                                    src="./img/img_avatar4.png"
                                                    alt=""
                                                    className="coversionImage"
                                                />
                                                <React.Fragment>
                                                    <span className="converionName pl-2">
                                                        {names.name} {names.id}
                                                    </span>
                                                </React.Fragment>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </>
        );
    };
    const filterexperts = () => {
        farmerCon.filter((items, i) => {
            if (items.User_Role == 2) {
                return setepertCon((prev) => [...prev, items.name]);
            }
        });
    };

    let test = [];
    // creating farmer conversion
    const createFarmerConversion = (userId, contype) => {
        test.push(userId);
        setconExist(userId);
        let Sender_id = user.id;
        let Receiver_id = userId;

        const fd = new FormData();
        fd.append("Sender_id", Sender_id);
        fd.append("Receiver_id", Receiver_id);
        fd.append("conType", contype);

        farmerCon?.forEach((items) => {
            if (
                items.Sender_id === Sender_id &&
                items.Receiver_id === Receiver_id
            ) {
                return (conTrue.current = 2);
            } else if (
                items.Receiver_id === Sender_id &&
                items.Sender_id === Receiver_id
            ) {
                fetchmesages(items.id);
                return (conTrue.current = 2);
            }
        });

        if (conTrue.current == 1 && Sender_id != Receiver_id) {
            axios
                .post("api/storeConvs", fd)
                .then((res) => {
                    setconExist(res.status);
                    conTrue.current = 1;
                    axios.get("api/fetchConvs").then((res) => {
                        setfarmerCon(res.data);
                        window.alert('conversation Created');
                    });
                    filterexperts();
                    // console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // function to display farmer names for conversion  creation
    const farmerContacts = () => {
        return (
            <>
                <div>
                    <div className="farmermenu">
                        <div className="farmersMenuWrapper">
                            <input
                                type="text"
                                placeholder="search for farmer names"
                                className="farmerMenuInput form-control"
                                value={farmerSearch}
                                onChange={(e) =>
                                    setfarmerSearch(e.target.value)
                                }
                            />
                            {contacts
                                .filter((items) => {
                                    if (
                                        items.User_Role != 2 &&
                                        user.id != items.id
                                    ) {
                                        return items;
                                    }
                                })
                                .filter((items) => {
                                    if (
                                        items.name
                                            .toLowerCase()
                                            .includes(
                                                farmerSearch.toLowerCase()
                                            )
                                    ) {
                                        return items;
                                    }
                                })
                                .map((names, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div
                                                className="contacts"
                                                key={index}
                                                onClick={() =>
                                                    createFarmerConversion(
                                                        names.id,
                                                        0
                                                    )
                                                }
                                            >
                                                <img
                                                    src="./img/img_avatar4.png"
                                                    alt=""
                                                    className="coversionImage"
                                                />
                                                <React.Fragment>
                                                    <span className="converionName pl-2">
                                                        {names.name} {names.id}
                                                    </span>
                                                </React.Fragment>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const sendCurrentConId = (currentConId, currentConMembers) => {
        setCurrentId(currentConId);
        setconMembers(currentConMembers);
        setshowinitialMessage(false);
        fetchedMessages.forEach((items) => {
            if (items.Conversion_id === currentConId) {
                setNewMessages((prev) => [...prev, items]);
                setconChange(2);
                // getting the conesation counter part
            }
        });
        let name1 = filterSingleUserDetails(currentConMembers.Sender_id);
        let name2 = filterSingleUserDetails(currentConMembers.Receiver_id);

        let combinedname = name1[0].name + " & " + name2[0].name;
        setconversationName(combinedname);

        if (conChange == 2) {
            setconChange(1);
            setNewMessages([]);
        }

        // console.log(currentConId);
    };

    const handleMessageSubmit = (event) => {
        event.preventDefault();
        const ReceiverId = conMembers.Receiver_id;

        // broadcasting a mesage using socket
        if (messageinput !== "") {
            socket.current.emit("sendMessage", {
                senderId: user.id,
                Conver_id: currentId,
                ReceiverId,
                text: messageinput,
            });

            const messageData = {
                text: messageinput,
                Conversation_id: currentId,
            };

            axios
                .post("api/chat", messageData)
                .then((res) => {
                    setfeedBack(res.status);
                    console.log(feedBack);
                    setmessageinput("");
                })
                .then((res) => {
                    // setting up the socket.io
                });
        }
    };

    const renderContacts = () => {
        setshowExpeContacts(!showExpeContacts);
    };

    const handleToggleConvs = () => {
        setToggleConversations(!ToggleConversations);
    };

    const renderFarmerNames = () => {
        setshowFarmContacts(!showFarmContacts);
    };
    const showConversations = () => {
        setToggleConversations(!ToggleConversations);

        if (ToggleConversations) {
            ExpertConsRef.current.style.display = "block";
            conversationRef.current.style.display = "block";
        } else {
            ExpertConsRef.current.style.display = "none";
            conversationRef.current.style.display = "none";
        }
    };
    return (
        <div className="homeChat">
            <div className="showConversation">
                <button
                    className="btn btn-info mx-2"
                    onClick={() => showConversations()}
                >
                    {ToggleConversations
                        ? "show Conversation"
                        : "Hide Conversation"}
                </button>
            </div>
            <div>
                <div className="row ">
                    <div
                        ref={conversationRef}
                        className={"col-md-3 contactSpace "}
                    >
                        {/* <button
                            className="ToggleButton"
                            onClick={() => handleToggleConvs()}
                        >
                            <span>&times;</span>
                        </button> */}
                        <div className="d-flex overflow-auto">
                            <h3 className=" text-info mb-3 mr-3">
                                {showFarmContacts
                                    ? "Farmers Conversions"
                                    : "Farmers Contacts"}
                            </h3>
                            <button
                                className="btn btn-sm btn-success "
                                onClick={renderFarmerNames}
                            >
                                {showFarmContacts
                                    ? "Names ?"
                                    : "Conversions ?"}
                            </button>
                        </div>
                        {showFarmContacts ? (
                            <>
                                <div className="farmerMenu">
                                    <div className="farmersMenuWrapper">
                                        <Conversion
                                            sendCurrentConId={sendCurrentConId}
                                            authId={user.id}
                                            FarmerConversions={farmerCon}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            farmerContacts()
                        )}
                    </div>
                    <div className={"col-md-6"}>
                        <h3 className="text-center mb-2 text-info text-capitalize">
                            Coversation Between {conversionName}
                        </h3>
                        <div className="messageContainer">
                            <div className="messageSpace">
                                {showinitialMessage ? (
                                    <div className="text-center no-conversion">
                                        click on a conversion
                                    </div>
                                ) : (
                                    ""
                                )}

                                {newMessages.map((items, index) => {
                                    return (
                                        <React.Fragment key={items.id}>
                                            <div className="div" ref={Scroll}>
                                                <Message
                                                    own={
                                                        user.id ==
                                                        items.Sender_id
                                                            ? true
                                                            : false
                                                    }
                                                    messages={items}
                                                />
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            <div className="chatBottom d-flex  mt-2">
                                <textarea
                                    className="chatMessageInput form-control"
                                    placeholder="write something"
                                    value={messageinput}
                                    onChange={(e) =>
                                        setmessageinput(e.target.value)
                                    }
                                ></textarea>
                                <button
                                    className="chatInputMssage btn btn-success pl-3"
                                    onClick={handleMessageSubmit}
                                >
                                    send
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*  d-sm-none d-md-block */}
                    <div
                        className={"col-md-3 contactSpace "}
                        ref={ExpertConsRef}
                    >
                        <div className="d-flex">
                            <h3 className=" text-info mr-3">Expert Contacts</h3>
                        </div>
                        {expertNames()}
                    </div>
                </div>
            </div>
        </div>
    );
}
