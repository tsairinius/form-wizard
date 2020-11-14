import { useState } from "react";

const useAvailability = () => {
    const [ availability, setAvailability ] = useState([]);

    const updateAvailability = (updatedAvail) => {
        setAvailability(updatedAvail);
    }

    const clearAvailability = () => {
        setAvailability([]);
    }

    return {
        availability,
        updateAvailability,
        clearAvailability
    }
}

export default useAvailability;