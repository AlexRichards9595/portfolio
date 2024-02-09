import React, { FC } from 'react';


interface DotProps {
  index: number;
  filled: boolean;
  onClick: (selected: number) => void;
}

const Dot: FC<DotProps> = ({filled, onClick, index}) => {
  const commonStyles = "w-4 h-4 rounded-full mx-2"
  if (filled) {
    return <span className={`${commonStyles} bg-white`} onClick={() => onClick(index)} />
  }

  return (
      <span className={`${commonStyles} border-white border-2`} onClick={() => onClick(index)} />
  );
}

export default Dot;