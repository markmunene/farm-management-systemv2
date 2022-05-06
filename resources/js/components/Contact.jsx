import React,{useState, useEffect} from 'react'

import './contact.css'
import { useContacts } from './context/UsersDetails';

export default function Contact()
{
        const [name, setName] = useState("");
        const [Email, setEmail] = useState("");
        const [subject, setsubject] = useState("");
        const [message, setmessage] = useState("");
    const [errors, seterrors] = useState([]);
    const [feedBack, setfeedBack] = useState(false);
    
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
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("mimi ni nani");

        const fd = new FormData();

        fd.append("name", name);
        fd.append("Email", Email);
        fd.append("subject", subject);
        fd.append("message", message);

        axios
            .post("/api/contact/store", fd)
            .then((res) => {
                setName("");
                setEmail("");
                setsubject("");
                setmessage("");
                seterrors([]);
                setTimeout(() => {
                     setfeedBack(false); 
                }, 2500);
                setfeedBack(true)
            })
            .catch((err) => {
               
                seterrors(err.response.data.errors);

                
            });
    };
  
    const { user } = useContacts();
    return (
        <>
            <div className="contactWrapper">
                <div
                    className="missionHeader"
                  
                >
                    <div className="headText ">
                        <h2 className="">Contact us </h2>
                        <h5 className="">Home/Contact Us</h5>
                    </div>
                </div>
                {/*  */}
                <div className="contactUsBody">
                    <div className="contactBodyHeader">
                        <h1>Get In Touch</h1>
                        <div className="divider"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="contactForms w-100 ">
                                <div
                                    className={`${
                                        feedBack
                                            ? "successFeedBack m-3 d-block"
                                            : "successFeedBack d-none"
                                    }`}
                                >
                                    <p className="p-3 ">
                                        Message sent successively
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div
                                        className={`${
                                            Object.keys(user).length === 0
                                                ? " firtRow d-flex"
                                                : " firtRow d-none"
                                        }`}
                                    >
                                        <div className="input-group m-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                            </div>
                                            <input
                                                className={`form-control ${
                                                    hasErrorFor("name")
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                type="text"
                                                name="names"
                                                placeholder="names"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required
                                            />
                                            {renderErrorFor("name")}
                                        </div>

                                        <div className="input-group m-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input
                                                className={`form-control ${
                                                    hasErrorFor("Email")
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                type="Email"
                                                name="Email"
                                                placeholder="Email"
                                                value={Email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />
                                            {renderErrorFor("Email")}
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="input-group m-3 ">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </span>
                                            </div>
                                            <input
                                                className={`form-control ${
                                                    hasErrorFor("subject")
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                type="text"
                                                name="subject"
                                                placeholder="subject"
                                                value={subject}
                                                onChange={(e) =>
                                                    setsubject(e.target.value)
                                                }
                                                required
                                            />
                                            {renderErrorFor("subject")}
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="input-group m-3 ">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-pen-square"></i>
                                                </span>
                                            </div>
                                            <textarea
                                                className={`form-control messageinput ${
                                                    hasErrorFor("message")
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                type=""
                                                name="message"
                                                placeholder="message"
                                                value={message}
                                                onChange={(e) =>
                                                    setmessage(e.target.value)
                                                }
                                                required
                                            />
                                            {renderErrorFor("message")}
                                        </div>
                                    </div>
                                    <div className="d-flex m-2 text-center">
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="contactSubmit p-1"
                                        >
                                            <i className="icofont-paper-plane m-2"></i>
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contactDetails w-100">
                                <h2 className="pl-2 m-3">Contact Details.</h2>
                                <hr />
                                <div className="leftContent ">
                                    <div className="iconSection">
                                        <i className="fa fa-home fa-2x"></i>
                                    </div>
                                    <div className="descriptionSection">
                                        <div>Rosslyn, Lavington </div>
                                        <div>Address 232211</div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="leftContent ">
                                    <div className="iconSection">
                                        <i className="fa fa-mobile-alt fa-2x mr-3"></i>
                                    </div>
                                    <div className="descriptionSection">
                                        <div> +254 704372166 </div>
                                        <div> Mon to Fri 8.00am-6.00pm</div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="leftContent ">
                                    <div className="iconSection">
                                        <i className="fas fa-envelope fa-2x"></i>
                                    </div>
                                    <div className="descriptionSection">
                                        <div> support@phoenixacademy.edu </div>
                                        <div>Always there to help</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
