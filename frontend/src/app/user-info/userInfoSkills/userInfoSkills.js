import styles from "./userInfoSkills.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";
import SkillModel from "../../../../models/SkillModel";
import SkillForm from "../skillForm/skillForm";
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
      <SkillForm
        skill={section}
        skillIndex={index}
        setUserInfo={setUserInfo}
      ></SkillForm>
    </div>
  );
}

export default function UserInfoSkills(props) {
  return (
    <section className={styles.container}>
      <DragDropProvider
        onDragOver={(event) => {
          const copy = new UserInfoModel(props.userInfo);
          copy.skills = move(copy.skills, event);
          props.setUserInfo(copy);
        }}
      >
        {props.userInfo.skills.map((skill, skillIndex) => {
          return (
            <DraggableSection
              section={skill}
              index={skillIndex}
              key={skill.id}
              userInfo={props.userInfo}
              setUserInfo={props.setUserInfo}
            ></DraggableSection>
          );
        })}
      </DragDropProvider>

      <div
        className={`${styles.addNewSkill} primaryGrayAddInput`}
        style={props.userInfo.skills.length != 0 ? { marginTop: "20px" } : {}}
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.skills.push(new SkillModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new skill</p>
      </div>
    </section>
  );
}
