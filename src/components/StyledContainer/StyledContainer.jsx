import React from 'react';
import './StyledContainer.css';

const StyledContainer = ({children, className}) => {
    return (
        <div className={`styled-container ${className ? className : ""}`}>
            {children}
        </div>
    )
}

export default StyledContainer;