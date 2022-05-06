import axios from "axios";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContacts } from "../context/UsersDetails";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { setNewUser } = useContacts();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/login", {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    setErrors([]);
                    setEmail("");
                    setPassword("");
                    setNewUser();
                    props.history.push("/products");
                })
                .catch((err) => {
                      if (err.response.status === 422) {
                          setErrors(err.response.data.errors);
                      }
                });
        });
    };

    const hasErrorFor = (field) => {
        return !!errors[field];
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
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center text-info">AIM FarmMg Login</h2>
                        </div>

                        <div className="card-body">
                            <div className="mx-auto">
                                <img
                                    src="./img/avatar.png"
                                    alt=""
                                    className="img-fluid mx-auto"
                                    style={{
                                        borderRadius: "50%",
                                        width: "200px",
                                        position: "relative",
                                        left: "30%",
                                        height: "200px",
                                    }}
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            email
                                        </span>
                                    </div>
                                    <input
                                        className={`form-control ${
                                            hasErrorFor("email")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                    {renderErrorFor("email")}
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            {" "}
                                            password
                                        </span>
                                    </div>
                                    <input
                                        className={`form-control ${
                                            hasErrorFor("Password")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                    {renderErrorFor("password")}
                                </div>

                                <div className="d-flex">
                                    <Link to="/" className="">
                                        forgot password ?
                                    </Link>

                                    <div
                                        className="text-center"
                                        style={{
                                            position: "relative",
                                            left: "15%",
                                        }}
                                    >
                                        <input
                                            type="submit"
                                            className="btn btn-outline-success mr-4"
                                            value="login"
                                            name="login"
                                            style={{
                                                borderRadius: "25px",
                                            }}
                                        />

                                        <Link
                                            to="/"
                                            className="btn btn-danger btn-sm "
                                        >
                                            cancel
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
