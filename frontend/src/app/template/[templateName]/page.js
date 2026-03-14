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
import Export from "./export/export";
import Popup from "../../../../components/popup/popup";
import UserInfoModel from "../../../../models/UserInfoModel";
const PdfViewer = dynamic(
  () => import("../../../../components/pdfViewer/pdfViewer"),
  { ssr: false },
);

export default function Template({ params }) {
  const { templateName } = use(params);
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const { isLoggedIn, checkIfLoggedIn } = useContext(accountContext);
  const [userInfo, setUserInfo] = useState(null);
  const [session, setSession] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [latexUrl, setLatexUrl] = useState(null);
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

  // Download a given file
  function download(selectedOption) {
    const link = document.createElement("a");
    link.href = selectedOption == "pdf" ? pdfUrl : latexUrl;
    link.download = selectedOption == "pdf" ? "texume.pdf" : "texume.tex";

    link.click();
    link.remove();
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
    const id = setTimeout(async () => {
      if (userInfo != null && session != null) {
        const response = await compileTemplate(
          userInfo,
          session,
          pdfTimestamp,
          isLoggedIn,
          checkIfLoggedIn,
          showNavbarAlert,
        );

        if (response == null) {
          setUserInfo(new UserInfoModel());
          return;
        }

        const pdfBinary = atob(response["pdf"]);
        const pdfBytes = new Uint8Array(pdfBinary.length);
        for (let index = 0; index < pdfBinary.length; index++) {
          pdfBytes[index] = pdfBinary.charCodeAt(index);
        }
        const pdfBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });
        setPdfUrl(URL.createObjectURL(pdfBlob));

        const latexText = atob(response["latex"]);
        const latexBlob = new Blob([latexText], { type: "text/plain" });
        setLatexUrl(URL.createObjectURL(latexBlob));
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
            {pdfVisible ? (
              <Export download={download}></Export>
            ) : (
              <div className={styles.previewAndExport}>
                <div
                  className="primaryGrayButton"
                  onClick={() => setPopupVisible(true)}
                >
                  <p>Preview</p>
                </div>
                <Export></Export>
              </div>
            )}
          </div>

          {pdfVisible && (
            <div className={styles.previewContainer}>{PdfViewerMemo}</div>
          )}

          {popupVisible && (
            <Popup close={() => setPopupVisible(false)}>
              <div className={styles.pdfPopupContainer}>
                <div>{PdfViewerMemo}</div>
              </div>
            </Popup>
          )}
        </section>
      ) : (
        <Loading></Loading>
      )}
    </section>
  );
}
