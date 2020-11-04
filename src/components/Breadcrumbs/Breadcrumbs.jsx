import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({stepLabels, currentStep}) => {

    return (
        <div data-testid="breadcrumbs" className='breadcrumbs'>
            {stepLabels.map((label,idx) => 
                <React.Fragment key={`${label}-${idx}`}>
                    <h4 className={(idx === currentStep) ? 'active-step' : undefined}>{label}</h4> 
                    {(idx < stepLabels.length - 1) ? <h5 className='breadcrumb-slash'> / </h5> : undefined}
                </React.Fragment>
            )}
        </div>
    )

}

export default Breadcrumbs;