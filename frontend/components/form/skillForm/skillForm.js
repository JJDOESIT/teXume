import styles from "./skillForm.module.css";

import UserInfoModel from "../../../models/UserInfoModel";
import SkillBulletPointModel from "../../../models/SkillBulletPointModel";
import { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  Bars2Icon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

export default function SkillForm({ skill, skillIndex, setUserInfo }) {
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
              <label>Category</label>
              <input
                type="text"
                placeholder="Frameworks"
                value={skill.category}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.skills[skillIndex].category = event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
          </div>

          <div className={styles.secondRow}>
            <div className="primaryEmeraldInput">
              <label>Details</label>
              {skill.description.map((detail, detailIndex) => {
                return (
                  <div
                    className={`${styles.detail} primaryEmeraldInput`}
                    key={detail.id}
                  >
                    <input
                      type="text"
                      placeholder="Python"
                      value={detail.point}
                      onChange={(event) => {
                        setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.skills[skillIndex].description[
                            detailIndex
                          ].point = event.target.value;
                          return copy;
                        });
                      }}
                    ></input>
                    <XMarkIcon
                      className={styles.xMarkIcon}
                      onClick={() => {
                        setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.skills[skillIndex].description.splice(
                            detailIndex,
                            1,
                          );
                          return copy;
                        });
                      }}
                    ></XMarkIcon>
                  </div>
                );
              })}
              <div
                className={`${styles.addNewSkill} secondaryGrayButton`}
                onClick={() => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.skills[skillIndex].description.push(
                      new SkillBulletPointModel(),
                    );
                    return copy;
                  });
                }}
              >
                <PlusIcon></PlusIcon>
                <p>Add new skill</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.previewContainer}>
          <p>{skill.category ? skill.category : "No skills listed"}</p>
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
              copy.skills.splice(skillIndex, 1);
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
