import styles from "./userInfoAchievements.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";
import AchievementModel from "../../../../models/AchievementModel";
import AchievementForm from "../achievementForm/achievementForm";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function UserInfoAchievements(props) {
  const containerRef = useRef(null);
  const timeSinceScroll = useRef(0);
  const [draggingId, setDraggingId] = useState(-1);

  // Swap the items
  function onDragEnter(event) {
    const targetId = event.currentTarget.id;

    if (draggingId == targetId) {
      return;
    }

    const draggedIndex = props.userInfo.achievements.findIndex(
      (item) => item.id == draggingId,
    );
    const targetIndex = props.userInfo.achievements.findIndex(
      (item) => item.id == targetId,
    );

    const copy = new UserInfoModel(props.userInfo);
    [copy.achievements[draggedIndex], copy.achievements[targetIndex]] = [
      copy.achievements[targetIndex],
      copy.achievements[draggedIndex],
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
      {props.userInfo.achievements.map((achievement, achievementIndex) => {
        return (
          <div
            className={`${draggingId === achievement.id ? styles.dragging : ""} ${styles.draggable}`}
            id={achievement.id}
            key={achievement.id}
            draggable
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => onDragEnter(event)}
            onDragStart={() => setDraggingId(achievement.id)}
            onDragEnd={() => setDraggingId(-1)}
          >
            <AchievementForm
              achievement={achievement}
              achievementIndex={achievementIndex}
              setUserInfo={props.setUserInfo}
            ></AchievementForm>
          </div>
        );
      })}

      <div
        className={`${styles.addNewAchievement} primaryGrayAddInput`}
        style={
          props.userInfo.achievements.length != 0 ? { marginTop: "20px" } : {}
        }
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.achievements.push(new AchievementModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new achievement</p>
      </div>
    </section>
  );
}
