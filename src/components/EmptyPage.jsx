import React from 'react';

const EmptyData = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <img
          src="https://cdn.dribbble.com/users/463734/screenshots/2016792/empty-result_shot.png?resize=400x0"
          alt=""
          className="mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">No Data Available</h2>
        <p className="text-gray-500 mb-2">Sorry, there is no data to display at the moment.</p>
        <p className="text-gray-500 mb-4">Please add Notes to see note cards on the screen.</p>
      </div>
    </div>
  );
};

export default EmptyData;
