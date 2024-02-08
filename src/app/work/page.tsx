'use client'
import {employerData} from "@/ExperienceData";
import {
  Accordion, AccordionBody, AccordionHeader,
  Timeline, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem,
} from "@/components/MaterialTailwind";
import Image from "next/image";
import React, {useState} from "react";
const Work = ()=> {
  const [companySelected, setCompanySelected] = useState('')

  const handleCompanyClick = (companyName: string) => {
    setCompanySelected(prevState => (prevState === companyName ? '' : companyName))
  }
  return (
      <div className="w-1/2 mx-auto pt-8">
        <Timeline>
          {employerData.map(company => (
            <TimelineItem key={company.name} className={'min-h-48'}>
              <TimelineConnector className={`${companySelected === company.name && 'hidden'}`}/>
              <TimelineHeader>
                <TimelineIcon className={'flex justify-center items-center bg-white h-16 w-16'}>
                  <Image className={'object-contain'} src={company.src} alt={company.name} width={64} height={64}/>
                </TimelineIcon>
                <Accordion open={companySelected === company.name} placeholder={undefined}>
                  <AccordionHeader onClick={() => handleCompanyClick(company.name)} placeholder={undefined}>
                    <p className={'text-2xl text-white'}>{company.name}</p>
                  </AccordionHeader>
                  <AccordionBody>
                    <p className={'text-lg text-white'}>{company.description}</p>
                  </AccordionBody>
                </Accordion>
              </TimelineHeader>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
  );
}

export default Work