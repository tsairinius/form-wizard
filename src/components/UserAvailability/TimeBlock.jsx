import React from 'react';
import './TimeBlock.css';

const TimeBlock = ({id, isActive, readOnly, onClick}) => {
    return (
        <div data-testid={id} onClick={() => onClick(id)} className={`time-block ${isActive ? 'is-active' : ''} ${readOnly ? 'read-only' : ''}`}/>
    )
}

export default TimeBlock;