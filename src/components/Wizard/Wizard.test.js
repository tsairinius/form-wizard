import React from 'react';
import Wizard from './Wizard';
import { render, screen, within } from '@testing-library/react';
// import { within } from '@testing'
import userEvent from '@testing-library/user-event';

const stepLabels = [ 'Dog', 'Cat', 'Mouse' ];
const renderSteps = numSteps => {
    if (numSteps > stepLabels.length) {
        console.log("renderSteps: Warning. Too many steps requested");
    }
    return stepLabels.slice(0, numSteps).map((label, idx) => <div key={idx}>{label}</div>)
}

describe('Testing wizard steps and navigating between them', () => {
    beforeEach(() => {
        render(
            <Wizard>
                {renderSteps(3)}
            </Wizard>
        )
    })

    test('Displays first step of Wizard', () => {
        expect(screen.getByText(stepLabels[0])).toBeInTheDocument();
        expect(screen.queryByText(stepLabels[1])).not.toBeInTheDocument();
        expect(screen.queryByText(stepLabels[2])).not.toBeInTheDocument();
    })
    
    test('Next element in wizard is displayed upon pressing Next button', async () => {
        userEvent.click(screen.getByRole('button', {name: 'Next'}));
        expect(screen.getByText(stepLabels[1])).toBeInTheDocument();
        expect(screen.queryByText(stepLabels[0])).not.toBeInTheDocument();
        expect(screen.queryByText(stepLabels[2])).not.toBeInTheDocument();
    })

    test('Previous element in wizard is displayed upon pressing Back button', () => {
        userEvent.click(screen.getByRole('button', {name: 'Next'}));
        userEvent.click(screen.getByRole('button', {name: 'Next'}));
        userEvent.click(screen.getByRole('button', {name: 'Back'}));

        expect(screen.getByText(stepLabels[1])).toBeInTheDocument();
    })

    test('Do not show next button for last step of wizard', () => {
        userEvent.click(screen.getByRole('button', {name: 'Next'}))
        userEvent.click(screen.getByRole('button', {name: 'Next'}))

        expect(screen.queryByRole('button', {name: 'Next'})).not.toBeInTheDocument();
        expect(screen.getByText(stepLabels[2])).toBeInTheDocument();
    })

    test('Do not show back button for first step of wizard', () => {
        expect(screen.queryByRole('button', {name: 'Back'})).not.toBeInTheDocument();
        expect(screen.getByText(stepLabels[0])).toBeInTheDocument();
    })

    test('Do not show submit button for any step except the last one', () => {
        expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();

        userEvent.click(screen.getByRole('button', {name: 'Next'}));
        expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();

        userEvent.click(screen.getByRole('button', {name: 'Next'}));
        expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
    })
})

describe('Test enabling/disabling of progress button (Next/Submit)', () => {
    test('Submit button is enabled by default', () => {
        render(
            <Wizard>
                {renderSteps(1)}
            </Wizard>
        )
    
        expect(screen.getByRole('button', {name: 'Submit'})).not.toHaveAttribute('disabled');
    });
    
    test('Next button is enabled by default', () => {
        render(
            <Wizard>
                {renderSteps(2)}
            </Wizard>
        )
    
        expect(screen.getByRole('button', {name: 'Next'})).not.toHaveAttribute('disabled');
    });

    test('Submit button of wizard is disabled when requested', () => {
        render(
            <Wizard canProgress={false}>
                {renderSteps(1)}
            </Wizard>
        )
        
        expect(screen.getByRole('button', {name: 'Submit'})).toHaveAttribute('disabled')
    })

    test('Next button is disabled upon request', () => {
        render(
            <Wizard canProgress={false}>
                {renderSteps(2)}
            </Wizard>
        )
        
        expect(screen.getByRole('button', {name: 'Next'})).toHaveAttribute('disabled')
    })
})

test("Provide custom name for wizard's submission button", () => {
    render(
        <Wizard submitName={'Register'}>
            {renderSteps(1)}
        </Wizard>
    )

    expect(screen.getByRole('button', {name: 'Register'})).toBeInTheDocument();
})

test('Does not display navigation buttons if wizard is instantiated without children', () => {
    render(<Wizard/>);
    expect(screen.queryByRole('button', {name: 'Cancel'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Back'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Next'})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Submit'})).not.toBeInTheDocument();
});

test('When only one step is provided, displays step and appropriate navigation buttons', () => {
    render(
        <Wizard>
            {renderSteps(1)}
        </Wizard>
    )

    expect(screen.getByText(stepLabels[0])).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
})

test('When Cancel button is clicked, appropriate callback is invoked', () => {
    const handleCancel = jest.fn();
    render(
        <Wizard onCancel={handleCancel}>
            {renderSteps(1)}
        </Wizard>
    )

    expect(handleCancel).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('button', {name: 'Cancel'}));

    expect(handleCancel).toHaveBeenCalledTimes(1);
})

test('When Submit button is clicked, appropriate callback is invoked', () => {
    const handleSubmit = jest.fn();
    render(
        <Wizard onSubmit={handleSubmit}>
            {renderSteps(1)}
        </Wizard>
    )

    expect(handleSubmit).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('button', {name: 'Submit'}));
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
})

describe('tests for breadcrumbs integrated into wizard', () => {
    test('Clicking next button causes appropriate breadcrumb step to be active', () => {
        render( 
            <Wizard stepLabels={stepLabels}>
                {renderSteps(2)}
            </Wizard>
        );

        const breadcrumbs = screen.getByTestId('breadcrumbs');
        expect(within(breadcrumbs).getByText(stepLabels[0])).toHaveClass('active-step');
        userEvent.click(screen.getByRole('button', {name: 'Next'}));

        expect(within(breadcrumbs).getByText(stepLabels[1])).toHaveClass('active-step');
        expect(within(breadcrumbs).getByText(stepLabels[0])).not.toHaveClass('active-step');
    })

    test('Clicking back button causes appropriate breadcrumb step to be active', () => {
        render( 
            <Wizard stepLabels={stepLabels}>
                {renderSteps(3)}
            </Wizard>
        );

        const breadcrumbs = screen.getByTestId('breadcrumbs');
        userEvent.click(screen.getByRole('button', {name: 'Next'}));
        userEvent.click(screen.getByRole('button', {name: 'Back'}));

        expect(within(breadcrumbs).getByText(stepLabels[0])).toHaveClass('active-step');
        expect(within(breadcrumbs).getByText(stepLabels[1])).not.toHaveClass('active-step');
    })
})




