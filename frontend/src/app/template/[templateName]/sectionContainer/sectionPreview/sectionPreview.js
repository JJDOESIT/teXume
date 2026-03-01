"use client";

import styles from "./sectionPreview.module.css";

import UserInfoModel from "../../../../../../models/UserInfoModel";
import {
  Bars2Icon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { hideSection, unhideSection } from "../../../../../../api/template";

export default function SectionPreview(props) {
  const [isPreview, setIsPreview] = useState(true);
  const [sectionName, setSectionName] = useState(props.sectionName);
  const [isEditing, setIsEditing] = useState(false);

  // Toggle preview when visibility is false
  useEffect(() => {
    if (!props.visible) {
      setIsPreview(true);
    }
  }, [props.visible]);

  // Hide section
  async function hide() {
    await hideSection(props.sectionName, props.session);
    props.setUserInfo(new UserInfoModel(props.userInfo));
  }

  // Unhide section
  async function unhide() {
    await unhideSection(props.sectionName, props.session);
    props.setUserInfo(new UserInfoModel(props.userInfo));
  }

  return (
    <section
      className={`${styles.container} ${isPreview ? styles.preview : ""}`}
      style={!props.visible ? { opacity: 0.5 } : {}}
    >
      <div
        className={styles.header}
        style={!isPreview ? { marginBottom: "10px" } : {}}
      >
        <div className={styles.draggableIcon}>
          <Bars2Icon></Bars2Icon>
        </div>

        <section className={styles.previewContainer}>
          <div className={styles.icon}>{props.icon}</div>
          <div className={`${styles.sectionName} primaryEmeraldInput`}>
            <input
              style={
                !isEditing ? { border: "none", pointerEvents: "none" } : {}
              }
              type="text"
              value={sectionName}
              onChange={(event) => {
                setSectionName(event.target.value);
              }}
            ></input>
          </div>
          {!isEditing ? (
            <div
              className={styles.editIcon}
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            >
              <PencilIcon></PencilIcon>
            </div>
          ) : (
            <div
              className={styles.saveIcon}
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            >
              <CheckIcon></CheckIcon>
            </div>
          )}
        </section>

        <div className={styles.rightIcons}>
          <div
            style={!props.visible ? { pointerEvents: "none" } : {}}
            className={styles.chevronIcon}
            onClick={() => {
              if (props.visible) {
                setIsPreview((prev) => !prev);
              }
            }}
          >
            {isPreview ? (
              <ChevronDownIcon></ChevronDownIcon>
            ) : (
              <ChevronUpIcon></ChevronUpIcon>
            )}
          </div>
          {props.sectionName != "Details" && (
            <div
              className={styles.eyeIcon}
              onClick={() => {
                props.setVisibility((prev) => {
                  if (prev[props.sectionName]) {
                    hide();
                  } else {
                    unhide();
                  }
                  return {
                    ...prev,
                    [props.sectionName]: !prev[props.sectionName],
                  };
                });
              }}
            >
              {props.visible ? (
                <EyeIcon></EyeIcon>
              ) : (
                <EyeSlashIcon></EyeSlashIcon>
              )}
            </div>
          )}
        </div>
      </div>
      {!isPreview && props.section}
    </section>
  );
}
