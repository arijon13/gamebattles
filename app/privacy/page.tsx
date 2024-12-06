"use client";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
        Privacy Policy
      </motion.h1>

      <motion.p variants={itemVariants} className="mb-6 text-sm opacity-70">
        Last updated: {new Date().toLocaleDateString()}
      </motion.p>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">1. Introduction</h2>
        <p className="mb-4">
          Welcome to GameBattles. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy explains how we handle your personal information when you use our services.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">2. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account information (username, email, password)</li>
          <li>Profile information (avatar, gaming preferences)</li>
          <li>Transaction data (wager amounts, payment information)</li>
          <li>Gaming activity (match history, statistics)</li>
          <li>Communication data (chat messages, support tickets)</li>
          <li>Technical data (IP address, device information, cookies)</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">3. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain our gaming services</li>
          <li>To process your transactions and wagers</li>
          <li>To verify your identity and prevent fraud</li>
          <li>To communicate with you about updates and promotions</li>
          <li>To improve our services and user experience</li>
          <li>To comply with legal obligations</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">4. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, 
          alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">5. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">6. Cookies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to enhance your experience on our platform. 
          You can control cookie settings through your browser preferences.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">7. Contact Us</h2>
        <p className="mb-4">
          If you have questions about this privacy policy or our privacy practices, please contact us at:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email: privacy@gamebattles.com</li>
          <li>Support: Through our Support Center</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mt-12 pt-8 border-t border-[#2e3354]">
        <p className="text-sm opacity-70">
          This privacy policy may be updated from time to time. We will notify you of any significant changes 
          by posting the new policy on this page.
        </p>
      </motion.section>
    </motion.div>
  );
} 