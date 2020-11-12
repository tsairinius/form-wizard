import React from 'react';
import TimeBlock from './TimeBlock';
import PropTypes from 'prop-types';
import './UserAvailability.css';

const UserAvailability = ({availability = [], readOnly = false, title, onChange}) => {
    let timeBlocks = (function availToTimeBlocks() {
        const availabilityToIds = availability.map(item => `${item.avail_day}${item.avail_time}`);
     
        let isBlockActive;
        let blocks = [];
        let blockId;
        for (let time = 0; time < 3; time++){
            for (let day = 0; day < 7; day++) {
                blockId = `${day}${time}`;
                isBlockActive = availabilityToIds.includes(blockId);
                blocks = [...blocks, {id: `${day}${time}`, isActive: isBlockActive}]
            }
        }

        return blocks;
    })();

    const timeBlocksToAvailability = () => {
        let updatedAvailability = [];
        timeBlocks.forEach(block => {
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

    const updateAvailability = (blockId) => {
        if (!readOnly) {
            timeBlocks = timeBlocks.map(block => {
                            if (block.id === blockId) {
                                return {
                                    ...block,
                                    isActive: !block.isActive
                                }
                            }
                            return block;
                        })

            onChange(timeBlocksToAvailability());
        }
    }

    const renderTimeLabelsAndBlocks = () => {
        const timeLabelsAndBlocks = (() => {
            let temp = [...timeBlocks];
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
                return <TimeBlock readOnly={readOnly} key={item.id} id={item.id} isActive={item.isActive} onClick={updateAvailability}/>;
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
    availability: PropTypes.arrayOf(PropTypes.exact({
                    avail_day: PropTypes.oneOf(['0', '1', '2', '3', '4', '5', '6']).isRequired,
                    avail_time: PropTypes.oneOf(['0', '1', '2']).isRequired
    })).isRequired,
    onChange: PropTypes.func.isRequired
}

export default UserAvailability;


