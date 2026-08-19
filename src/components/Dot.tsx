import React, { FC } from "react";

interface DotProps {
  index: number;
  filled: boolean;
  onClick: (selected: number) => void;
}

const Dot: FC<DotProps> = ({ filled, onClick, index }) => (
  <button
    type="button"
    onClick={() => onClick(index)}
    aria-label={`Go to review ${index + 1}`}
    className={`h-2.5 rounded-full transition-all duration-300 ${
      filled ? "w-6 bg-accent" : "w-2.5 bg-lightest/30 hover:bg-lightest/50"
    }`}
  />
);

export default Dot;
