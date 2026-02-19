import styles from "./educationForm.module.css";

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
import EducationBulletPointModel from "../../../../models/EducationBulletPointModel";

export default function EducationForm(props) {
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
              <label>School</label>
              <input
                type="text"
                placeholder="Ohio State University"
                value={props.education.school}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.educations[props.educationIndex].school =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
            <div className="primaryEmeraldInput">
              <label>Degree</label>
              <input
                type="text"
                placeholder="B.S. in Computer Science"
                value={props.education.degree}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.educations[props.educationIndex].degree =
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
                value={props.education.startDate}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.educations[props.educationIndex].startDate =
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
                value={props.education.endDate}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.educations[props.educationIndex].endDate =
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
                placeholder="Columbus, OH"
                value={props.education.location}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.educations[props.educationIndex].location =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
          </div>
          <div className={styles.fourthRow}>
            <div className="primaryEmeraldInput">
              <label>Additional Details</label>
              {props.education.description.map((detail, detailIndex) => {
                return (
                  <div
                    className={`${styles.detail} primaryEmeraldInput`}
                    key={detail.id}
                  >
                    <input
                      type="text"
                      placeholder="4.0 GPA"
                      value={detail.point}
                      onChange={(event) => {
                        props.setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.educations[props.educationIndex].description[
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
                          copy.educations[
                            props.educationIndex
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
                    copy.educations[props.educationIndex].description.push(
                      new EducationBulletPointModel(),
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
            {props.education.school
              ? props.education.school
              : "No school listed"}
          </p>
          <p>
            {props.education.degree
              ? props.education.degree
              : "No degree listed"}
          </p>
        </section>
      )}

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
              copy.educations.splice(props.educationIndex, 1);
              return copy;
            });
          }}
        ></TrashIcon>
      </div>
    </section>
  );
}
