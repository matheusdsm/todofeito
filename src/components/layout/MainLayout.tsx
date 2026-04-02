"use client";

import AppHeader from "./Header";
import AppSideNav from "./SideNav";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "@carbon/icons-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 672);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSideNavOpen(false);
    } else {
      setIsSideNavOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="app-container">
      <AppHeader />
      <div className="app-body">
        <aside className={`side-nav-wrapper ${isSideNavOpen ? "open" : "closed"}`}>
          <AppSideNav />
        </aside>
        <button
          className="sidenav-toggle-btn"
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          aria-label={isSideNavOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isSideNavOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        <main
          className="app-content"
          onClick={() => {
            if (isMobile && isSideNavOpen) {
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
