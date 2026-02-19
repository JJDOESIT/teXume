"use client";

import styles from "./navbar.module.css";

import Link from "next/link";
import NavbarAlert from "../navbarAlert/navbarAlert";
import { useContext, useEffect, useState } from "react";
import {
  Bars3Icon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { accountContext } from "../accountProvider/accountProvider";

export default function Navbar() {
  const { isLoggedIn } = useContext(accountContext);
  const [navbarLoaded, setNavbarLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sets whether the user is on mobile on resize
  function handleResize(mediaQuery) {
    setIsMobile(mediaQuery.matches);
  }

  // Add a resize event-listener using media query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);

    setNavbarLoaded(true);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <>
      {navbarLoaded && (
        <nav className={styles.container}>
          <NavbarAlert></NavbarAlert>

          <section className={styles.titleWrapper}>
            <img src="/logo.png" alt="Logo"></img>
            <p>TeXume</p>
          </section>

          <section className={styles.linkContainer}>
            {!isMobile ? (
              <div className={styles.linkWrapper}>
                <Link className={styles.browseLink} href="/browse">
                  <p>Browse Templates</p>
                </Link>
                {!isLoggedIn ? (
                  <Link className={styles.loginLink} href="/login">
                    <p>Login</p>
                  </Link>
                ) : (
                  <Link className={styles.accountLink} href="/account">
                    <p>Account</p>
                  </Link>
                )}
                <Link href="/user-info">
                  <div className={styles.resumeLink}>
                    <p>Build my resume</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div
                className={styles.menuIconWrapper}
                onClick={() => setMenuOpen((current) => !current)}
              >
                {!menuOpen ? <Bars3Icon /> : <XMarkIcon />}
              </div>
            )}
          </section>

          {menuOpen && (
            <section className={styles.menuContainer}>
              <div className={styles.menuBody}>
                <p className={styles.menuTitle}>Menu</p>

                <Link className={styles.menuBrowseLink} href="/browse">
                  <p>Browse Templates</p>
                  <ChevronRightIcon />
                </Link>

                {!isLoggedIn ? (
                  <Link className={styles.menuLoginLink} href="/login">
                    <p>Login</p>
                    <ChevronRightIcon />
                  </Link>
                ) : (
                  <Link className={styles.menuAccountLink} href="/login">
                    <p>Account</p>
                    <ChevronRightIcon />
                  </Link>
                )}
                <Link href="/user-info">
                  <div className={styles.menuResumeLink}>
                    <p>Build my resume</p>
                  </div>
                </Link>
              </div>

              <div className={styles.menuFooter}>
                <a>Support</a>
                <a>Contact</a>
              </div>
            </section>
          )}
        </nav>
      )}
    </>
  );
}
