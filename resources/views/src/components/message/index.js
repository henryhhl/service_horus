
import React from 'react';
import { message, notification } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

function C_Message( type, messages ) {
    // message.open( {
    //     type: type,
    //     content: <span style={{ position: 'relative', top: 3, }}> { messages } </span>,
    //     duration: 5,
    //     style: { display: "flex", justifyContent: "left", marginLeft: 15, zIndex: 10100, },
    //     zIndex: 10100,
    // } );
    notification.open( {
        message: null,
        placement: "bottomRight",
        // type: type,
        duration: 3,
        description: 
            <span style={{ color: "white", fontWeight: "bold", position: "relative", top: -3, fontSize: 11, }}> 
                { messages } 
            </span>,
        className: `bg-${ type === "error" ? "danger" : type }`,
        closeIcon: <CloseOutlined style={{ color: "white", fontWeight: "bold", position: "relative", top: -10,  }} />,
        style: { paddingLeft: 8, paddingRight: 45, width: 250, paddingTop: 4, paddingBottom: 4, zIndex: 9999999999, }
    } );
};

export default C_Message;