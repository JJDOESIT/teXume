"use client";

import styles from "./template.module.css";

import Loading from "../../../../components/loading/loading";
import SectionContainer from "./sectionContainer/sectionContainer";
import dynamic from "next/dynamic";
import { use, useState, useEffect, useContext, useMemo, useRef } from "react";
import { navbarAlertContext } from "../../../../components/navbarAlertProvider/navbarAlertProvider";
import { accountContext } from "../../../../components/accountProvider/accountProvider";
import {
  compileTemplate,
  fetchUserInfo,
  initializeTemplate,
} from "../../../../utilities/template";

const PdfViewer = dynamic(
  () => import("../../../../components/pdfViewer/pdfViewer"),
  { ssr: false },
);

export default function Template({ params }) {
  const { templateName } = use(params);
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const { checkIfLoggedIn } = useContext(accountContext);
  const [userInfo, setUserInfo] = useState(null);
  const [session, setSession] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(true);
  const pdfTimestamp = useRef(Date.now());
  const PdfViewerMemo = useMemo(() => {
    return <PdfViewer pdfUrl={pdfUrl}></PdfViewer>;
  }, [pdfUrl]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const debounceTime = 500;

  // When the screen resizes to desktop dimensions
  function handleDesktopResize(mediaQuery) {
    if (mediaQuery.matches) {
      setPdfVisible(true);
      setPopupVisible(false);
    }
  }

  // When the screen resizes to mobile/tablet dimensions
  function handleMobileResize(mediaQuery) {
    if (mediaQuery.matches) {
      setPdfVisible(false);
    }
  }

  // On render, fetch user info and initialize template
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1201px)");
    const mobileQuery = window.matchMedia("(max-width: 1200px)");

    handleDesktopResize(desktopQuery);
    handleMobileResize(mobileQuery);

    desktopQuery.addEventListener("change", handleDesktopResize);
    mobileQuery.addEventListener("change", handleMobileResize);

    fetchUserInfo(setUserInfo, showNavbarAlert);
    initializeTemplate(templateName, setSession, showNavbarAlert);

    return () => {
      desktopQuery.removeEventListener("change", handleDesktopResize);
      mobileQuery.removeEventListener("change", handleMobileResize);
    };
  }, []);

  // Compile template when the user types using debouncing
  useEffect(() => {
    const id = setTimeout(() => {
      if (userInfo != null && session != null) {
        compileTemplate(
          userInfo,
          session,
          pdfTimestamp,
          setPdfUrl,
          checkIfLoggedIn,
          showNavbarAlert,
        );
      }
    }, debounceTime);

    return () => clearTimeout(id);
  }, [userInfo, session]);

  // Determine when the page loads
  useEffect(() => {
    if (userInfo != null && session != null && pdfUrl != null) {
      setIsLoading(false);
    }
  }, [userInfo, session, pdfUrl]);

  return (
    <section className={styles.container}>
      {!isLoading ? (
        <section className={styles.bodyContainer}>
          <div className={styles.sectionContainer}>
            <SectionContainer
              session={session}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></SectionContainer>
          </div>
          {pdfVisible && (
            <div className={styles.previewContainer}>{PdfViewerMemo}</div>
          )}
        </section>
      ) : (
        <Loading></Loading>
      )}
    </section>
  );
}
