import styles from "./userInfoEducation.module.css";

import UserInfoModel from "../../../models/UserInfoModel";
import EducationModel from "../../../models/EducationModel";
import EducationForm from "../educationForm/educationForm";
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
      <EducationForm
        education={section}
        educationIndex={index}
        setUserInfo={setUserInfo}
      ></EducationForm>
    </div>
  );
}

export default function UserInfoEducation({ userInfo, setUserInfo }) {
  return (
    <section className={styles.container}>
      <DragDropProvider
        onDragOver={(event) => {
          const copy = new UserInfoModel(userInfo);
          copy.educations = move(copy.educations, event);
          setUserInfo(copy);
        }}
      >
        {userInfo.educations.map((education, educationIndex) => {
          return (
            <DraggableSection
              section={education}
              index={educationIndex}
              key={education.id}
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
            copy.educations.push(new EducationModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new education</p>
      </div>
    </section>
  );
}
