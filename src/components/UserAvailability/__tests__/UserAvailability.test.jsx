import React from 'react';
import { render, screen } from '@testing-library/react';
import UserAvailability from '..';
import userEvent from '@testing-library/user-event';

const isActiveClass = 'is-active';
test("time blocks specified by availability prop have is-active class", () => {
    const currentAvail = [{avail_day: '1', avail_time: '0'}, 
                          {avail_day: '3', avail_time: '1'}, 
                          {avail_day: '6', avail_time: '2'}];
    render(<UserAvailability currentAvail={currentAvail} onChange={() => jest.fn()}/>);

    currentAvail.forEach(item => {
        expect(screen.getByTestId(`${item.avail_day}${item.avail_time}`)).toHaveClass(isActiveClass)
    })
})

describe("testing behavior of clicking on time blocks", () => {
    const timeBlockId = "42";
    test("onChange callback cannot be called when UserAvailability's read-only prop is true", () => {
        const handleChange = jest.fn();
        render(<UserAvailability currentAvail={[]} onChange={handleChange} readOnly={true}/>);
    
        userEvent.click(screen.getByTestId(timeBlockId));
  
        expect(handleChange).not.toHaveBeenCalled();
    })

    test("onChange callback should pass latest user availability data when invoked", () => {
        const handleChange = jest.fn();
        render(<UserAvailability currentAvail={[]} onChange={handleChange}/>);

        userEvent.click(screen.getByTestId(timeBlockId));
        
        expect(handleChange).toHaveBeenLastCalledWith([{avail_day: timeBlockId[0], avail_time: timeBlockId[1]}]);
    })
})
