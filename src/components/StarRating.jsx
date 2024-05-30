import React, { useState } from 'react';


const StarRating = ({ rating, onRate }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={starValue}
                        className={`text-xl ${starValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={() => onRate(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        &#9733;
                    </button>
                );
            })}
        </div>
    );
};
export default StarRating;