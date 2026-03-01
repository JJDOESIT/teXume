import styles from "./userInfoProjects.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";
import ProjectModel from "../../../../models/ProjectModel";
import ProjectForm from "../projectForm/projectForm";
import { PlusIcon } from "@heroicons/react/24/solid";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useSortable } from "@dnd-kit/react/sortable";

function DraggableSection({ section, index, setUserInfo }) {
  const { ref } = useSortable({
    id: section["id"],
    index,
  });

  return (
    <div ref={ref} className="draggable">
      <ProjectForm
        project={section}
        projectIndex={index}
        setUserInfo={setUserInfo}
      ></ProjectForm>
    </div>
  );
}

export default function UserInfoProjects(props) {
  return (
    <section className={styles.container}>
      <DragDropProvider
        onDragOver={(event) => {
          const copy = new UserInfoModel(props.userInfo);
          copy.projects = move(copy.projects, event);
          props.setUserInfo(copy);
        }}
      >
        {props.userInfo.projects.map((project, projectIndex) => {
          return (
            <DraggableSection
              section={project}
              index={projectIndex}
              key={project.id}
              userInfo={props.userInfo}
              setUserInfo={props.setUserInfo}
            ></DraggableSection>
          );
        })}
      </DragDropProvider>

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
