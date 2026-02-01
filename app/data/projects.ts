export interface Project {
  title: string;
  image: string;
  description: string;
  githubUrl: string;
  projectUrl: string;
  technologies: string[];
  category: string; // Made required for filtering
}

export const projectData: Project[] = [
  {
    title: "GPT-3",
    image: "/images/gpt3.jpeg",
    description:
      "I have created a straightforward yet impactful landing page using React.js and CSS. The primary goal of this landing page is to capture the attention of visitors and encourage them to take a specific action, learning more about a product, or exploring our services.",
    githubUrl: "https://github.com/Captain-drack/gpt-3",
    projectUrl: "https://gpt3-awesome.netlify.app/",
    technologies: ["React.js", "CSS"],
    category: "Frontend",
  },
  {
    title: "Cryptoverse",
    image: "/images/crypto.png",
    description:
      "Stay ahead in the world of cryptocurrencies with our comprehensive Cryptocurrency App. Access real-time data on cryptocurrency prices, trends, and market capitalization. Stay informed with the latest news and updates from the cryptocurrency space, all in one place.",
    githubUrl: "https://github.com/Captain-drack/cryptocurrency-app",
    projectUrl: "https://cryptocurrency-2022.netlify.app/",
    technologies: ["React.js", "Ant Design", "Redux", "CSS", "Axios"],
    category: "Full Stack",
  },
  {
    title: "Captain Shop",
    image: "/images/captain.jpeg",
    description:
      "Create a seamless online shopping experience with this e-commerce app. From browsing a wide range of products to secure payment processing, this application offers users a convenient way to explore and purchase items.",
    githubUrl: "https://github.com/Captain-drack/captain-shop",
    projectUrl: "https://captain-shop.netlify.app/",
    technologies: ["React.js", "Material UI", "Redux", "CSS", "Axios"],
    category: "E-commerce",
  },
  {
    title: "Budget App",
    image: "/images/budget.jpeg",
    description:
      "Manage your finances with ease using our user-friendly Budget App. Take control of your income and expenses, set financial goals, and track your spending habits effortlessly. Our app provides valuable insights into your financial health.",
    githubUrl: "https://github.com/Captain-drack/budget-planner",
    projectUrl: "https://budget-plan.netlify.app/",
    technologies: ["React.js", "Bootstrap"],
    category: "Productivity",
  },
];
