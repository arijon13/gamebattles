"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  SpeakerWaveIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ComputerDesktopIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function SupportCenter() {
  const [activeTab, setActiveTab] = useState("getting-started");

  const tabs = [
    { id: "getting-started", label: "Getting Started", icon: <SpeakerWaveIcon className="w-5 h-5" /> },
    { id: "rules", label: "Rules & Guidelines", icon: <DocumentTextIcon className="w-5 h-5" /> },
    { id: "payment", label: "Payment Help", icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: "technical", label: "Technical Support", icon: <ComputerDesktopIcon className="w-5 h-5" /> },
    { id: "account", label: "Account Support", icon: <UserCircleIcon className="w-5 h-5" /> },
    { id: "report", label: "Report a Problem", icon: <ExclamationTriangleIcon className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "getting-started":
        return (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white mb-2">Welcome to GameBattles!</h2>
              <p className="text-gray-400">Here's everything you need to know to get started.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Create Account", desc: "Set up your GameBattles profile" },
                { title: "Profile Setup", desc: "Customize your gaming identity" },
                { title: "Join Games", desc: "Find and join your first match" },
                { title: "Earn Rewards", desc: "Start winning and earning" }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#1f2236] p-4 rounded-lg border border-gray-800 hover:border-[#00e7ff]/30 
                    transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-600 group-hover:text-[#00e7ff] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case "rules":
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Rules & Guidelines</h2>
            <p>Ensure a fair and enjoyable experience for everyone by following our rules.</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400">
              <li>Code of conduct</li>
              <li>Game-specific rules</li>
              <li>Reporting violations</li>
            </ul>
          </div>
        );
      case "payment":
        return (
          <div>
            <h2 className="text-xl font-bold mb-2">Payment Help</h2>
            <p>Find answers to common payment questions here.</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400">
              <li>How to add funds</li>
              <li>Withdrawal process</li>
              <li>Payment methods supported</li>
            </ul>
          </div>
        );
      case "technical":
        return <p>Experiencing technical issues? Our support team is here to help.</p>;
      case "account":
        return <p>Get assistance with account-related issues and inquiries.</p>;
      case "report":
        return <p>Encountered a problem? Let us know so we can address it promptly.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-3">Support Center</h1>
        <p className="text-gray-400">Get help with your GameBattles experience</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab.id 
                ? "bg-[#00e7ff] text-[#1a1b32] font-semibold shadow-[0_0_20px_rgba(0,231,255,0.3)]" 
                : "bg-[#1f2236] text-gray-300 hover:bg-[#262940] hover:border-[#00e7ff]/30"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1f2236]/50 p-6 rounded-lg"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
} 