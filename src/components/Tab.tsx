import React, { FC } from 'react';
import {Company} from "@/ExperienceData";
import Image from "next/image";


interface TabIconProps {
  company: Company;
  onClick: (selected: string) => void
  hidden: boolean;
  selected: boolean;
}

const Tab: FC<TabIconProps> = ({ company, onClick, hidden, selected}) => {
  let width = "w-[600px]";

  if(selected) width="w-full";
  if(hidden) width="w-0";

  return (
    <div className={`flex flex-row ${width} h-52 justify-center duration-1000 animate slide`} >
      <div className={`flex flex-col items-center justify-between ${hidden && "opacity-0"} duration-500 cursor-pointer`} onClick={() => onClick(company.name)}>
        <Image className={"w-48 h-36 object-scale-down m-2"} alt={company.name} height={50} width={50} src={company.src} />
        <div className={"flex flex-col h-12 justify-end items-center"}>
          <div className={"prose font-black mt-1"}>{company.name}</div>
          <div className={"prose"}>{company.time}</div>
        </div>
      </div>
      <div
        className={`${selected ? 'w-4/5 opacity-100' : 'w-0 opacity-0'} duration-1000 bg-gray-200 p-2 rounded-lg flex flex-row justify-between`} >
          <div className='p-2 h-full flex flex-col justify-between'>
            <p className={`${selected ? 'opacity-100 delay-1000 duration-500' : 'opacity-0'}`}>{company.description}</p>
            <p className={`${selected ? 'opacity-100 delay-1000 duration-500' : 'opacity-0'}`}>Used: {company.technologies}</p>
          </div>
          <button className={"flex justify-end"} onClick={() => onClick("")}>
            <p>X</p>
          </button>
      </div>
    </div>
  );
}

export default Tab;
