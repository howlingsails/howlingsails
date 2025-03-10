// File: web-apps/cap10meetup/tech-meetup-data.js

export const defaultSkills = [
  "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "PHP", "Swift",
  "Kotlin", "Go", "Rust", "SQL", "NoSQL Databases", "Data Science",
  "Machine Learning", "Deep Learning", "Natural Language Processing",
  "Computer Vision", "UX/UI Design", "Graphic Design", "Web Design",
  "Mobile Development", "Cloud Computing", "DevOps", "Cybersecurity",
  "Blockchain", "IoT", "AR/VR", "Game Development", "Embedded Systems",
  "Networking", "Big Data", "Data Analytics", "Robotics", "Quantum Computing",
  "Agile Methodologies", "Project Management", "Software Testing", "Automation",
  "API Design", "Microservices", "SaaS Development"
];

export const defaultPositions = [
  "Software Developer", "Frontend Developer", "Backend Developer",
  "Full Stack Developer", "Mobile Developer", "DevOps Engineer",
  "QA Engineer", "UX Designer", "UI Designer", "Product Manager",
  "Project Manager", "Business Analyst", "Data Scientist",
  "Data Analyst", "Database Administrator", "Systems Engineer",
  "Network Engineer", "Security Analyst", "Cybersecurity Specialist",
  "Cloud Architect", "Solutions Architect", "Technical Lead",
  "Engineering Manager", "CTO", "CIO", "Software Architect",
  "Research Scientist", "AI/ML Engineer", "Machine Learning Researcher",
  "Hardware Engineer", "Embedded Systems Engineer", "IT Support Specialist",
  "Technical Writer", "Scrum Master", "Agile Coach", "Systems Administrator",
  "Game Developer", "Blockchain Developer", "Automation Engineer",
  "IoT Specialist", "R&D Engineer", "Digital Marketing Specialist"
];

// You can add multiple event templates here
export const eventTemplates = {
  defaultTechEvent: {
    questions: [
      { id: "contact_info", type: "contact", prompt: "Please provide your contact information" },
      { id: "what_to_remember", type: "phrase", prompt: "What should I remember?" },
      { id: "innovation_drive", type: "phrase", prompt: "What drives you to innovate in tech?" },
      { id: "tech_challenge", type: "phrase", prompt: "What tech challenge are you passionate about solving?" },
      { id: "future_oc_tech", type: "phrase", prompt: "How do you see the future of tech evolving?" },
      { id: "recent_breakthrough", type: "phrase", prompt: "Share a recent inspiring breakthrough." },
      { id: "technical_skills", type: "ranking", prompt: "Rate your technical skills", options: defaultSkills },
      { id: "positions_held", type: "checklist", prompt: "Select positions you have held", options: defaultPositions }
    ],
    responses: [],
    attendees: []
  }
};
