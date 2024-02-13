import {employerData} from "@/ExperienceData";
import React from "react";
import Image from "next/image";
import Card from "@/components/Card";
const Work = ()=> {
  return (
      <div className="flex flex-row min-h-screen h-fit w-11/12 lg:w-1/2 mx-auto py-8">
        <div className={'flex flex-col items-center w-48 min-h-screen h-full mr-4'}>
          <Image src={'/icon-arrow-up.png'} alt={'Arrow'} height={50} width={50}/>
          <span className={'w-[2px] bg-lightest grow'}/>
          <span className={'mt-4 bg-lightest h-4 w-4 rounded-full'}/>
        </div>
        <div className={'flex flex-col h-full py-4 justify-between'}>
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