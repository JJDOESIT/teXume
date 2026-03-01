import styles from "./sectionContainer.module.css";

import UserInfoModel from "../../../../../models/UserInfoModel";
import UserInfoProjects from "@/app/user-info/userInfoProjects/userInfoProjects";
import UserInfoDetails from "@/app/user-info/userInfoDetails/userInfoDetails";
import UserInfoEducation from "@/app/user-info/userInfoEducation/userInfoEducation";
import UserInfoExperience from "@/app/user-info/userInfoExperience/userInfoExperience";
import SectionPreview from "./sectionPreview/sectionPreview";
import UserInfoSkills from "@/app/user-info/userInfoSkills/userInfoSkills";
import UserInfoAchievements from "@/app/user-info/userInfoAchievements/userInfoAchievements";
import { useSortable } from "@dnd-kit/react/sortable";
import { useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import {
  AcademicCapIcon,
  BeakerIcon,
  BoltIcon,
  BriefcaseIcon,
  IdentificationIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { swapMultipleSections } from "../../../../../api/template";

function DraggableSection({
  section,
  index,
  setSections,
  visibility,
  setVisibility,
  userInfo,
  setUserInfo,
  session,
}) {
  const { ref } = useSortable({
    id: section,
    index,
  });

  return (
    <div className="draggable" ref={ref}>
      {section == "Details" && (
        <SectionPreview
          visible={visibility[section]}
          setVisibility={setVisibility}
          setSections={setSections}
          section={
            <UserInfoDetails
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></UserInfoDetails>
          }
          icon={
            <IdentificationIcon
              style={{ fill: "rgb(0, 0, 0" }}
            ></IdentificationIcon>
          }
          sectionName={section}
          session={session}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></SectionPreview>
      )}
      {section == "Education" && (
        <SectionPreview
          visible={visibility[section]}
          setVisibility={setVisibility}
          setSections={setSections}
          section={
            <UserInfoEducation
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></UserInfoEducation>
          }
          icon={
            <AcademicCapIcon
              style={{ fill: "rgb(110, 110, 240" }}
            ></AcademicCapIcon>
          }
          sectionName={section}
          session={session}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></SectionPreview>
      )}
      {section == "Experience" && (
        <SectionPreview
          visible={visibility[section]}
          setVisibility={setVisibility}
          setSections={setSections}
          section={
            <UserInfoExperience
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></UserInfoExperience>
          }
          icon={
            <BriefcaseIcon style={{ fill: "rgb(140, 70, 20" }}></BriefcaseIcon>
          }
          sectionName={section}
          session={session}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></SectionPreview>
      )}
      {section == "Projects" && (
        <SectionPreview
          visible={visibility[section]}
          setVisibility={setVisibility}
          setSections={setSections}
          section={
            <UserInfoProjects
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></UserInfoProjects>
          }
          icon={<BeakerIcon style={{ fill: "rgb(85, 160, 40" }}></BeakerIcon>}
          sectionName={section}
          session={session}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></SectionPreview>
      )}
      {section == "Skills" && (
        <SectionPreview
          visible={visibility[section]}
          setVisibility={setVisibility}
          setSections={setSections}
          section={
            <UserInfoSkills
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></UserInfoSkills>
          }
          icon={<BoltIcon style={{ fill: "rgb(230, 235, 25" }}></BoltIcon>}
          sectionName={section}
          session={session}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></SectionPreview>
      )}
      {section == "Achievements" && (
        <SectionPreview
          visible={visibility[section]}
          setVisibility={setVisibility}
          setSections={setSections}
          section={
            <UserInfoAchievements
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></UserInfoAchievements>
          }
          icon={<StarIcon style={{ fill: "rgb(255, 215, 10" }}></StarIcon>}
          sectionName={section}
          session={session}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></SectionPreview>
      )}
    </div>
  );
}

export default function SectionContainer(props) {
  const [sections, setSections] = useState([
    "Details",
    "Education",
    "Experience",
    "Projects",
    "Skills",
    "Achievements",
  ]);
  const [visibility, setVisibility] = useState({
    Details: true,
    Education: true,
    Experience: true,
    Projects: true,
    Skills: true,
    Achievements: true,
  });
  const [previousSections, setPreviousSections] = useState(sections);

  // Handle swapping of sections and re-compiling
  async function swapSections() {
    const length = sections.length;

    let changeDetected = false;
    for (let index = 0; index < length; index++) {
      if (sections[index] != previousSections[index]) {
        changeDetected = true;
      }
    }

    if (!changeDetected) {
      return;
    }

    let sectionChanged;
    for (let index = 0; index < length; index++) {
      if (sections[index] != previousSections[index]) {
        if (previousSections[index] == sections[index + 1]) {
          sectionChanged = sections[index];
        } else {
          sectionChanged = previousSections[index];
        }
        break;
      }
    }

    const swapList = [];
    let reverse = false;
    let add = false;
    for (let index = 0; index < length; index++) {
      if (previousSections[index] == sectionChanged && !add) {
        add = true;
        continue;
      } else if (sections[index] == sectionChanged && add) {
        swapList.push(previousSections[index]);
        break;
      } else if (sections[index] == sectionChanged && !add) {
        reverse = true;
        add = true;
      } else if (previousSections[index] == sectionChanged && add) {
        break;
      }
      if (add) {
        swapList.push(previousSections[index]);
      }
    }
    if (reverse) {
      swapList.reverse();
    }
    await swapMultipleSections(sectionChanged, swapList, props.session);
    setPreviousSections(sections);
    props.setUserInfo(new UserInfoModel(props.userInfo));
  }

  // Debounce for swapping sections
  useEffect(() => {
    const id = setTimeout(() => {
      swapSections();
    }, 500);

    return () => clearTimeout(id);
  }, [sections]);

  return (
    <section className={styles.container}>
      <DragDropProvider
        onDragOver={(event) => {
          setSections((prev) => move(prev, event));
        }}
      >
        {sections.map((section, sectionIndex) => {
          return (
            <DraggableSection
              key={section}
              section={section}
              index={sectionIndex}
              setSections={setSections}
              visibility={visibility}
              setVisibility={setVisibility}
              userInfo={props.userInfo}
              setUserInfo={props.setUserInfo}
              session={props.session}
            ></DraggableSection>
          );
        })}
      </DragDropProvider>
    </section>
  );
}
