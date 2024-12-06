"use client";
import { motion } from "framer-motion";

export default function CookiePolicy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto px-6 py-12 text-[#c3c8f3]"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl font-bold mb-8 text-[#00e7ff]"
      >
        Cookie Policy
      </motion.h1>

      <motion.p variants={itemVariants} className="mb-6 text-sm opacity-70">
        Last updated: {new Date().toLocaleDateString()}
      </motion.p>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">1. Introduction</h2>
        <p className="mb-4">
          GameBattles uses cookies to enhance your experience on our platform. This Cookie Policy explains 
          what cookies are, how we use them, and your choices regarding cookies.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">2. What are Cookies?</h2>
        <p className="mb-4">
          Cookies are small text files that are stored on your device when you visit a website. They help 
          the website remember your preferences and improve your user experience.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">3. How We Use Cookies</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To remember your preferences and settings</li>
          <li>To authenticate your login sessions</li>
          <li>To analyze site traffic and usage</li>
          <li>To personalize content and ads</li>
          <li>To improve our services and user experience</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">4. Types of Cookies We Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential Cookies:</strong> Necessary for the operation of our website.</li>
          <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site.</li>
          <li><strong>Functionality Cookies:</strong> Allow us to remember your preferences.</li>
          <li><strong>Targeting Cookies:</strong> Used to deliver relevant ads to you.</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">5. Managing Cookies</h2>
        <p className="mb-4">
          You can manage your cookie preferences through your browser settings. Please note that disabling 
          cookies may affect the functionality of our website.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our Cookie Policy, please contact us at:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email: cookies@gamebattles.com</li>
          <li>Support: Through our Support Center</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mt-12 pt-8 border-t border-[#2e3354]">
        <p className="text-sm opacity-70">
          This Cookie Policy may be updated from time to time. We will notify you of any significant changes 
          by posting the new policy on this page.
        </p>
      </motion.section>
    </motion.div>
  );
} 