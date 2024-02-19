import {employerData} from "@/ExperienceData";
import React from "react";
import Image from "next/image";
import Card from "@/components/Card";
const Work = ()=> {
  return (
      <div className="flex flex-col lg:flex-row lg:justify-around w-full lg:h-screen lg:overflow-y-hidden px-4 lg:px-12">
        <div className={'flex flex-col lg:h-screen lg:w-5/12 text-center justify-center py-4'}>
          <p className={'text-3xl pb-2'}>My Work</p>
          <p>This is a section where I give a catching and confident intro into my work and why you should hire me. Please hire me.</p>
        </div>
        <div className={'hidden lg:flex flex-col items-center w-12 py-8'}>
          <Image src={'/icon-arrow-up.png'} className={'h-8 w-8'} alt={'Arrow'} height={50} width={50}/>
          <span className={'w-[2px] bg-lightest grow'}/>
          <span className={'mt-4 bg-lightest h-4 w-4 rounded-full'}/>
        </div>
        <div className={'flex flex-col w-full lg:w-5/12 h-full lg:py-12 justify-between items-center overflow-y-auto no-scrollbar'}>
          {employerData.map(company => (
             <Card
                 key={company.name}
                 title={company.name}
                 description={company.description}
                 subtitle={company.time}
                 tags={company.technologies}
                 link={company.link}
                 bullets={company.bullets}
             />
          ))}
        </div>
      </div>
  );
}

export default Work