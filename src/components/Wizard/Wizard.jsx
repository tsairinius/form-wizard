import React, { useState, useEffect } from "react";
import Breadcrumbs from '../Breadcrumbs';
import PropTypes from 'prop-types';
import './Wizard.css';

const Wizard = ({onStepChange, canProgress = true, children, onSubmit, onCancel, stepLabels, title, submitName='Submit'}) => {
    const [ currentStep, setCurrentStep ] = useState(0);
    const numSteps = React.Children.count(children);
    const isValidNumSteps = numSteps > 0;
    const isLastStep = (currentStep >= (numSteps - 1)) && isValidNumSteps;

    useEffect(() => {
        if (onStepChange) {
            onStepChange(currentStep);
        }
    }, [currentStep])

    const showCurrentStep = () => React.Children.map(children, (child, index) => index === currentStep ? child : null)

    const showNextButton = () => {
        const nextStep = () => {
            if (!isLastStep) {
                setCurrentStep(currentStep + 1);
            }
        }

        return !isLastStep ? <button disabled={!canProgress} className='next-button primary' onClick={nextStep}>Next</button> : null
    }

    const showBackButton = () => {
        const prevStep = () => {
            if (currentStep > 0) {
                setCurrentStep(currentStep - 1)
            }
        }

        return (currentStep > 0 ? <button className='back-button secondary' onClick={prevStep}>Back</button> : null)
    }

    const showSubmitButton = () => {
        return isLastStep ? <button disabled={!canProgress} className='submit-button primary' onClick={onSubmit}>{submitName}</button> : null
    }

    const showBreadcrumbs = () => {
        return (Array.isArray(stepLabels) && stepLabels[0]) ?
            <>
                <Breadcrumbs onClick={handleBreadcrumbClick} stepLabels={stepLabels} currentStep={currentStep} />
                {/* <Rule type={'secondary'}/> */}
            </>
            : null
    }

    const handleBreadcrumbClick = (step) => {
        setCurrentStep(step);
    }

    return (
        isValidNumSteps ? 
            <div>
                <div className='wizard-header'>
                    <h2>{title}</h2>
                </div>

                <hr/>

                <div className='wizard-body'>
                    {showBreadcrumbs()}
                    <div>
                        {showCurrentStep()}
                    </div>
                </div>

                <hr/>

                <div className='wizard-buttons'>
                    <button className='cancel-button secondary' onClick={onCancel}>Cancel</button>
                    {showBackButton()}
                    {showNextButton()}
                    {showSubmitButton()}
                </div>
            </div>
            :
            null
    )
}

Wizard.propTypes = {
    stepLabels: PropTypes.arrayOf(PropTypes.string.isRequired)
}

export default Wizard;
