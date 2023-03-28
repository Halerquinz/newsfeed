import * as React from "react";

export interface BubbleTextProps {
  children: React.ReactNode;
}

export const BubbleText: React.FC<BubbleTextProps> = ({ children }) => {
  return (
    <div
      className="items-center font-bold text-primary-200"
      data-testid="bubble-text"
    >
      {children}
    </div>
  );
};
