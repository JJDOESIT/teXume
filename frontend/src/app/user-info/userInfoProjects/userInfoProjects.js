import styles from "./userInfoProjects.module.css";

import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import UserInfoModel from "../../../../models/UserInfoModel";
import ProjectModel from "../../../../models/ProjectModel";
import ProjectForm from "../projectForm/projectForm";

export default function UserInfoProjects(props) {
  const containerRef = useRef(null);
  const timeSinceScroll = useRef(0);
  const [draggingId, setDraggingId] = useState(-1);

  // Swap the items
  function onDragEnter(event) {
    const targetId = event.currentTarget.id;

    if (draggingId == targetId) {
      return;
    }

    const draggedIndex = props.userInfo.projects.findIndex(
      (item) => item.id == draggingId,
    );
    const targetIndex = props.userInfo.projects.findIndex(
      (item) => item.id == targetId,
    );

    const copy = new UserInfoModel(props.userInfo);
    [copy.projects[draggedIndex], copy.projects[targetIndex]] = [
      copy.projects[targetIndex],
      copy.projects[draggedIndex],
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
      {props.userInfo.projects.map((project, projectIndex) => {
        return (
          <div
            className={`${draggingId === project.id ? styles.dragging : ""} ${styles.draggable}`}
            id={project.id}
            key={project.id}
            draggable
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => onDragEnter(event)}
            onDragStart={() => setDraggingId(project.id)}
            onDragEnd={() => setDraggingId(-1)}
          >
            <ProjectForm
              project={project}
              projectIndex={projectIndex}
              setUserInfo={props.setUserInfo}
            ></ProjectForm>
          </div>
        );
      })}

      <div
        className={`${styles.addNewProject} primaryGrayAddInput`}
        style={props.userInfo.projects.length != 0 ? { marginTop: "20px" } : {}}
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.projects.push(new ProjectModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new project</p>
      </div>
    </section>
  );
}
