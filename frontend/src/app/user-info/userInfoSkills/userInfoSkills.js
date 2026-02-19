import styles from "./userInfoSkills.module.css";

import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import UserInfoModel from "../../../../models/UserInfoModel";
import SkillModel from "../../../../models/SkillModel";
import SkillForm from "../skillForm/skillForm";

export default function UserInfoSkills(props) {
  const containerRef = useRef(null);
  const timeSinceScroll = useRef(0);
  const [draggingId, setDraggingId] = useState(-1);

  // Swap the items
  function onDragEnter(event) {
    const targetId = event.currentTarget.id;

    if (draggingId == targetId) {
      return;
    }

    const draggedIndex = props.userInfo.skills.findIndex(
      (item) => item.id == draggingId,
    );
    const targetIndex = props.userInfo.skills.findIndex(
      (item) => item.id == targetId,
    );

    const copy = new UserInfoModel(props.userInfo);
    [copy.skills[draggedIndex], copy.skills[targetIndex]] = [
      copy.skills[targetIndex],
      copy.skills[draggedIndex],
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
      {props.userInfo.skills.map((skill, skillIndex) => {
        return (
          <div
            className={`${draggingId === skill.id ? styles.dragging : ""} ${styles.draggable}`}
            id={skill.id}
            key={skill.id}
            draggable
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => onDragEnter(event)}
            onDragStart={() => setDraggingId(skill.id)}
            onDragEnd={() => setDraggingId(-1)}
          >
            <SkillForm
              skill={skill}
              skillIndex={skillIndex}
              setUserInfo={props.setUserInfo}
            ></SkillForm>
          </div>
        );
      })}

      <div
        className={`${styles.addNewSkill} primaryGrayAddInput`}
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.skills.push(new SkillModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new skill</p>
      </div>
    </section>
  );
}
