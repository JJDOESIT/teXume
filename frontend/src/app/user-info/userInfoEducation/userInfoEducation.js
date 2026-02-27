import styles from "./userInfoEducation.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";
import EducationModel from "../../../../models/EducationModel";
import EducationForm from "../educationForm/educationForm";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function UserInfoEducation(props) {
  const containerRef = useRef(null);
  const timeSinceScroll = useRef(0);
  const [draggingId, setDraggingId] = useState(-1);

  // Swap the items
  function onDragEnter(event) {
    const targetId = event.currentTarget.id;

    if (draggingId == targetId) {
      return;
    }

    const draggedIndex = props.userInfo.educations.findIndex(
      (item) => item.id == draggingId,
    );
    const targetIndex = props.userInfo.educations.findIndex(
      (item) => item.id == targetId,
    );

    const copy = new UserInfoModel(props.userInfo);
    [copy.educations[draggedIndex], copy.educations[targetIndex]] = [
      copy.educations[targetIndex],
      copy.educations[draggedIndex],
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
      {props.userInfo.educations.map((education, educationIndex) => {
        return (
          <div
            className={`${draggingId === education.id ? styles.dragging : ""} ${styles.draggable}`}
            id={education.id}
            key={education.id}
            draggable
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => onDragEnter(event)}
            onDragStart={() => setDraggingId(education.id)}
            onDragEnd={() => setDraggingId(-1)}
          >
            <EducationForm
              education={education}
              educationIndex={educationIndex}
              setUserInfo={props.setUserInfo}
            ></EducationForm>
          </div>
        );
      })}

      <div
        className={`${styles.addNewEducation} primaryGrayAddInput`}
        style={
          props.userInfo.educations.length != 0 ? { marginTop: "20px" } : {}
        }
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.educations.push(new EducationModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new education</p>
      </div>
    </section>
  );
}
