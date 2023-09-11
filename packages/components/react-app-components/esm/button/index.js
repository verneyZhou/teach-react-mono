import React from 'react';

const Button = ({ className, children }) => {
    return (React.createElement("button", { className: ' w-16 h-8 mx-4 text-sm bg-blue-600 text-white flex justify-center items-center rounded-full hover:bg-blue-700 transition-all ' }, children));
};

export { Button as default };
