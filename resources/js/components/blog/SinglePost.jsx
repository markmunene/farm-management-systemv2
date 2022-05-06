import axios from "axios";
import moment from "moment";

import React, { useEffect,useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useParams, Link, } from "react-router-dom";

import { useContacts } from "../context/UsersDetails";


export default function SinglePost(props)
{
    const modalDelete = useRef({});
    const { user, filterSingleUserDetails } = useContacts();
    const [single, setsinglePost] = useState([]);

    const location = useLocation();
    const { post } = location.state;

    useEffect(() => {
        setsinglePost(post);
    }, []);

 
    
    const deleteBlog = async () =>
    {
        try {
           await axios.delete(`/api/blog/${post.id}`).then((response) => {
               props.history.push('/blogHome');
            });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="modal fade" id="modal-default" ref={modalDelete}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete Staff</h4>
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
                                <h5>do you relay want to Delete this Post ?</h5>
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
                                            .delete(`/api/blog/${post.id}`)
                                            .then((response) => {
                                                $(modalDelete.current).modal(
                                                    "hide"
                                                );

                                                props.history.push("/blogHome");
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
            <div className="singlewrapper container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="">
                            <div className="imagewrapper">
                                <img
                                    src={
                                        "../uploadedImages/" + single.Image_name
                                    }
                                    alt=""
                                    className=" img-fluid
                                                    singleImage"
                                />
                            </div>
                            <div className="singleTitle ">
                                <div className="float-left d-flex align-items-center ">
                                    <div className="singleBlogTitle">
                                        {single.Title}
                                    </div>
                                </div>

                                <div className="float-right">
                                    {user.id != single.User_id  ? (
                                        ""
                                    ) : (
                                        <>
                                            <button
                                                className=" ml-4 updatebtn btn btn-danger"
                                                onClick={() =>
                                                    $(
                                                        modalDelete.current
                                                    ).modal("show")
                                                }
                                            >
                                                <i className="icofont-ui-delete "></i>
                                            </button>
                                            <Link
                                                to={{
                                                    pathname: "/create",
                                                    state: {
                                                        updateRequest: true,
                                                        data: post,
                                                    },
                                                }}
                                                className="btn btn-success ml-4"
                                            >
                                                <i className="icofont-ui-edit  updatebtn "></i>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="authorSection">
                                <p>
                                    Author::
                                    {filterSingleUserDetails(
                                        single.User_id
                                    ).map((item) => item.name)}
                                </p>
                                <span>
                                    {moment(single.created_at).fromNow()}
                                </span>
                            </div>
                            <div
                                className="description"
                                dangerouslySetInnerHTML={{
                                    __html: single.description,
                                }}
                            >
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="aboutAuthor">
                            <div className="title">
                                <p>About::{single.User_name}</p>
                            </div>
                            <div className="authoorImageWrapper">
                                <img
                                    src={
                                        "../uploadedImages/" + single.Image_name
                                    }
                                    alt=""
                                    className=" img-fluid
                                                    AuthorImage"
                                />
                            </div>
                            <div className="authorDesc">
                                All content provided on this blog module is for
                                informational purposes only. MFarmmg makes no
                                representations as to the accuracy or
                                completeness of any information on this module
                                or found by following any link on this module.
                                MFarm will not be liable for any errors or
                                omissions in this information nor for the
                                availability of this information. MFarm will not
                                be liable for any losses, injuries, or damages
                                from the display or use of this information.
                                This terms and conditions are subject to change
                                at any-time with or without notice.
                            </div>
                            <Link
                                to={{
                                    pathname: "/homechat",
                                    state: { user: single.User_id },
                                }}
                                className="btn btn-success"
                            >
                                Send Message
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
