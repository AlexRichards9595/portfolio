
export interface Company {
  name: string;
  time: string;
  description: string;
  bullets: string[];
  technologies: string[];
  link?: string;
  productButtons?: ProductButton[]
}

interface ProductButton {
  label: string
  link: string
}


export const employerData: Company[] = [
  {
    name: "Northwoods",
    time: "2023-present",
    description: `Implement Dark Mode feature in mobile application using new styling library, ensuring seamless integration and consistent color themes throughout interface. Utilize Styled Components library to enforce uniform styling and facilitate color theming across application codebase.`,
    bullets: ['Enhanced team productivity by 30% through optimizing individual contributions and streamlining work cycles for improved efficiency.', 'Revamped app\'s navigation structure, significantly reducing screen loading time from 20 seconds to less than 1 second, enhancing user experience and overall performance'],
    technologies: ['NextJS', 'React', 'Typescript', 'GraphQL', 'Apollo', 'MongoDB', 'TypeGoose', 'RTL', 'Jest'],
    link: 'https://apps.apple.com/us/app/traverse-mobile-2/id1663934181?platform=iphone'
  },
  {
    name: "eFuse",
    time: "2022-2023",
    description: `Implemented Codegen to automatically generate Types, ensuring type safety from front-end to backend systems, fortifying application's integrity. Spearheaded standardization of unit testing methodologies and mentored junior engineers' ineffective unit testing practices, fostering culture of quality assurance and continuous improvement within team.`,
    bullets: ['Achieved 86% reduction in page load times by implementing industry-leading GraphQL best practices.', 'Rectified 1000+ Typescript errors, enabling activation of Strict Mode to uphold code stability and bolster maintainability across project.', 'Optimized data fetching methods, resulting in substantial decrease in page load time from 6 seconds to under 1 second, enhancing overall\n' +
    'application responsiveness.'],
    technologies: ['NextJS', 'React', 'Typescript', 'GraphQL', 'Apollo', 'MongoDB', 'TypeGoose', 'RTL', 'Jest'],
    link: 'https://efuse.gg/'
  },
  {
    name: "Accenture",
    time: "2019-2022",
    description: "Developed purchasing flow for United Airlines' onboard WiFi using React, enhancing user experience and facilitating seamless transactions. Led planning and execution of Angular green field project, establishing web portal for Ford Motor Company's employees to access their machine learning toolbox, streamlining internal processes and empowering users.",
    bullets: [`Spearheaded front-end development of purchasing flow for United Airlines' onboard WiFi, ensuring intuitive design and functionality to meet needs of travelers.`, `Designed user-friendly interface for Ford\'s Sales team to access machine learning tools, enabling efficient data-driven decision-making and enhancing productivity within organization.`],
    technologies: ['React', 'Angular', 'Python', 'Go', 'Java', 'C#'],
    link: 'https://www.accenture.com/us-en?c=acn_glb_sembrandpuregoogle_13513493&n=psgs_0323&&c=ad_usadfy17_10000001&n=psgs_Brand-%7C-US-%7C-Exact_accenture'
  },
  {
    name: "NetJets",
    time: "2018-2019",
    description: "Scoped and executed various ServiceNow projects tailored to meet specific needs of internal business users, enhancing operational efficiency and workflow management within organization.",
    bullets: [],
    technologies: ['Angular', 'ServiceNow'],
    link: 'https://netjets.com/en-us/'
  }
];

export const projectData: Company[] = [
  {
    name: "Dwell Community Fellowship",
    time: "2021",
    description: `Built the filter sidebar on the Teachings Search site that doesn't force a page load when changing the filters. One of the clients top priorities was that a user could never adjust the filters so that there were no results so the filter bar dynamically adjusts the available filters to only what would still produce search results.`,
    bullets: [],
    technologies: ['JavaScript', 'Jest'],
    link: 'https://www.dwellcc.org/',
    productButtons: [{label: 'Teaching Search Page', link: 'https://www.dwellcc.org/teachings'}]
  },
  {
    name: "Acacia House Churches",
    time: "2023",
    description: `Rapidly prototyped and built and deployed a modern 'business card' website for some friends starting a church in Orlando, FL. The website displays important information about the church and a form that allows users to get in touch.`,
    bullets: [],
    technologies: ['NextJS', 'React', 'Typescript', 'RTL', 'Jest'],
    link: 'https://acaciahc.com/'
  },
  {
    name: "Campscout",
    time: "2023-present",
    description: "Currently building a modern web application that allows users to share reviews for specific campsites for all State and National Campgrounds. Too many camping trips have been ruined by picking 'that' campsite. Too many hours have been spent pouring over campground sites and google earth trying to figure out which campsite is the best. Campscout is a site for campers to help fellow campers pick the best sites for the next camping trip",
    bullets: [],
    technologies: ['NextJS', 'React', 'Prisma', 'CockroachDB', 'Typescript', 'RTL', 'Jest'],
    link: 'https://campscout.org/'
  },
];


export interface ReviewData {
  name: string;
  role: string;
  time: string;
  review: string;
}

export const reviewData: ReviewData[] = [
  {
    name: "Bo",
    role: "Manager",
    time: "October, 2023",
    review: `Alex is a really good teammate and brings his A game ready to work and help where ever he can.  Alex is able to adapt very well and is not afraid to ask question and also to voice his ideas.`
  },
  {
    name: "Julie",
    role: "Delivery Lead",
    time: "June, 2020",
    review: `I've worked with Alex for over a year now on three different teams. Each time I start a new project, l'm excited to see that Alex is on my team. Alex creates his own leadership opportunities on a team by stepping up and jumping right in. He asks the right questions at the right time, to help understand the problem we are trying to solve. Alex proactively does things to help his team, whether it be writing cards in Jira, reaching out to the Product Owner to review an approach or solution or jumping in to help problem solve. Alex has an easy-going personality that helps motivate team members and relieve team stress. We've been on some stressful projects together, but never once did I see Alex give up. Alex should know his teams appreciate him more than he may know and always let his personality shine. I'd work on any team with Alex!`
  },
  {
    name: "Tyler",
    role: "Software Engineer",
    time: "June, 2020",
    review: `I have worked with Alex for over a year on two projects. When pairing with Alex, I appreciate that he is an egoless communicator and team member, is consistent in his approach, and stays focused on delivering value to clients, not just code. He has kept me many times from going down rabbit holes and losing focus on the long-term goal. He also shows care for the quality of the product he is building, especially when it comes to a user's experience on the front-end.
Alex's willingness to take on new tasks was made evident on a recent project when we had to create a 3D model of a physical space using software tools unlike any we had any familiarity with. Alex volunteered for the challenge. and learned and delivered quickly without complaint.
As an artisan. Alex has a knack for helping on the delivery side. I have seen multiple instances where he stepped up to help or stand in for our Delivery Lead, by reviewing and refining story cards, keeping story boards up to date. and tracking sprint metrics. This has helped keep our team organized and moving.`
  },
  {
    name: "Dan",
    role: "Software Engineer",
    time: "June, 2020",
    review: `I have worked with Alex for over a year delivery side. I have seen multiple instances where he stepped up to help or stand in for our Delivery Lead, by reviewing and refining story cards, keeping story boards up to date. and tracking sprint metrics. This has helped keep our team organized and moving.`
  }
]
