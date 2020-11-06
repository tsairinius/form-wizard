import React from 'react';
import TimeBlock from './TimeBlock';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const UserAvailability = ({availability = [], readOnly = false, title}) => {
    const [ timeBlocks, setTimeBlocks ] = useState([]);

    useEffect(() => {
        let temp = [];
        for (let time = 0; time < 3; time++){
            for (let day = 0; day < 7; day++) {
                temp = [...temp, {id: `${day}${time}`, isActive: false}]
            }
        }

        setTimeBlocks(temp)
    }, [])

    useEffect(() => {
        if (availability.length) {
            const availabilityToIds = availability.map(item => `${item.avail_day}${item.avail_time}`)
            let isBlockActive;
            setTimeBlocks(prevTimeBlocks => prevTimeBlocks.map(block => {
                isBlockActive = availabilityToIds.includes(block.id)
                return {
                    ...block,
                    isActive: isBlockActive
                }
            }))
        }
    }, [availability])

    const handleClick = (blockId) => {
        if (!readOnly) {
            setTimeBlocks(
                timeBlocks.map(block => {
                    if (block.id === blockId) {
                        return {
                            ...block,
                            isActive: !block.isActive
                        }
                    }
                    return block;
                })
            )
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
                return <TimeBlock readOnly={readOnly} key={item.id} id={item.id} isActive={item.isActive} onClick={handleClick}/>;
            }
        })
    }

    return (
        <div className="user-availability">
            {title ? <h5>{title}</h5> : null}
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
                    avail_day: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]).isRequired,
                    avail_time: PropTypes.oneOf([0, 1, 2]).isRequired
    }).isRequired)
}

export default UserAvailability;


