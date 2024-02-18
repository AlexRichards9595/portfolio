import { projectData} from "@/ExperienceData";
import Card from "@/components/Card";
import React from "react";

const Projects = ()=> {
  return <div className="flex flex-row min-h-screen h-fit w-11/12 lg:w-1/2 mx-auto">
    <div className={'flex flex-col h-full justify-between'}>
      {projectData.map(company => (
          <Card
              key={company.name}
              title={company.name}
              description={company.description}
              subtitle={company.time}
              tags={company.technologies}
              link={company.link}
          />
      ))}
    </div>
  </div>
}

export default Projects