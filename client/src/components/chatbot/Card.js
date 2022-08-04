import React from 'react';

const Card = (props) => {
    return (
        <div style={{ height: 370, paddingRight: 30, float: 'left' }}>
            <div className="card">
                <div className="card-image" style={{ width: 320 }}>
                    <img alt={props.payload.fields.type.stringValue} src={props.payload.fields.rawUrl.stringValue} />
                </div>
            </div>
        </div>
    );
};

export default Card; 