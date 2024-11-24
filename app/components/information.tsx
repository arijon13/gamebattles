"use client";

import Link from "next/link";

export default function Information() {
  return (
    <div className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-[#c3c8f3] py-10 px-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
        {/* About Us Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold mb-4 text-[#00e7ff] border-b-2 border-[#00d4ff] pb-2">
            About Us
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                Our Team
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Games Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold mb-4 text-[#00e7ff] border-b-2 border-[#00d4ff] pb-2">
            Games
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/games/fifa"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                FIFA
              </Link>
            </li>
            <li>
              <Link
                href="/games/csgo"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                CS:GO
              </Link>
            </li>
            <li>
              <Link
                href="/games/fortnite"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                Fortnite
              </Link>
            </li>
            <li>
              <Link
                href="/games/cod"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                Call of Duty
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold mb-4 text-[#00e7ff] border-b-2 border-[#00d4ff] pb-2">
            Customer Service
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/support"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                Support Center
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-cyan-400 hover:text-[#00b9d6] transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
