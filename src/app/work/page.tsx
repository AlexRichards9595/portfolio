import {employerData} from "@/ExperienceData";
import React from "react";
import Image from "next/image";
const Work = ()=> {
  return (
      <div className="flex flex-row h-full w-1/2 mx-auto pt-8">
        <div className={'flex flex-col items-center h-5/6 w-48 mr-4'}>
          <Image src={'/icon-arrow-up.png'} alt={'Arrow'} height={50} width={50}/>
          <span className={'w-[2px] bg-lightest h-full'}/>
          <span className={'mt-4 bg-lightest h-4 w-4 rounded-full'}/>
        </div>
        <div className={'flex flex-col h-5/6 py-4 justify-between'}>
          {employerData.map(company => (
              <div key={company.name} className={'flex flex-col py-4 px-8 bg-secondary rounded-2xl my-6 w-4/5'}>
                <div className={'flex flex-row justify-between items-end mb-4'}>
                  <p className={'text-2xl'}>{company.name}</p>
                  <p className={'text-lightest'}>{company.time}</ p>
                </div>
                <p>{company.description}</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default Work