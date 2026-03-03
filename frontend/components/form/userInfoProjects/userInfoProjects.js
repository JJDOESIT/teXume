import styles from "./userInfoProjects.module.css";

import UserInfoModel from "../../../models/UserInfoModel";
import ProjectModel from "../../../models/ProjectModel";
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

export default function UserInfoProjects({ userInfo, setUserInfo }) {
  return (
    <section className={styles.container}>
      <DragDropProvider
        onDragOver={(event) => {
          const copy = new UserInfoModel(userInfo);
          copy.projects = move(copy.projects, event);
          setUserInfo(copy);
        }}
      >
        {userInfo.projects.map((project, projectIndex) => {
          return (
            <DraggableSection
              section={project}
              index={projectIndex}
              key={project.id}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></DraggableSection>
          );
        })}
      </DragDropProvider>

      <div
        className="secondaryGrayButton"
        onClick={() => {
          setUserInfo((prev) => {
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
