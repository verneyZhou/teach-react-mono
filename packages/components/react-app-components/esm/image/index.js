import React from 'react';

const Image = ({ className, children }) => {
    return (React.createElement("div", { className: ' bg-white border border-gray-200 m-2 rounded-sm shadow-md ' + className }, "\u6211\u662F\u4E00\u4E2A\u56FE\u7247"));
};

export { Image as default };
