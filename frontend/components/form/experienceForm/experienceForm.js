import styles from "./experienceForm.module.css";

import UserInfoModel from "../../../models/UserInfoModel";
import ExperienceBulletPointModel from "../../../models/ExperienceBulletPointModel";
import { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  Bars2Icon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

export default function ExperienceForm({
  experience,
  experienceIndex,
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
              <label>Title</label>
              <input
                type="text"
                placeholder="Software Engineer"
                value={experience.title}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[experienceIndex].title =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
            <div className="primaryEmeraldInput">
              <label>Company</label>
              <input
                type="text"
                placeholder="Microsoft"
                value={experience.company}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[experienceIndex].company =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
          </div>

          <div className={styles.secondRow}>
            <div className="primaryEmeraldInput">
              <label>Start Date</label>
              <input
                type="date"
                value={experience.startDate}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[experienceIndex].startDate =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
            <div className="primaryEmeraldInput">
              <label>End Date</label>
              <input
                type="date"
                value={experience.endDate}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[experienceIndex].endDate =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
          </div>

          <div className={styles.thirdRow}>
            <div className="primaryEmeraldInput">
              <label>Location</label>
              <input
                type="text"
                placeholder="McLean, VA"
                value={experience.location}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[experienceIndex].location =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
          </div>

          <div className={styles.fourthRow}>
            <div className="primaryEmeraldInput">
              <label>Responsibilities</label>
              {experience.description.map((detail, detailIndex) => {
                return (
                  <div
                    className={`${styles.detail} primaryEmeraldInput`}
                    key={detail.id}
                  >
                    <input
                      type="text"
                      placeholder="Worked in an agile environment developing software"
                      value={detail.point}
                      onChange={(event) => {
                        setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.experiences[experienceIndex].description[
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
                          copy.experiences[experienceIndex].description.splice(
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
                className={`${styles.addNewDetail} secondaryGrayButton`}
                onClick={() => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[experienceIndex].description.push(
                      new ExperienceBulletPointModel(),
                    );
                    return copy;
                  });
                }}
              >
                <PlusIcon></PlusIcon>
                <p>Add new Detail</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.previewContainer}>
          <p>{experience.title ? experience.title : "No title listed"}</p>
          <p>{experience.company ? experience.company : "No company listed"}</p>
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
              copy.experiences.splice(experienceIndex, 1);
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
