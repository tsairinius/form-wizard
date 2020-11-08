import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAvailability from '..';
import userEvent from '@testing-library/user-event';

const isActiveClass = 'is-active';
test("time blocks specified by availability prop have is-active class", () => {
    const initialAvailability = [{avail_day: 1, avail_time: 0}, 
                          {avail_day: 3, avail_time: 1}, 
                          {avail_day: 6, avail_time: 2}];
    render(<UserAvailability initialAvailability={initialAvailability}/>);

    initialAvailability.forEach(item => {
        expect(screen.getByTestId(`${item.avail_day}${item.avail_time}`)).toHaveClass(isActiveClass)
    })
})

describe("testing behavior of clicking on time blocks", () => {
    const timeBlockId = '02';
    test("time block acquires is-active class when clicked on", () => {
        render(<UserAvailability />);
    
        expect(screen.getByTestId(timeBlockId)).not.toHaveClass(isActiveClass);
    
        userEvent.click(screen.getByTestId(timeBlockId))
    
        expect(screen.getByTestId(timeBlockId)).toHaveClass(isActiveClass);
    })

    test("time block should not have is-active class when clicked on twice in a row", () => {
        render(<UserAvailability />);
        userEvent.click(screen.getByTestId(timeBlockId));
        userEvent.click(screen.getByTestId(timeBlockId));

        expect(screen.getByTestId(timeBlockId)).not.toHaveClass(isActiveClass);
    })
    
    test("when UserAvailability's read-only prop is true, no time block can acquire is-active class upon click", () => {
        render(<UserAvailability readOnly={true}/>);
    
        userEvent.click(screen.getByTestId(timeBlockId));

        expect(screen.getByTestId(timeBlockId)).not.toHaveClass(isActiveClass);
    })

    test("if onChange callback should pass latest user availability data when invoked", () => {
        const handleChange = jest.fn();
        render(<UserAvailability onChange={handleChange}/>);

        userEvent.click(screen.getByTestId(timeBlockId));
        
        expect(handleChange).toHaveBeenLastCalledWith([{avail_day: timeBlockId[0], avail_time: timeBlockId[1]}]);
    })
})
