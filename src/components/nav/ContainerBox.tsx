"use client";

import React, { FC, ReactNode, useEffect, useState } from 'react';

interface ContainerProps {
  hover: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({
  hover,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  children,
}) => {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`relative w-12 h-12 box-border rounded-full border-4 border-gray-700 p-1 bg-gray-800 transition-all duration-500 flex justify-center items-center flex-col ${
        hover ? 'w-1/2 shadow-lg' : ''
      } ${hover && isWideScreen ? 'md:w-4/5' : ''}`}
    >
      {children}
    </div>
  );
};

export default Container;
