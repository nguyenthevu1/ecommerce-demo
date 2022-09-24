import React from 'react'

const MessageUpdate = ({ variant, children }) => {
    return <div className={`alert ${variant}`}>{children}</div>;
};
MessageUpdate.defaultProps = { variant: "alert-info" }

export default MessageUpdate;