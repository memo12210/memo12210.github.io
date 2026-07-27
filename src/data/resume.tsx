import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { Cpp } from "@/components/ui/svgs/cpp";
import { Rust } from "@/components/ui/svgs/rust";
import { Unity } from "@/components/ui/svgs/unity";
import { UnrealEngine } from "@/components/ui/svgs/unrealengine";
import { Godot } from "@/components/ui/svgs/godot";
import { Git } from "@/components/ui/svgs/git";

export const DATA = {
  name: "Mehmet Çalıkoğlu",
  initials: "MC",
  url: "https://memocaldev.com",
  location: "Bodrum, Turkey",
  locationLink: "https://www.google.com/maps/place/bodrum",
  description:
    "Software engineer and game developer, with an interest in graphics programming and embedded systems.",
  summary:
    "At the summer of 2026, I graduated from the Dokuz Eylül University with a degree in Computer Engineering. I have been developing games and software for over 5 years, and currently work as a game developer intern at a game studio. I have experience in C++, C#, and Python, and have worked on several software and game development projects.",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "C++", icon: Cpp },
    { name: "C#", icon: Csharp },
    { name: "Python", icon: Python },
    { name: "Rust", icon: Rust },
    { name: "Java", icon: Java },
    { name: "Unity", icon: Unity },
    { name: "Unreal Engine", icon: UnrealEngine },
    { name: "Godot", icon: Godot },
    { name: "Postgres", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Git", icon: Git },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "memocaldev@gmail.com",
    tel: "+905068890938",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/memo12210",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mehmetcalikoglu/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:memocaldev@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Furtle Game",
      href: "https://furtlegame.com",
      badges: [],
      location: "Izmir, Turkey",
      title: "Game Developer Intern",
      logoUrl: "/furtlegame.jpg",
      start: "Jul 2026",
      end: "Aug 2026",
      description:
        "Designed and developed a clone of the Mafia Life, which itself was developed by the Furtle Game. Used C# and Unity to develop the game, and Git for version control. Also used MVC architecture to structure the codebase and separate responsibilities.",
    },
    {
      company: "Optimimax",
      href: "https://orhuntechnology.com/",
      badges: [],
      location: "Izmir, Turkey",
      title: "Software Engineer Intern",
      logoUrl: "/optimimax.jpg",
      start: "Aug 2024",
      end: "Sep 2024",
      description:
        "Developed a digital twin application for factory monitoring and optimization using C# and Unity. Implemented real-time data visualization and analytics for better decision-making and operational efficiency. Made use of SOLID principles and various design patterns for maintainable code.",
    },
  ],
  education: [
    {
      school: "Dokuz Eylül University",
      href: "https://deu.edu.tr/",
      degree: "BSc in Computer Engineering",
      logoUrl: "/deu.png",
      start: "2023",
      end: "2026",
    },
  ],
  projects: [
    {
      title: "Smart Greenhouse Monitoring System",
      href: "https://github.com/memo12210",
      dates: "Nov 2025 - May 2026",
      active: true,
      description:
        "Developed an IoT platform for real-time greenhouse monitoring, integrating ESP32 microcontroller, FastAPI backend, PostgreSQL database, and a Flutter mobile app.",
      technologies: [
        "C++",
        "MQTT",
        "Python",
        "PostgreSQL",
        "Docker",
        "Flutter",
        "Git",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/memo12210/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/placeholder.png",
      video: "",
    },
    {
      title: "Scopapilia",
      href: "https://fiuby.com/en/games/scopapilia",
      dates: "Jun 2025",
      active: true,
      description:
        "Developed a 2.5D horror game in 48 hours during a game jam, which won the 3rd place. Collaborated in a small team of four, using Git and GitHub for version control.",
      technologies: ["C#", "Unity", "Git", "GitHub"],
      links: [
        {
          type: "Website",
          href: "https://fiuby.com/en/games/scopapilia",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/memo12210/Scopapilia",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/scopapilia.mp4",
    },
    {
      title: "Bitty Witch",
      href: "https://neneme.itch.io/bitty-witchy",
      dates: "Jan 2025",
      active: true,
      description:
        "Developed a 2.5D crafting game featuring resource collection, crafting mechanics, and an interaction system.",
      technologies: ["C#", "Unity", "Git", "GitHub"],
      links: [
        {
          type: "Website",
          href: "https://neneme.itch.io/bitty-witchy",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/bitty_witch.mp4",
    },
    {
      title: "Pizza Delivery 3D",
      href: "https://github.com/memo12210/PizzaDelivery3DGame",
      dates: "Nov 2022 - Jan 2023",
      active: true,
      description:
        "Developed a hypercasual 3D game centered on item collection and obstacle avoidance mechanics.",
      technologies: ["C#", "Unity", "Git", "GitHub"],
      links: [
        {
          type: "Source",
          href: "https://github.com/memo12210/PizzaDelivery3DGame",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "pizza_delivery_3d.mp4",
    },
  ],
  music: [
    {
      title: "Lorem ipsum",
      date: "June 2026",
      description:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nibh ligula, faucibus eu augue nec mauris.",
      url: "https://soundcloud.com/royaltyfreebackgroundmusic/creative-commons-music-3654",
    },
    {
      title: "Dolor sit Amet",
      date: "March 2026",
      description:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nibh ligula, faucibus eu augue nec mauris. ",
      url: "https://soundcloud.com/royaltyfreebackgroundmusic/creative-commons-music-3655",
    },
    {
      title: "Consctetur Elit",
      date: "November 2025",
      description:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nibh ligula, faucibus eu augue nec mauris. ",
      url: "https://soundcloud.com/royaltyfreebackgroundmusic/creative-commons-music-3656",
    },
  ],
} as const;
