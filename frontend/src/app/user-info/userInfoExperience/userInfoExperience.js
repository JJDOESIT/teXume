import styles from "./userInfoExperience.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";
import ExperienceModel from "../../../../models/ExperienceModel";
import ExperienceForm from "../experienceForm/experienceForm";
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
      <ExperienceForm
        experience={section}
        experienceIndex={index}
        setUserInfo={setUserInfo}
      ></ExperienceForm>
    </div>
  );
}

export default function UserInfoExperience(props) {
  return (
    <section className={styles.container}>
      <DragDropProvider
        onDragOver={(event) => {
          const copy = new UserInfoModel(props.userInfo);
          copy.experiences = move(copy.experiences, event);
          props.setUserInfo(copy);
        }}
      >
        {props.userInfo.experiences.map((experience, experienceIndex) => {
          return (
            <DraggableSection
              section={experience}
              index={experienceIndex}
              key={experience.id}
              userInfo={props.userInfo}
              setUserInfo={props.setUserInfo}
            ></DraggableSection>
          );
        })}
      </DragDropProvider>

      <div
        className={`${styles.addNewExperience} primaryGrayAddInput`}
        style={
          props.userInfo.experiences.length != 0 ? { marginTop: "20px" } : {}
        }
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.experiences.push(new ExperienceModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new experience</p>
      </div>
    </section>
  );
}
