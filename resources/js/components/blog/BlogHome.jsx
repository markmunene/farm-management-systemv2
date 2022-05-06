import axios from "axios";
import React from "react";
import react , { useState, useEffect } from "react";
import {
    Link,
    withRouter,
    Router,
    Route,
    useRouteMatch,
} from "react-router-dom";
import { useContacts } from "../context/UsersDetails";

import "./blog.css";
import SinglePost from "./SinglePost.jsx";


export default function BlogHome(props)
{
  
    const { filterSingleUserDetails, user } = useContacts();
    const { url } = useRouteMatch(); 
    
    const [post, setPost] = useState([]);
    const [blogSearch, setBlogSearch] = useState([]);
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await axios.get("/api/blog").then((response) => {
                    setPost(response.data);
                });
            } catch (error) {
                console.log(error);
            }
        };
        getBlog();
    }, []);
   
    

    return (
        <>
            <div className="blogwrap">
                <div className="header">
                    <div className="line"></div>
                    <h2 className="text-center">Blog</h2>
                </div>
                <div className="blogbody ">
                    <div className="row ">
                        <div className="col-md-9 ">
                            <div className="gridParent ">
                                {post
                                    .filter((filteredPost) => {
                                        if (blogSearch == "") {
                                            return filteredPost;
                                        } else if (
                                            filteredPost.Title.toLowerCase().includes(
                                                blogSearch.toLowerCase()
                                            )
                                        ) {
                                            return filteredPost;
                                        }
                                    })
                                    .map((items, index) => {
                                        return (
                                            <React.Fragment key={items.id}>
                                                {items == null ? (
                                                    <center>
                                                        <h2>
                                                            no post available
                                                        </h2>
                                                    </center>
                                                ) : (
                                                        <Link
                                                            className=""
                                                        to={{
                                                            pathname: `/singlePost`,
                                                            state: {
                                                                post: items,
                                                            },
                                                        }}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            color: "black",
                                                        }}
                                                    >
                                                        <div className="blogContainer   ">
                                                            <div className="">
                                                                <div className="mainContent">
                                                                    <div className="imageContainer">
                                                                        <img
                                                                            src={
                                                                                "./uploadedImages/" +
                                                                                items.Image_name
                                                                            }
                                                                            alt=""
                                                                            className=" img-fluid
                                                                 blogimage"
                                                                        />
                                                                    </div>
                                                                    <div className=" titleWrap">
                                                                        <div className=" blogTitle mr-3 text-info">
                                                                            {items.Title.substr(
                                                                                0,
                                                                                20
                                                                            )}
                                                                            {items
                                                                                .Title
                                                                                .length >=
                                                                            20
                                                                                ? "..."
                                                                                : ""}
                                                                        </div>
                                                                        <div className=" ">
                                                                            Author::
                                                                            {filterSingleUserDetails(
                                                                                items.User_id
                                                                            ).map(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.name
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <br />
                                                                    <div className="blogDesc">
                                                                        {items.description.substr(
                                                                            0,
                                                                            100
                                                                        )}
                                                                        {items
                                                                            .description
                                                                            .length >=
                                                                        100
                                                                            ? "..."
                                                                            : ""}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="searchInput">
                                <div className="serahcTitle d-flex justify-content-center">
                                    <h4>Search for Blog Post</h4>
                                </div>
                                <div className="inputForm">
                                    <div
                                        className="form-group input-group-sm my-2"
                                        style={{
                                            width: "200px",
                                        }}
                                    >
                                        <label htmlFor="">Search By BlogTitle:</label>
                                        <input
                                            className={`form-control `}
                                            type="text"
                                            name="search"
                                            placeholder="search post"
                                            value={blogSearch}
                                            onChange={(e) =>
                                                setBlogSearch(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <hr/>
                                    {user.User_Role == 2 ? (
                                        <Link
                                            className=" btn btn-info mt-2"
                                            to="/create"
                                        >
                                            Create Post ?
                                        </Link>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
