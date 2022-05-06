import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import "./create.css";

const Create = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [FarmBlogImage, setFarmBlogImage] = useState("");
    const [updateState, setupdateState] = useState(false);
    const [updateData2, setupdateData2] = useState([]);
    const [Errors, setErrors] = useState([]);

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
        setTitle(data.Title);
        setDescription(data.description);
    };

    // handling the image
    const handlefile = (file) => {
        setFarmBlogImage(file[0]);
    };

    const handlesubmit = (e) => {
        e.preventDefault();

        if (updateState) {
            const updateData = {
                title: title,
                description: description,
            };

            axios
                .patch(`/api/blog/${updateData2.id}`, updateData)
                .then((result) => {
                    props.history.push("/bloghome");
                })
                .catch((err) =>
                {
                       if (err.response.status === 422) {
                           setErrors(err.response.data.errors);
                       }
                    // console.log(err);
                });
        } else {
            const fd = new FormData();
            fd.append("FarmBlogImage", FarmBlogImage);
            // console.log(FarmBlogImage);
            fd.append("title", title);
            fd.append(" description", description);
            axios
                .post("/api/blog", fd, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
                .then((result) => {
                    props.history.push("/bloghome");
                })
                .catch((err) =>
                {
                    if (err.response.status ===422) {
                        setErrors(err.response.data.errors);
                    }
                    // console.log(err);
                });
        }
    };

    const stylesCreate = {
        margin: "150px",
    };
    return (
        <>
            <div className="CreateBlogcontainer">
                <div className="row justify-content-center">
                    <div style={stylesCreate} className="col">
                        <h2 className="text-center text-info ">
                            {updateState ? "Update Post" : " Create a Post"}
                        </h2>
                        <form
                            onSubmit={handlesubmit}
                            encType="multipart/form-data"
                            style={{ width: "600px" }}
                        >
                            <div className="form-group">
                                <label>title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="title"
                                    name="title"
                                    maxLength={50}
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(
                                            e.target.value
                                        );
                                    }}
                                    required
                                />
                            </div>

                            <div className="form-group ">
                                <label>description:</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    id="comment"
                                    name="description"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    required
                                ></textarea>
                            </div>

                            <div className="custom-file pb-3">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="FarmBlogImage"
                                    onChange={(e) => handlefile(e.target.files)}
                                />
                                <label className="custom-file-label">
                                    choose an image
                                </label>
                            </div>

                            <input
                                type="submit"
                                value={`${updateState ? "Update" : "Submit"}`}
                                className="text-center btn btn-success mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;
