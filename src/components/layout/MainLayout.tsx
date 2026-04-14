"use client";

import AppHeader from "./Header";
import AppSideNav from "./SideNav";
import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  role: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  user: User | null;
}

export default function MainLayout({ children, user }: MainLayoutProps) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 672);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (isMobile) {
        setIsSideNavOpen(false);
      } else {
        setIsSideNavOpen(true);
      }
    } else {
      setIsSideNavOpen(false);
    }
  }, [isAuthenticated, isMobile]);

  return (
    <div className="app-container">
      <AppHeader 
        isSideNavOpen={isSideNavOpen} 
        onToggleSideNav={() => setIsSideNavOpen(!isSideNavOpen)} 
        isAuthenticated={isAuthenticated} 
      />
      <div className="app-body">
        {isAuthenticated && (
          <aside className={`side-nav-wrapper ${isSideNavOpen ? "open" : "closed"}`}>
            <AppSideNav />
          </aside>
        )}
        <main
          className={`app-content ${!isAuthenticated ? "no-sidebar" : ""}`}
          onClick={() => {
            if (isAuthenticated && isMobile && isSideNavOpen) {
              setIsSideNavOpen(false);
            }
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}