import styles from "./userInfoIntro.module.css";

import {
  AcademicCapIcon,
  BriefcaseIcon,
  CheckIcon,
  RocketLaunchIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export default function UserInfoIntro() {
  return (
    <div className={styles.container}>
      <div className={styles.introText}>
        <p>Build your resume step-by-step.</p>
        <p>Fill out your information once, and we'll handle the rest.</p>
      </div>

      <div className="lineSpacer"></div>

      <div>
        <div className={styles.info}>
          <div className={styles.infoLogo}>
            <UserIcon></UserIcon>
          </div>
          <div className={styles.infoText}>
            <p>General Info</p>
            <p>Add your name and contact details</p>
          </div>
        </div>

        <div className="lineSpacer"></div>

        <div className={styles.info}>
          <div className={styles.infoLogo}>
            <AcademicCapIcon></AcademicCapIcon>
          </div>
          <div className={styles.infoText}>
            <p>Education</p>
            <p>List your school and coursework</p>
          </div>
        </div>

        <div className="lineSpacer"></div>

        <div className={styles.info}>
          <div className={styles.infoLogo}>
            <BriefcaseIcon></BriefcaseIcon>
          </div>
          <div className={styles.infoText}>
            <p>Experience</p>
            <p>Show your work hisotry</p>
          </div>
        </div>

        <div className="lineSpacer"></div>

        <div className={styles.info}>
          <div className={styles.infoLogo}>
            <RocketLaunchIcon></RocketLaunchIcon>
          </div>
          <div className={styles.infoText}>
            <p>Projects & Skills</p>
            <p>Highlight what makes you stand out</p>
          </div>
        </div>

        <div className="lineSpacer"></div>

        <div className={styles.checkContainer}>
          <div className={styles.checkColumn}>
            <div>
              <div className={styles.check}>
                <CheckIcon></CheckIcon>
                <p>Enter your info only once</p>
              </div>
              <div className={styles.check}>
                <CheckIcon></CheckIcon>
                <p>Use everywhere</p>
              </div>
            </div>
          </div>

          <div className={styles.checkColumn}>
            <div>
              <div className={styles.check}>
                <CheckIcon></CheckIcon>
                <p>Works across all templates</p>
              </div>
              <div className={styles.check}>
                <CheckIcon></CheckIcon>
                <p>Edit anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
