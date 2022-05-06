import React, { useState, useEffect } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import { useContacts } from "../context/UsersDetails";

const UpdateUser = (props) => {
    const [name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [IdNumber, setIdNumber] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setuserId] = useState("");

    const [role, setRole] = useState();
    const [errors, setErrors] = useState([]);

    const location = useLocation();

    useEffect(() => {
        try {
            if (location.state) {
                setUserData();
            }
        } catch (error) {}
    }, []);
    const setUserData = () => {
        const { data } = location.state;
        setuserId(data.id);
        setName(data.name);
        setEmail(data.email);
        setIdNumber(data.ID_Number);
        setLocation(data.Location);
        setPhoneNumber(data.Phone_Number);
    };

    const { setNewUser } = useContacts();

    const handleSubmit = (e) => {
        e.preventDefault();

        const regData = new FormData();

        regData.append("name", name);
        regData.append("Location", Location);
        regData.append("phoneNumber", phoneNumber);
        regData.append("IdNumber", IdNumber);
        regData.append("email", email);

        regData.append("role", role);

        // axios.defaults.withCredentials = true;

        axios
            .post(`api/updateUsers/${userId}`, regData)
            .then((response) => {
                props.history.push("/admin");

                setNewUser();
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }
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
                            <h2 className="text-center text-info">Update User</h2>
                        </div>

                        <div className="card-body">
                            <div className="text-center">
                                <img
                                    src="./img/avatar.png"
                                    alt=""
                                    className="img-fluid mx-auto"
                                    style={{
                                        borderRadius: "50%",
                                        width: "100px",
                                        height: "100px",
                                    }}
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        className={`form-control ${
                                            hasErrorFor("name")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("name")}
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className={`form-control ${
                                            hasErrorFor("email")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("email")}
                                </div>
                                <label>Location:</label>
                                <select
                                    className={`form-control ${
                                        hasErrorFor("Location")
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    name="county"
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
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
                                    <option value="Nairobi-City">
                                        Nairobi City
                                    </option>
                                    <option value="Nakuru">Nakuru</option>
                                    <option value="Nandi">Nandi</option>
                                    <option value="Narok">Narok</option>
                                    <option value="Nyamira">Nyamira</option>
                                    <option value="Nyandarua">Nyandarua</option>
                                    <option value="Nyeri">Nyeri</option>
                                    <option value="Samburu">Samburu</option>
                                    <option value="Siaya">Siaya</option>
                                    <option value="Taita-Taveta">
                                        Taita-Taveta
                                    </option>
                                    <option value="Tana-River">
                                        Tana River
                                    </option>
                                    <option value="Tharaka-Nithi">
                                        Tharaka-Nithi
                                    </option>
                                    <option value="Trans-Nzoia">
                                        Trans Nzoia
                                    </option>
                                    <option value="Turkana">Turkana</option>
                                    <option value="Uasin-Gishu">
                                        Uasin Gishu
                                    </option>
                                    <option value="Vihiga">Vihiga</option>
                                    <option value="West-Pokot">
                                        West Pokot
                                    </option>
                                    <option value="wajir">wajir</option>
                                </select>
                                {renderErrorFor("Location")}
                                <br />

                                <div className="form-group">
                                    <label>Phone Number:</label>
                                    <input
                                        id="phoneNumber"
                                        type="text"
                                        minLength={10}
                                        onInput={(e) =>
                                            (phoneNumber =
                                                e.target.value.splice(0, 10))
                                        }
                                        placeholder="Phone Number"
                                        className={`form-control ${
                                            hasErrorFor("Phone_Number")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("Phone_Number")}
                                </div>
                                <div className="form-group">
                                    <label>IdNO:</label>
                                    <input
                                        id="IdNumber"
                                        minLength={8}
                                        type="text"
                                        placeholder="Id Number"
                                        className={`form-control ${
                                            hasErrorFor("ID_Number")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        required
                                        value={IdNumber}
                                        onChange={(e) => {
                                            setIdNumber(e.target.value);
                                        }}
                                    />
                                    {renderErrorFor("ID_Number")}
                                </div>

                                <label>UserRole</label>
                                <select
                                    name=""
                                    id=""
                                    className="form-control mb-3"
                                    onChange={ (e)=>setRole(e.target.value)}
                                >
                                    <option value="">Select User Role</option>
                                    <option value="1">Farmer</option>
                                    <option value="2">Expert</option>
                                    <option value="3">Buyer</option>
                                    <option value="4">Admin</option>
                                </select>

                                <div className="text-center mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success"
                                    >
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
