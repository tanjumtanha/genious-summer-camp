import React from 'react';

const Title = ({heading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 mt-8 mb-2">
            <h3 className="text-3xl text-blue-500 uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default Title;