import React, { FC, ReactNode } from 'react';

type Props = {
    className?: string,
    children?: ReactNode,
};

const Button: FC<Props> = ({ className, children }) => {
  return (
    <button className=' w-16 h-8 mx-4 text-sm bg-blue-600 text-white flex justify-center items-center rounded-full hover:bg-blue-700 transition-all '>
        {children}
    </button>
  )
}

export default Button;