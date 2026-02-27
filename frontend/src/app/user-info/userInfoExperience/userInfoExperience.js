import styles from "./userInfoExperience.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";
import ExperienceModel from "../../../../models/ExperienceModel";
import ExperienceForm from "../experienceForm/experienceForm";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function UserInfoExperience(props) {
  const containerRef = useRef(null);
  const timeSinceScroll = useRef(0);
  const [draggingId, setDraggingId] = useState(-1);

  // Swap the items
  function onDragEnter(event) {
    const targetId = event.currentTarget.id;

    if (draggingId == targetId) {
      return;
    }

    const draggedIndex = props.userInfo.experiences.findIndex(
      (item) => item.id == draggingId,
    );
    const targetIndex = props.userInfo.experiences.findIndex(
      (item) => item.id == targetId,
    );

    const copy = new UserInfoModel(props.userInfo);
    [copy.experiences[draggedIndex], copy.experiences[targetIndex]] = [
      copy.experiences[targetIndex],
      copy.experiences[draggedIndex],
    ];

    props.setUserInfo(copy);
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
      {props.userInfo.experiences.map((experience, experienceIndex) => {
        return (
          <div
            className={`${draggingId === experience.id ? styles.dragging : ""} ${styles.draggable}`}
            id={experience.id}
            key={experience.id}
            draggable
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => onDragEnter(event)}
            onDragStart={() => setDraggingId(experience.id)}
            onDragEnd={() => setDraggingId(-1)}
          >
            <ExperienceForm
              experience={experience}
              experienceIndex={experienceIndex}
              setUserInfo={props.setUserInfo}
            ></ExperienceForm>
          </div>
        );
      })}

      <div
        className={`${styles.addNewExperience} primaryGrayAddInput`}
        style={
          props.userInfo.experiences.length != 0 ? { marginTop: "20px" } : {}
        }
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.experiences.push(new ExperienceModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new experience</p>
      </div>
    </section>
  );
}
