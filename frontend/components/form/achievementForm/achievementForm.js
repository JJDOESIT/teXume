import styles from "./achievementForm.module.css";

import UserInfoModel from "../../../models/UserInfoModel";
import { useState } from "react";
import {
  Bars2Icon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

export default function AchievementForm({
  achievement,
  achievementIndex,
  setUserInfo,
}) {
  const [isPreview, setIsPreview] = useState(true);

  return (
    <section className={styles.container}>
      <div className={styles.draggableIcon}>
        <Bars2Icon></Bars2Icon>
      </div>

      {!isPreview ? (
        <section className={styles.formContainer}>
          <div className={styles.firstRow}>
            <div className="primaryEmeraldInput">
              <label>Achievement</label>
              <input
                type="text"
                placeholder="Hackathon Winner"
                value={achievement.title}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.achievements[achievementIndex].title =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
            <div className="primaryEmeraldInput">
              <label>Date</label>
              <input
                type="date"
                value={achievement.date}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.achievements[achievementIndex].date =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
          </div>
          <div className={styles.secondRow}>
            <div className="primaryEmeraldInput">
              <label>Description</label>
              <input
                type="text"
                placeholder="Built an interactive study app"
                value={achievement.description}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.achievements[achievementIndex].description =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.previewContainer}>
          <p>{achievement.title ? achievement.title : "No title listed"}</p>
        </section>
      )}

      <div className={styles.rightIcons}>
        <div
          className={styles.chevronIcon}
          onClick={() => setIsPreview((prev) => !prev)}
        >
          {isPreview ? (
            <ChevronDownIcon></ChevronDownIcon>
          ) : (
            <ChevronUpIcon></ChevronUpIcon>
          )}
        </div>
        <div
          className={styles.trashIcon}
          onClick={() => {
            setUserInfo((prev) => {
              const copy = new UserInfoModel(prev);
              copy.achievements.splice(achievementIndex, 1);
              return copy;
            });
          }}
        >
          <TrashIcon></TrashIcon>
        </div>
      </div>
    </section>
  );
}
