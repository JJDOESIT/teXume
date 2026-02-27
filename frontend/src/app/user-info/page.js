"use client";

import styles from "./user-info.module.css";

import dynamic from "next/dynamic";
import UserInfoEducation from "./userInfoEducation/userInfoEducation";
import UserInfoDetails from "./userInfoDetails/userInfoDetails";
import UserInfoExperience from "./userInfoExperience/userInfoExperience";
import UserInfoProjects from "./userInfoProjects/userInfoProjects";
import UserInfoSkills from "./userInfoSkills/userInfoSkills";
import UserInfoAchievements from "./userInfoAchievements/userInfoAchievements";
import UserInfoSave from "./userInfoSave/userInfoSave";
import Loading from "../../../components/loading/loading";
import Popup from "../../../components/popup/popup";

import { useState, useEffect, useMemo, useContext, useRef } from "react";
import {
  AcademicCapIcon,
  BeakerIcon,
  BoltIcon,
  BriefcaseIcon,
  IdentificationIcon,
  MinusCircleIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { navbarAlertContext } from "../../../components/navbarAlertProvider/navbarAlertProvider";
import { accountContext } from "../../../components/accountProvider/accountProvider";
import {
  compileTemplate,
  fetchUserInfo,
  initializeTemplate,
} from "../../../utilities/template";

const PdfViewer = dynamic(
  () => import("../../../components/pdfViewer/pdfViewer"),
  { ssr: false },
);

export default function UserInfo() {
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const { checkIfLoggedIn } = useContext(accountContext);
  const [userInfo, setUserInfo] = useState(null);
  const [session, setSession] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sectionsVisible, setSectionsVisible] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(true);
  const pdfTimestamp = useRef(Date.now());
  const PdfViewerMemo = useMemo(() => {
    return <PdfViewer pdfUrl={pdfUrl}></PdfViewer>;
  }, [pdfUrl]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const debounceTime = 500;
  const defaultTemplate = "formal";
  const sections = [
    {
      name: "Details",
      icon: <IdentificationIcon></IdentificationIcon>,
      section: (
        <UserInfoDetails
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></UserInfoDetails>
      ),
    },
    {
      name: "Education",
      icon: <AcademicCapIcon></AcademicCapIcon>,
      section: (
        <UserInfoEducation
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></UserInfoEducation>
      ),
    },
    {
      name: "Experience",
      icon: <BriefcaseIcon></BriefcaseIcon>,
      section: (
        <UserInfoExperience
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></UserInfoExperience>
      ),
    },
    {
      name: "Projects",
      icon: <BeakerIcon></BeakerIcon>,
      section: (
        <UserInfoProjects
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></UserInfoProjects>
      ),
    },
    {
      name: "Skills",
      icon: <BoltIcon></BoltIcon>,
      section: (
        <UserInfoSkills
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></UserInfoSkills>
      ),
    },
    {
      name: "Achievements",
      icon: <StarIcon></StarIcon>,
      section: (
        <UserInfoAchievements
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></UserInfoAchievements>
      ),
    },
  ];

  // When the screen resizes to desktop dimensions
  function handleDesktopResize(mediaQuery) {
    if (mediaQuery.matches) {
      setSectionsVisible(true);
      setPdfVisible(true);
      setPopupVisible(false);
    }
  }

  // When the screen resizes to mobile/tablet dimensions
  function handleMobileResize(mediaQuery) {
    if (mediaQuery.matches) {
      setSectionsVisible(false);
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
    initializeTemplate(defaultTemplate, setSession, showNavbarAlert);

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
      {!isLoading && !isSaving ? (
        <section className={styles.bodyContainer}>
          {!pdfVisible && (
            <div className={styles.previewAndSave}>
              <div
                className="primaryGrayButton"
                onClick={() => setPopupVisible(true)}
              >
                <p>Preview</p>
              </div>
              <UserInfoSave
                userInfo={userInfo}
                setIsLoading={setIsSaving}
              ></UserInfoSave>
            </div>
          )}

          {sectionsVisible && (
            <div className={styles.sectionProgressContainer}>
              {sections.map((item, index) => {
                return (
                  <div
                    className={`${styles.sectionProgressItem} ${index == sectionIndex ? styles.active : ""}`}
                    onClick={() => setSectionIndex(index)}
                    key={index}
                  >
                    <p>{item["name"]}</p>
                    <div>
                      <div
                        className={`${styles.sectionProgressDot} ${index == sectionIndex ? styles.active : ""}`}
                      >
                        <MinusCircleIcon></MinusCircleIcon>
                        <div
                          className={`${index != sections.length - 1 ? styles.sectionProgressBar : ""} ${index == sectionIndex ? styles.bleedTop : ""} ${index == sectionIndex - 1 ? styles.bleedBottom : ""}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={styles.save}>
                <UserInfoSave
                  userInfo={userInfo}
                  setIsLoading={setIsSaving}
                ></UserInfoSave>
              </div>
            </div>
          )}

          {userInfo != null && (
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <div>{sections[sectionIndex]["icon"]}</div>
                <p>{sections[sectionIndex]["name"]}</p>
              </div>

              {sections[sectionIndex]["section"]}

              <div className={styles.sectionFooter}>
                {sectionIndex != 0 && (
                  <div
                    className="primaryGrayButton"
                    onClick={() => setSectionIndex((prev) => prev - 1)}
                  >
                    <p>Back</p>
                  </div>
                )}
                {sectionIndex != sections.length - 1 && (
                  <div
                    className={`${styles.sectionNextWrapper} primaryEmeraldButton`}
                    onClick={() => setSectionIndex((prev) => prev + 1)}
                  >
                    <p>Next</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {pdfVisible && (
            <div className={styles.sectionPreview}>{PdfViewerMemo}</div>
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
