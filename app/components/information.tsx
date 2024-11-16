"use client";

import Link from "next/link";

export default function Information() {
  return (
    <div className="bg-[#1f2236] text-[#c3c8f3] py-10 px-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[55%] mx-auto">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b border-[#00d4ff] pb-1">About Us</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/about">Our Story</Link>
            </li>
            <li>
              <Link href="/team">Our Team</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Games Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b border-[#00d4ff] pb-1">Games</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/games/fifa">FIFA</Link>
            </li>
            <li>
              <Link href="/games/csgo">CS:GO</Link>
            </li>
            <li>
              <Link href="/games/fortnite">Fortnite</Link>
            </li>
            <li>
              <Link href="/games/cod">Call of Duty</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b border-[#00d4ff] pb-1">Customer Service</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/support">Support Center</Link>
            </li>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
