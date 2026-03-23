"use client";

import styles from "./sectionPreview.module.css";

import UserInfoModel from "../../../../../../../models/UserInfoModel";
import {
  Bars2Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  hideSection,
  unhideSection,
  updateSectionName,
} from "../../../../../../../api/template";

export default function SectionPreview({
  visible,
  setVisibility,
  section,
  icon,
  sectionName,
  session,
  userInfo,
  setUserInfo,
}) {
  const [isPreview, setIsPreview] = useState(true);
  const [newSectionName, setNewSectionName] = useState(sectionName);
  const [isEditing, setIsEditing] = useState(false);

  // Toggle preview when visibility is false
  useEffect(() => {
    if (!visible) {
      setIsPreview(true);
      setIsEditing(false);
    }
  }, [visible]);

  // Hide section
  async function hide() {
    await hideSection(sectionName, session);
    setUserInfo(new UserInfoModel(userInfo));
  }

  // Unhide section
  async function unhide() {
    await unhideSection(sectionName, session);
    setUserInfo(new UserInfoModel(userInfo));
  }

  // Update section name
  async function updateSection() {
    await updateSectionName(sectionName, newSectionName, session);
    setUserInfo(new UserInfoModel(userInfo));
  }

  return (
    <div
      className={`${styles.container} ${isPreview ? styles.preview : ""}`}
      style={!visible ? { opacity: 0.5 } : {}}
    >
      <div
        className={styles.header}
        style={!isPreview ? { marginBottom: "10px" } : {}}
      >
        <div className={styles.draggableIcon}>
          <Bars2Icon></Bars2Icon>
        </div>

        <section className={styles.previewContainer}>
          <div className={styles.icon}>{icon}</div>
          <div className={`${styles.sectionName} primaryEmeraldInput`}>
            <input
              style={
                !isEditing ? { border: "none", pointerEvents: "none" } : {}
              }
              type="text"
              value={newSectionName}
              onChange={(event) => {
                setNewSectionName(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  updateSection();
                  setIsEditing(false);
                  event.target.blur();
                }
              }}
            ></input>
          </div>

          {newSectionName != "Details" &&
            (!isEditing ? (
              <div
                className={styles.editIcon}
                style={!visible ? { pointerEvents: "none" } : {}}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <PencilIcon></PencilIcon>
              </div>
            ) : (
              <div
                className={styles.saveIcon}
                onClick={() => {
                  updateSection();
                  setIsEditing(false);
                }}
              >
                <CheckIcon></CheckIcon>
              </div>
            ))}
        </section>

        <div className={styles.rightIcons}>
          <div
            style={!visible ? { pointerEvents: "none" } : {}}
            className={styles.chevronIcon}
            onClick={() => {
              if (visible) {
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
          {newSectionName != "Details" && (
            <div
              className={styles.eyeIcon}
              onClick={() => {
                setVisibility((prev) => {
                  if (prev[newSectionName]) {
                    hide();
                  } else {
                    unhide();
                  }
                  return {
                    ...prev,
                    [newSectionName]: !prev[newSectionName],
                  };
                });
              }}
            >
              {visible ? <EyeIcon></EyeIcon> : <EyeSlashIcon></EyeSlashIcon>}
            </div>
          )}
        </div>
      </div>
      {!isPreview && section}
    </div>
  );
}
