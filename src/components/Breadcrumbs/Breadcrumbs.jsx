import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({stepLabels, currentStep}) => {

    return (
        <div data-testid="breadcrumbs" className='breadcrumbs'>
            {stepLabels.map((label,idx) => 
                <React.Fragment key={`${label}-${idx}`}>
                    <h3 className={(idx === currentStep) ? 'active-step' : null}>{label}</h3> 
                    {(idx < stepLabels.length - 1) ? <h3 className='breadcrumb-slash'> / </h3> : null}
                </React.Fragment>
            )}
        </div>
    )

}

export default Breadcrumbs;