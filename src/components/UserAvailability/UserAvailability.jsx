import React, { useRef } from 'react';
import TimeBlock from './TimeBlock';
import PropTypes from 'prop-types';
import './UserAvailability.css';

const UserAvailability = ({currentAvail = [], readOnly = false, title, onChange}) => {
    const initializeTimeBlocks = () => {
        let blocks = [];
        for (let time = 0; time < 3; time++){
            for (let day = 0; day < 7; day++) {
                blocks = [...blocks, {id: `${day}${time}`, isActive: false}]
            }
        }

        return blocks;
    }

    const timeBlocks = useRef(initializeTimeBlocks());

    const availToTimeBlocks = () => {
        const availabilityToIds = currentAvail.map(item => `${item.avail_day}${item.avail_time}`);
        let isBlockActive;

        timeBlocks.current = timeBlocks.current.map(block => {
            isBlockActive = availabilityToIds.includes(block.id)
            return {
                ...block,
                isActive: isBlockActive
            }
        }); 
    }

    const idsToAvailability = () => {
        let updatedAvailability = [];
        timeBlocks.current.forEach(block => {
            if (block.isActive) {
                updatedAvailability = [
                    ...updatedAvailability,
                    {
                        avail_day: block.id[0],
                        avail_time: block.id[1]
                    }
                ]
            }
        });

        return updatedAvailability;
    }

    const updateClickedBlock = (blockId) => {
        if (!readOnly) {
            timeBlocks.current = timeBlocks.current.map(block => {
                            if (block.id === blockId) {
                                return {
                                    ...block,
                                    isActive: !block.isActive
                                }
                            }
                            return block;
                        })

            if (onChange) {
                const updatedAvailability = idsToAvailability();
                onChange(updatedAvailability);
            }
        }
    }

    const renderTimeLabelsAndBlocks = () => {
        availToTimeBlocks();
        const timeLabelsAndBlocks = (() => {
            let temp = [...timeBlocks.current];
            temp.splice(0, 0, 'Morning');
            temp.splice(8, 0, 'Afternoon');
            temp.splice(16, 0, 'Evening');
            return temp;
        })();

        return timeLabelsAndBlocks.map(item => {
            if (typeof item === "string") {
                return <div className="time-of-day" key={item}>{item}</div>
            }
            else {
                return <TimeBlock readOnly={readOnly} key={item.id} id={item.id} isActive={item.isActive} onClick={updateClickedBlock}/>;
            }
        })
    }

    return (
        <div className="user-availability">
            {title ? <h4>{title}</h4> : null}
            <div className='availability-table'>
                    <div></div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                    {renderTimeLabelsAndBlocks()}
            </div>
        </div>
    )
};

UserAvailability.propTypes = {
    currentAvail: PropTypes.arrayOf(PropTypes.exact({
                    avail_day: PropTypes.oneOf(['0', '1', '2', '3', '4', '5', '6']).isRequired,
                    avail_time: PropTypes.oneOf(['0', '1', '2']).isRequired
    })).isRequired,
    onChange: PropTypes.func.isRequired
}

export default UserAvailability;


