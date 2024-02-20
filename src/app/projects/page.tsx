'use client'

import { projectData} from "@/ExperienceData";
import Card from "@/components/Card";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import React, {useState} from "react";

const tabs = [
  {value: 'past', label: 'Past'},
  {value: 'present', label: 'Present'},
  {value: 'future', label: 'Future'}
]

const Projects = ()=> {
  const [activeTab, setActiveTab] = useState(1);
  const controls = useAnimation();

  const handleClick = (index:number) => {
    setActiveTab(index);
    animateUnderline(index);
  };

  const animateUnderline = (index: number) => {
    controls.start({
      left: `calc(${index * (100 / tabs.length)}%)`,
    });
  };
  return <div className="flex flex-col min-h-screen lg:pt-36 lg:w-1/2 mx-auto px-4">
    <div className={'flex flex-col text-center justify-center py-4'}>
      <p className={'text-3xl pb-2'}>Projects</p>
      <p>This is a section where I give a catching and confident intro into my work and why you should hire me. Please hire me.</p>
    </div>
    <div className={'flex flex-col relative'}>
    <div className={'flex flex-row w-full justify-around py-2'}>
      {tabs.map((tab, index) => (
          <div className={'text-lg'}
              key={index}
              onClick={() => handleClick(index)}
          >
            {tab.label}
          </div>
      ))}
    </div>
      <motion.div
          className={`h-1 bg-lightest w-1/3 absolute bottom-0`}
          initial={{ left: `${(100 / tabs.length) * activeTab}%` }}
          animate={controls}
      />
    </div>
    <div className={'flex flex-col h-full justify-between'}>
      {projectData.filter(x => x.tab === tabs[activeTab].value).map(project => (
          <AnimatePresence mode={'popLayout'} key={project.name}>
            <motion.div
                key={project.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring" }}
            >
              <Card
                  title={project.name}
                  description={project.description}
                  subtitle={project.time}
                  tags={project.technologies}
                  link={project.link}
              />
            </motion.div>
          </AnimatePresence>
      ))}
    </div>
  </div>
}

export default Projects