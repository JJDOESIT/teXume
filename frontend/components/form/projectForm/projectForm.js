import styles from "./projectForm.module.css";

import UserInfoModel from "../../../models/UserInfoModel";
import ProjectBulletPointModel from "../../../models/ProjectBulletPointModel";
import { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  Bars2Icon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

export default function ProjectForm({ project, projectIndex, setUserInfo }) {
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
                value={project.title}
                onChange={(event) => {
                  setUserInfo((prev) => {
                    const copy = new UserInfoModel(prev);
                    copy.projects[projectIndex].title = event.target.value;
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
                  value={project.date}
                  onChange={(event) => {
                    setUserInfo((prev) => {
                      const copy = new UserInfoModel(prev);
                      copy.projects[projectIndex].date = event.target.value;
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
              {project.description.map((detail, detailIndex) => {
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
                        setUserInfo((prev) => {
                          const copy = new UserInfoModel(prev);
                          copy.projects[projectIndex].description[
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
                          copy.projects[projectIndex].description.splice(
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
                    copy.projects[projectIndex].description.push(
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
          <p>{project.title ? project.title : "No title listed"}</p>
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
              copy.projects.splice(projectIndex, 1);
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
