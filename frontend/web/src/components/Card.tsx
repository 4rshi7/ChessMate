import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string; // optional prop to extend styling
};

export default function Card({children, className=""}: CardProps){
  return(
     <div className={`flex flex-col   pt-8 pb-18 px-4  rounded-3xl shadow-[0px_18px_24px_rgba(0,0,0,0.15),0_-2px_12px_rgba(0,0,0,0.05)] bg-white ${className}`}>
      {children}
     </div>
  )
}