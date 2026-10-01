import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-2xl p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
