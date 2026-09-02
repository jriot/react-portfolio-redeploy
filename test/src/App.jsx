import { useState, useEffect } from "react";
import {
  Terminal,
  ShoppingCart,
  UtensilsCrossed,
  CheckSquare,
  Coffee,
  Mail,
  ExternalLink,
} from "lucide-react";
import "./App.css";

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}


const PROJECTS = [
  {
    id: "store",
    tab: "online-store",
    name: "Online Store",
    accent: "#2E7D5B",
    icon: ShoppingCart,
    tagline: "A full storefront, built to actually sell things",
    description:
      "A responsive e-commerce build with product filtering, a persistent cart, and a streamlined checkout flow. Focused on making the path from browse to buy as short as possible.",
    stack: ["React", "Node.js", "Paystack", "Tailwind"],
    file: "store.jsx",
    demoUrl: "https://online-store-zjni.vercel.app/",
  },
  {
    id: "recipes",
    tab: "recipe-finder",
    name: "Recipe Finder",
    accent: "#E85D04",
    icon: UtensilsCrossed,
    tagline: "Discover recipes, search by ingredient",
    description:
      "A recipe discovery app that lets users search for recipes by ingredients, cuisine type, or dietary preferences. Features include detailed ingredient lists, step-by-step instructions, nutritional information, and the ability to save favorite recipes for quick access.",
    stack: ["React", "Recipe API", "LocalStorage"],
    file: "recipes.jsx",
    demoUrl: "https://recipe-finder-8lwu.vercel.app/",
  },
  {
    id: "todo",
    tab: "todo-list",
    name: "To-Do List",
    accent: "#7048E8",
    icon: CheckSquare,
    tagline: "Small tasks, kept in order",
    description:
      "A task manager with priority levels, due dates, and category tags. Built around quick capture first — adding a task should never take longer than thinking of it.",
    stack: ["React", "LocalStorage API", "CSS Grid"],
    file: "todo.jsx",
    demoUrl: "https://to-do-ejq6.vercel.app/",
  },
  {
    id: "signage",
    tab: "coffee-signage",
    name: "Coffee Signage",
    accent: "#C9820A",
    icon: Coffee,
    tagline: "The menu board that never needs reprinting",
    description:
      "A digital signage screen for a coffee shop counter — live menu, prices, and daily specials, editable from a lightweight admin panel instead of a laminated sheet.",
    stack: ["React", "Node.js", "WebSockets"],
    file: "signage.jsx",
    demoUrl: "https://coffee-signatory-vra5.vercel.app/",
  },
];

const WHOAMI_LINE = "Simon Odhiambo — Web Developer";

function useTypewriter(text, speed = 50, startDelay = 300) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  
  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  
  return { out, done };
}

function BrowserChrome({ children }) {
  return (
    <div className="browser-shell">
      <div className="browser-toolbar">
        <div className="traffic-lights">
          <span className="traffic-light traffic-light--red" />
          <span className="traffic-light traffic-light--yellow" />
          <span className="traffic-light traffic-light--green" />
        </div>
        <div className="browser-address-bar">
          <span className="browser-address-bar__prefix">https://</span>
          <span>simonodhiambo.dev</span>
        </div>
        <div className="browser-spacer" />
      </div>
      {children}
    </div>
  );
}

function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "about", label: "about", accent: "#14181F" },
    ...PROJECTS.map((project) => ({
      id: project.id,
      label: project.tab,
      accent: project.accent,
    })),
  ];

  return (
    <div className="tab-bar">
      {tabs.map((tab) => {
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${active ? "tab-button--active" : ""}`}
          >
            <span
              className="tab-dot"
              style={{ backgroundColor: active ? tab.accent : "#B7BCC9" }}
            />
            {tab.label}
            {active && <span className="tab-indicator" style={{ backgroundColor: tab.accent }} />}
          </button>
        );
      })}
    </div>
  );
}

function AboutPane({ setActiveTab }) {
  const { out, done } = useTypewriter(WHOAMI_LINE);

  return (
    <div className="panel panel--about">
      <div className="panel-label">
        <Terminal size={14} />
        <span>~/portfolio</span>
      </div>
      <div className="command-label">$ whoami</div>
      <h1 className="hero-heading">
        {out}
        <span className={`cursor ${done ? "cursor--active" : ""}`} />
      </h1>
      <p className="hero-copy">
        I build things for the browser — stores people can check out of, recipe finders for culinary
        inspiration, lists that keep tasks from slipping, and screens that just work behind a coffee
        counter. Four of those live under the tabs above.
      </p>

      <div className="project-chip-row">
        {PROJECTS.map((project) => {
          const Icon = project.icon;

          return (
            <button
              key={project.id}
              onClick={() => setActiveTab(project.id)}
              className="project-chip"
              style={{ backgroundColor: `${project.accent}14` }}
            >
              <Icon size={16} style={{ color: project.accent }} />
              {project.name}
            </button>
          );
        })}
      </div>

      <div className="contact-row">
        <a href="mailto:simonwilliam7124@gmail.com" className="portfolio-link">
          <Mail size={16} />
          simonwilliam7124@gmail.com
        </a>
        <a href="https://github.com/simonwilliam7124" className="portfolio-link">
          <GithubIcon size={16} />
          ://github.com/simonwilliam7124
        </a>
      </div>
    </div>
  );
}

function ProjectPane({ project }) {
  const Icon = project.icon;

  return (
    <div className="panel panel--project">
      <div className="panel-label">
        <Terminal size={14} />
        <span>~/projects/{project.file}</span>
      </div>

      <div className="project-header">
        <div
          className="project-icon-badge"
          style={{ backgroundColor: `${project.accent}14`, borderColor: `${project.accent}25` }}
        >
          <Icon size={28} style={{ color: project.accent }} />
        </div>
        <div>
          <h2 className="project-title">{project.name}</h2>
          <p className="project-tagline" style={{ color: project.accent }}>
            {project.tagline}
          </p>
        </div>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="stack-section">
        <h3 className="stack-heading">Tech Stack</h3>
        <div className="tech-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="project-links">
        <a
          href={project.demoUrl}
          target={project.demoUrl !== "#" ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="action-link"
        >
          <ExternalLink size={16} />
          View Demo
        </a>
        <a href="#" className="action-link">
          <GithubIcon size={16} />
          View Code
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("about");
  const activeProject = PROJECTS.find((p) => p.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F5F6F8] py-6 sm:py-8 px-3 sm:px-4">
      <BrowserChrome>
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "about" ? (
          <AboutPane setActiveTab={setActiveTab} />
        ) : (
          <ProjectPane project={activeProject} />
        )}
      </BrowserChrome>
    </div>
  );
}
