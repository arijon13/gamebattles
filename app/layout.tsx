"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Footer from "./components/footer";
import { AuthProvider } from "./authcontext";
import { FavouritesProvider } from "./favourites/favouritesContext";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <AuthProvider>
      <FavouritesProvider>
        <html lang="en">
          <head>
            <title>GameBattles</title>
            <meta name="description" content="A gaming and wagering platform." />
            <link rel="icon" href="/favicon.ico" />
          </head>
          <body className="bg-[#0a0e1a] text-white font-exo">
            <div className="flex min-h-screen">
              <Sidebar menuOpen={menuOpen} toggleMenu={toggleMenu} />
              <div className={`flex flex-col flex-1 ${menuOpen ? "ml-64" : "ml-16"} transition-all duration-300`}>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </div>
          </body>
        </html>
      </FavouritesProvider>
    </AuthProvider>
  );
}
