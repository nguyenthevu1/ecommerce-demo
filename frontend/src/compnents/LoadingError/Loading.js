import React from 'react';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="spinner-boder text-success"
                role="status"
                style={{ width: '100px', height: '100px', marginBottom: '20px' }}
            >
                <span></span>
            </div>
        </div>
    );
};

export default Loading;
