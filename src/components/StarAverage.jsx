import React from 'react';

const StarAverage = ({ averageRating }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < averageRating) {
                stars.push(<span key={i} className="text-yellow-500 text-2xl">&#9733;</span>);
            } else {
                stars.push(<span key={i} className="text-gray-400 text-2xl">&#9733;</span>);
            }
        }
        return stars;
    };

    return (
        <div className="flex space-x-1">
            {renderStars()}
        </div>
    );
};

export default StarAverage;