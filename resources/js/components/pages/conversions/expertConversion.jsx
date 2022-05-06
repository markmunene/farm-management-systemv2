import React, { useState, useEffect,useContext } from "react";

import { useContacts } from "../../context/UsersDetails";

export default function ExpertConversion({ sendCurrentConId , Conversions}) {
    const [cons, setCons] = useState([]);
    const [farmerscon, setfarmerCon] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    const { contacts } = useContacts();

    return (
        <>
            {Conversions?.map((items, index) => {
                return (
                    <>
                        <div
                            className="converion m-1"
                            key={index}
                            onClick={() => sendCurrentConId(items.id)}
                        >
                            <img
                                src="./img/avatar.png"
                                alt=""
                                className="coversionImage"
                            />
                            <span className="converionName pl-2">
                                {contacts
                                    .filter((cons) => {
                                        if (
                                            items.Receiver_id == cons.id
                                           
                                        ) {
                                            return cons;
                                        }
                                    })
                                    .map((item) => (
                                        <span>{item.name}</span>
                                    ))}
                            </span>
                        </div>
                    </>
                );
            })}
        </>
    );
}
