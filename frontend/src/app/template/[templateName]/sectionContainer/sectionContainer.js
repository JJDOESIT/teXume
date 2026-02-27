import styles from "./sectionContainer.module.css";

import UserInfoDetails from "@/app/user-info/userInfoDetails/userInfoDetails";
import SectionPreview from "./sectionPreview/sectionPreview";
import UserInfoEducation from "@/app/user-info/userInfoEducation/userInfoEducation";
import UserInfoExperience from "@/app/user-info/userInfoExperience/userInfoExperience";
import UserInfoProjects from "@/app/user-info/userInfoProjects/userInfoProjects";
import UserInfoSkills from "@/app/user-info/userInfoSkills/userInfoSkills";
import UserInfoAchievements from "@/app/user-info/userInfoAchievements/userInfoAchievements";
import { useRef, useState } from "react";
import {
  AcademicCapIcon,
  BeakerIcon,
  BoltIcon,
  BriefcaseIcon,
  IdentificationIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

export default function SectionContainer(props) {
  const containerRef = useRef(null);
  const timeSinceScroll = useRef(0);
  const [draggingId, setDraggingId] = useState(-1);
  const [sections, setSections] = useState([
    { name: "Details", id: 1 },
    { name: "Education", id: 2 },
    { name: "Experience", id: 3 },
    { name: "Projects", id: 4 },
    { name: "Skills", id: 5 },
    { name: "Achievements", id: 6 },
  ]);

  // Swap the items
  function onDragEnter(event) {
    const targetId = event.currentTarget.id;

    if (draggingId == targetId) {
      return;
    }

    const draggedIndex = sections.findIndex((item) => item.id == draggingId);
    const targetIndex = sections.findIndex((item) => item.id == targetId);

    const copy = sections.slice();
    [copy[draggedIndex], copy[targetIndex]] = [
      copy[targetIndex],
      copy[draggedIndex],
    ];

    setSections(copy);
  }

  // Manually scroll the container
  function onDragOver(event) {
    event.preventDefault();
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const threshold = 50;

    const mouseY = event.clientY;
    const offsetY = mouseY - rect.top;

    const currentTime = Date.now();

    if (currentTime - timeSinceScroll.current >= 50) {
      if (offsetY < threshold) {
        container.scrollTop -= 10;
      } else if (offsetY > rect.height - threshold) {
        container.scrollTop += 10;
      }
      timeSinceScroll.current = currentTime;
    }
  }

  return (
    <section
      className={styles.container}
      ref={containerRef}
      onDragOver={(event) => onDragOver(event)}
    >
      {sections.map((section) => {
        console.log(section);
        return (
          <div
            className={`${draggingId === section["id"] ? styles.dragging : ""} ${styles.draggable}`}
            id={section["id"]}
            key={section["id"]}
            draggable
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => onDragEnter(event)}
            onDragStart={() => setDraggingId(section["id"])}
            onDragEnd={() => setDraggingId(-1)}
          >
            {section["name"] == "Details" && (
              <SectionPreview
                setSections={setSections}
                section={
                  <UserInfoDetails
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                  ></UserInfoDetails>
                }
                icon={
                  <IdentificationIcon
                    style={{ fill: "rgb(0, 0, 0" }}
                  ></IdentificationIcon>
                }
                sectionName={section["name"]}
              ></SectionPreview>
            )}
            {section["name"] == "Education" && (
              <SectionPreview
                setSections={setSections}
                section={
                  <UserInfoEducation
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                  ></UserInfoEducation>
                }
                icon={
                  <AcademicCapIcon
                    style={{ fill: "rgb(110, 110, 240" }}
                  ></AcademicCapIcon>
                }
                sectionName={section["name"]}
              ></SectionPreview>
            )}
            {section["name"] == "Experience" && (
              <SectionPreview
                setSections={setSections}
                section={
                  <UserInfoExperience
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                  ></UserInfoExperience>
                }
                icon={
                  <BriefcaseIcon
                    style={{ fill: "rgb(140, 70, 20" }}
                  ></BriefcaseIcon>
                }
                sectionName={section["name"]}
              ></SectionPreview>
            )}
            {section["name"] == "Projects" && (
              <SectionPreview
                setSections={setSections}
                section={
                  <UserInfoProjects
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                  ></UserInfoProjects>
                }
                icon={
                  <BeakerIcon style={{ fill: "rgb(85, 160, 40" }}></BeakerIcon>
                }
                sectionName={section["name"]}
              ></SectionPreview>
            )}
            {section["name"] == "Skills" && (
              <SectionPreview
                setSections={setSections}
                section={
                  <UserInfoSkills
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                  ></UserInfoSkills>
                }
                icon={
                  <BoltIcon style={{ fill: "rgb(230, 235, 25" }}></BoltIcon>
                }
                sectionName={section["name"]}
              ></SectionPreview>
            )}
            {section["name"] == "Achievements" && (
              <SectionPreview
                setSections={setSections}
                section={
                  <UserInfoAchievements
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                  ></UserInfoAchievements>
                }
                icon={
                  <StarIcon style={{ fill: "rgb(255, 215, 10" }}></StarIcon>
                }
                sectionName={section["name"]}
              ></SectionPreview>
            )}
          </div>
        );
      })}
    </section>
  );
}
