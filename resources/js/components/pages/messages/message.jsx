import React from 'react'
import moment from "moment";

export default function Message({messages,own}) {
    return (
        <div className="clearfix">
            <div
                className={
                    own ? "message float-right own" : "message float-left"
                }
            >
                <div className="messageTop d-flex">
                    <img
                        src="./img/img_avatar5.png"
                        className="coversionImage"
                    />
                    <p className="messageText">{messages.Text}</p>
                </div>
                <div className="messageBottom mb-1 ">
                    {moment(messages.created_at).fromNow()}
                </div>
            </div>
        </div>
    );
}
