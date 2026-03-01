import styles from "./userInfoAchievements.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";
import AchievementModel from "../../../../models/AchievementModel";
import AchievementForm from "../achievementForm/achievementForm";
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
      <AchievementForm
        achievement={section}
        achievementIndex={index}
        setUserInfo={setUserInfo}
      ></AchievementForm>
    </div>
  );
}

export default function UserInfoAchievements(props) {
  return (
    <section className={styles.container}>
      <DragDropProvider
        onDragOver={(event) => {
          const copy = new UserInfoModel(props.userInfo);
          copy.achievements = move(copy.achievements, event);
          props.setUserInfo(copy);
        }}
      >
        {props.userInfo.achievements.map((achievement, achievementIndex) => {
          return (
            <DraggableSection
              section={achievement}
              index={achievementIndex}
              key={achievement.id}
              userInfo={props.userInfo}
              setUserInfo={props.setUserInfo}
            ></DraggableSection>
          );
        })}
      </DragDropProvider>

      <div
        className={`${styles.addNewAchievement} primaryGrayAddInput`}
        style={
          props.userInfo.achievements.length != 0 ? { marginTop: "20px" } : {}
        }
        onClick={() => {
          props.setUserInfo((prev) => {
            const copy = new UserInfoModel(prev);
            copy.achievements.push(new AchievementModel());
            return copy;
          });
        }}
      >
        <PlusIcon></PlusIcon>
        <p>Add new achievement</p>
      </div>
    </section>
  );
}
