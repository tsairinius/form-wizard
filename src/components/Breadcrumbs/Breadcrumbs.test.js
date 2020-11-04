import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { render, screen } from '@testing-library/react';

const stepLabels = ['Cat', 'Dog', 'Mouse'];
const currentStep = 1;
beforeEach(() => {
    render(<Breadcrumbs stepLabels={stepLabels} currentStep={currentStep}/>);
})

test('Specified step labels are displayed', () => {
    stepLabels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument();
    })
});

test('Step label of current step is only label with active class', () => {
    expect(screen.getByText(stepLabels[currentStep])).toHaveClass('active-step');

    const otherSteps = stepLabels.filter((label, idx) => idx !== currentStep);
    otherSteps.forEach(label => expect(screen.getByText(label)).not.toHaveClass('active-step'));
});