"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  UserGroupIcon, 
  CommandLineIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

// Definere interface for link type
interface FooterLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface Section {
  title: string;
  links: FooterLink[];
}

// Legg til SVG-ikonene rett etter imports
const SocialIcons = {
  twitter: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
};

export default function Information() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const sections: Section[] = [
    {
      title: "About Us",
      links: [
        { href: "/about", label: "Our Story", icon: <DocumentTextIcon className="w-4 h-4" /> },
        { href: "/team", label: "Our Team", icon: <UserGroupIcon className="w-4 h-4" /> },
        { href: "/careers", label: "Careers", icon: <BriefcaseIcon className="w-4 h-4" /> }
      ]
    },
    {
      title: "Games",
      links: [
        { href: "/games/fifa", label: "FC 25", icon: <CommandLineIcon className="w-4 h-4" /> },
        { href: "/games/csgo", label: "CS2", icon: <CommandLineIcon className="w-4 h-4" /> },
        { href: "/games/fortnite", label: "Fortnite", icon: <CommandLineIcon className="w-4 h-4" /> },
        { href: "/games/cod", label: "Call of Duty", icon: <CommandLineIcon className="w-4 h-4" /> },
        { href: "/games/valorant", label: "Valorant", icon: <CommandLineIcon className="w-4 h-4" /> }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { href: "/support", label: "Support Center", icon: <SpeakerWaveIcon className="w-4 h-4" /> },
        { href: "/faq", label: "FAQs", icon: <QuestionMarkCircleIcon className="w-4 h-4" /> },
        { href: "/contact", label: "Contact Us", icon: <EnvelopeIcon className="w-4 h-4" /> },
        { href: "/live-chat", label: "Live Chat", icon: <ChatBubbleLeftRightIcon className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-[#c3c8f3] py-12 px-6 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl mx-auto">
        {sections.map((section, index) => (
          <motion.div 
            key={section.title}
            variants={itemVariants}
            className="text-center sm:text-left"
          >
            <h3 className="text-xl font-bold mb-6 text-[#00e7ff] pb-2 relative">
              {section.title}
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-[#00e7ff] to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <motion.li 
                  key={link.label}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center space-x-2 text-cyan-400 hover:text-[#00e7ff] transition-all duration-300"
                  >
                    {link.icon && (
                      <span className="text-cyan-400/70 group-hover:text-[#00e7ff] transition-colors">
                        {link.icon}
                      </span>
                    )}
                    <span className="relative">
                      {link.label}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#00e7ff] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Updated Social Media Links */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center space-x-6 mt-12 mb-8"
      >
        {Object.entries(SocialIcons).map(([platform, icon]) => (
          <Link
            key={platform}
            href={`https://${platform}.com/gamebattles`}
            className="text-cyan-400 hover:text-[#00e7ff] transform hover:scale-110 transition-all duration-300"
          >
            {icon}
          </Link>
        ))}
      </motion.div>

      {/* Copyright Section */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 pt-8 border-t border-[#2e3354]/30 text-center max-w-6xl mx-auto"
      >
        <p className="text-sm text-[#86d9f9]/70">
          © {new Date().getFullYear()} GameBattles. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4 text-xs text-[#86d9f9]/50">
          <Link href="/privacy" className="hover:text-[#00e7ff] transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-[#00e7ff] transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link href="/cookies" className="hover:text-[#00e7ff] transition-colors">Cookie Policy</Link>
        </div>
        <p className="text-xs text-[#86d9f9]/50 mt-4">
          All trademarks referenced herein are the properties of their respective owners.
        </p>
      </motion.div>
    </motion.footer>
  );
}
