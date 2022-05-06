import React, { useState, useEffect, useRef } from "react";

import { Link, Route, useRouteMatch } from "react-router-dom";
import CreateAdmin from "./CreateAdmin";
import ContactMessages from "./contactMessages";
import AllStat from "./AllStat";
import "./Admin.css";

export default function AdminDashBord() {
    // const { url, path } = useRouteMatch();

    return (
        <>
            <div className="dashBoardAdminWrapper ">
                <div className="sideBar ml-4">
                    <h3 className="text-center">Admin </h3>

                    <div className="sideDecoration"></div>
                    <ul className="nav flex-column ">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#dashboardTab"
                                role="button"
                                data-toggle="tab"
                            >
                                <i className="fa fa-home mr-2"></i>
                                <span> Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#messageTab"
                                data-toggle="tab"
                            >
                                <i className="fa fa-comment mr-2"></i>
                                <span>Messages</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" data-toggle="tab">
                                <i className="fa fa-check-double mr-2"></i>{" "}
                                <span> Total</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link disabled"
                                href="#"
                                data-toggle="tab"
                            >
                                <i className="fa fa-sign-out-alt mr-2"></i>
                                <span>Disabled</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {/* main section */}
                <div className="AdminmainContent">
                   
                    <div className="tab-content"></div>
                    <div className="tab-content">
                        <div className="tab-pane active " id="dashboardTab">
                            <AllStat />
                        </div>
                        <div className="tab-pane" id="messageTab">
                            <ContactMessages />
                        </div>
                        <div className="tab-pane" id=""></div>
                    </div>
                    {/*  */}
                </div>
            </div>
        </>
    );
}
