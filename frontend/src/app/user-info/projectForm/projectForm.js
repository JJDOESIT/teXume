import styles from "./projectForm.module.css";

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
import ProjectBulletPointModel from "../../../../models/ProjectBulletPointModel";

export default function ProjectForm(props) {
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
                placeholder="Spritesheet Lab"
                value={props.project.title}
                onChange={(event) => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.projects[props.projectIndex].title =
                      event.target.value;
                    return copy;
                  });
                }}
              ></input>
            </div>
            <div className="primaryEmeraldInput">
              <div className="primaryEmeraldInput">
                <label>Date</label>
                <input
                  type="date"
                  value={props.project.date}
                  onChange={(event) => {
                    props.setUserInfo((prev) => {
                      const copy = new UserInfoModel(prev);
                      copy.projects[props.projectIndex].date =
                        event.target.value;
                      return copy;
                    });
                  }}
                ></input>
              </div>
            </div>
          </div>

          <div className={styles.secondRow}>
            <div className="primaryEmeraldInput">
              <label>Details</label>
              {props.project.description.map((detail, detailIndex) => {
                return (
                  <div
                    className={`${styles.detail} primaryEmeraldInput`}
                    key={detail.id}
                  >
                    <input
                      type="text"
                      placeholder="Built a free website for sprites and assets"
                      value={detail.point}
                      onChange={(event) => {
                        props.setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.projects[props.projectIndex].description[
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
                          copy.projects[props.projectIndex].description.splice(
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
                className={`${styles.addNewDetail} primaryGrayAddInput`}
                onClick={() => {
                  props.setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.projects[props.projectIndex].description.push(
                      new ProjectBulletPointModel(),
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
          <p>{props.project.title ? props.project.title : "No title listed"}</p>
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
            props.setUserInfo((prev) => {
              const copy = new UserInfoModel(prev);
              copy.projects.splice(props.projectIndex, 1);
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
