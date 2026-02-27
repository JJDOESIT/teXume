import styles from "./experienceForm.module.css";

import {
  PlusIcon,
  XMarkIcon,
  Bars2Icon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import UserInfoModel from "../../../../models/UserInfoModel";
import ExperienceBulletPointModel from "../../../../models/ExperienceBulletPointModel";

export default function ExperienceForm(props) {
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
                value={props.experience.title}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[props.experienceIndex].title =
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
                value={props.experience.company}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[props.experienceIndex].company =
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
                value={props.experience.startDate}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[props.experienceIndex].startDate =
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
                value={props.experience.endDate}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[props.experienceIndex].endDate =
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
                value={props.experience.location}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[props.experienceIndex].location =
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
              {props.experience.description.map((detail, detailIndex) => {
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
                        props.setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.experiences[props.experienceIndex].description[
                            detailIndex
                          ].point = event.target.value;
                          return copy;
                        });
                      }}
                    ></input>
                    <XMarkIcon
                      className={styles.xMarkIcon}
                      onClick={() => {
                        props.setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.experiences[
                            props.experienceIndex
                          ].description.splice(detailIndex, 1);
                          return copy;
                        });
                      }}
                    ></XMarkIcon>
                  </div>
                );
              })}
              <div
                className={`${styles.addNewDetail} primaryGrayAddInput`}
                onClick={() => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.experiences[props.experienceIndex].description.push(
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
          <p>
            {props.experience.title
              ? props.experience.title
              : "No title listed"}
          </p>
          <p>
            {props.experience.company
              ? props.experience.company
              : "No company listed"}
          </p>
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
        <div className={styles.trashIcon}>
          <TrashIcon
            onClick={() => {
              props.setUserInfo((prev) => {
                const copy = new UserInfoModel(prev);
                copy.experiences.splice(props.experienceIndex, 1);
                return copy;
              });
            }}
          ></TrashIcon>
        </div>
      </div>
    </section>
  );
}
