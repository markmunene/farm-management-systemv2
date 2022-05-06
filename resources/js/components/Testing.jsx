import React, { useContext, useState } from "react";

import { useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";

import { useContacts } from "./context/UsersDetails";
import StarRating from "./pages/products/ratingComponent";

export default function Testing() {
    const { value, Farmercontacts } = useContacts();
    const [v, setV] = useState();

    const auth = useContext(AuthContext);

    const rateChanged = (l) => {
        console.log("in testing" + l);
    };
    return (
        <>
            <center className="testingWrapper">
                <h2>working fine men {auth.User_Role}</h2>

                {Farmercontacts?.map((items, i) => {
                    return (
                        <>
                            <h1 key={i}>{items}</h1>
                        </>
                    );
                })}

                <StarRating
                    onChange={rateChanged}
                    value={1}
                    numberOfStars={5}
                    editable={true}
                    Color={"#ffd633"}
                />
            </center>
            <div className="testingGrid">
                <div className="card1  ">
                    <h2>stacked pancake </h2>
                    <p>display: grid </p>
                    <p>grid-template-rows: auto 1fr auto </p>
                </div>
                <div className="card1  ">
                    <h2>9 square template</h2>
                    <p>grid-template : auto 1fr auto / auto 1fr auto</p>
                    <p>header ::: grid-column:1/4</p>
                </div>
                <div className="card1  ">
                    <h2>grid with 12 grids</h2>
                    <p>grid-template-column : repeat(12, 1fr)</p>
                </div>
                <div className="card1  ">
                    <h2>Grid RAM (repeat ,auto, minmax)</h2>
                    <p>
                        grid-template-columns : repeat(auto-fit, minmax(150px,
                        1fr)
                    </p>
                </div>
                <div className="card1  ">
                    <h2>centering content using flex box</h2>
                    <p>display: flex</p>
                    <p>justify-content: space-between</p>
                </div>
                <div className="card1  ">
                    <h2>mimi ni nani nisimshukuru mungu</h2>
                </div>
            </div>
        </>
    );
}
