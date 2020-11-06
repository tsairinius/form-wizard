import React from 'react';
import TimeBlock from '../TimeBlock';
import { render, screen } from '@testing-library/react';

test("block acquires is-active class when isActive prop is true", () => {
    const handleClick = jest.fn();
    render(<TimeBlock id={1} isActive={true} onClick={handleClick}/>);

    expect(screen.getByTestId('1')).toHaveClass('is-active');

});

test('block does not possess is-active class when isActive prop is false', () => {
    const handleClick = jest.fn();
    render(<TimeBlock id={1} isActive={false} onClick={handleClick}/>);

    expect(screen.getByTestId('1')).not.toHaveClass('is-active')
});