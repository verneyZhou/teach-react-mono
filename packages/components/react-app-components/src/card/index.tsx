import React, { FC, ReactNode } from 'react';

type Props = {
    className?: string,
    children?: ReactNode,
};

const Card: FC<Props> = ({ className, children }) => {
  return (
    <div className={' bg-white border border-gray-200 m-2 rounded-sm shadow-md ' + className }>
        {children}
    </div>
  )
}

export default Card;