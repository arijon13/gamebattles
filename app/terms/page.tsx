"use client";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
        Terms of Service
      </motion.h1>

      <motion.p variants={itemVariants} className="mb-6 text-sm opacity-70">
        Last updated: {new Date().toLocaleDateString()}
      </motion.p>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">1. Agreement to Terms</h2>
        <p className="mb-4">
          By accessing or using GameBattles, you agree to be bound by these Terms of Service. 
          If you disagree with any part of the terms, you may not access our services.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">2. Eligibility</h2>
        <p className="mb-4">To use GameBattles, you must:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Be at least 18 years old</li>
          <li>Have the legal capacity to enter into binding contracts</li>
          <li>Not be prohibited from participating in competitive gaming by applicable laws</li>
          <li>Provide accurate and truthful information during registration</li>
          <li>Maintain only one active account</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">3. User Accounts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You are responsible for maintaining the security of your account</li>
          <li>Account sharing or selling is strictly prohibited</li>
          <li>You must immediately notify us of any unauthorized access</li>
          <li>We reserve the right to suspend or terminate accounts for violations</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">4. Competitive Gaming Rules</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All matches must follow our official game rules</li>
          <li>Cheating, exploiting, or match manipulation is prohibited</li>
          <li>Users must report match results accurately and promptly</li>
          <li>Disputes must be submitted through proper channels</li>
          <li>We reserve the right to make final decisions on match outcomes</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">5. Payments and Wagers</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All transactions are final once a match begins</li>
          <li>Users must have sufficient funds for their wagers</li>
          <li>Withdrawal requests are subject to verification</li>
          <li>We may hold funds pending dispute resolution</li>
          <li>Users are responsible for applicable taxes on winnings</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">6. Code of Conduct</h2>
        <p className="mb-4">Users must:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Treat all users with respect</li>
          <li>Not engage in harassment or hate speech</li>
          <li>Not attempt to manipulate or abuse the platform</li>
          <li>Follow all game-specific rules and guidelines</li>
          <li>Report violations by other users</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">7. Intellectual Property</h2>
        <p className="mb-4">
          All content on GameBattles, including but not limited to logos, designs, text, and software, 
          is protected by intellectual property rights and may not be used without permission.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">8. Limitation of Liability</h2>
        <p className="mb-4">
          GameBattles is not liable for any indirect, incidental, special, or consequential damages 
          arising from your use of our services or any disputes between users.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">9. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. Continued use of GameBattles 
          after changes constitutes acceptance of the new terms.
        </p>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#00e7ff]">10. Contact Information</h2>
        <p className="mb-4">
          For questions about these terms, please contact us at:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email: legal@gamebattles.com</li>
          <li>Support: Through our Support Center</li>
        </ul>
      </motion.section>

      <motion.section variants={itemVariants} className="mt-12 pt-8 border-t border-[#2e3354]">
        <p className="text-sm opacity-70">
          By using GameBattles, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </p>
      </motion.section>
    </motion.div>
  );
} 