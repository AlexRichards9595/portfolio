
export interface Company {
  name: string;
  time: string;
  src: string;
  description: string;
  technologies: string;
}


export const employerData: Company[] = [
  {
    name: "eFuse",
    time: "2022-present",
    src: "/efuse.png",
    description: `Worked on a small team to develop features for the eRena product which is a tool for eSport tournament operators to manage and run tournaments. These features included team and player application management, bracket creation and management and tournament scoring. Some of the the major contributions I made here were implementing graphQL and Apollo best practices and splitting large, top level, calls into smaller calls closer to where the data was needed, reducing page load times down from ~6 seconds to under a second; fixing over 1000 TS errors to enable our team to turn Strict Mode on to improve and ensure code stability and maintainability; I also researched, discovered and implemented CodeGen into our stack to help maintain type safety across our tech stack.`,
    technologies: "NextJS, React, Typescript, GraphQL, Apollo, MongoDB, TypeGoose, RTL, Jest"
  },
  {
    name: "Dwell",
    time: "2019-2022",
    src: "/Dwell-Sunburst-Light.png",
    description: "Provided technical guidance and development for transitioning from current PHP frontend to a single page application using a modern JS framework",
    technologies: "NextJS, React, Typescript, PHP, MUI, RTL, Jest"
  },
  {
    name: "Accenture",
    time: "2019-2022",
    src: "/Accenture-Logo.png",
    description: "Worked on various projects that included building new products, fixing and improving existing projects, and consulting on team and engineering practices",
    technologies: "React, Angular, Python, Go, Java, C#"
  },
  {
    name: "NetJets",
    time: "2018-2019",
    src: "/netjets-vector-logo.png",
    description: "Scoped out and developed multiple ServiceNow projects for internal business users",
    technologies: "Angular, ServiceNow"
  }
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
