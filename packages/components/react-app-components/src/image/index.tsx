import React, { FC, ReactNode } from 'react';

type Props = {
    className?: string,
    children?: ReactNode,
};

const Image: FC<Props> = ({ className, children }) => {
  return (
    <div className={' bg-white border border-gray-200 m-2 rounded-sm shadow-md ' + className }>
        我是一个图片
    </div>
  )
}

export default Image;