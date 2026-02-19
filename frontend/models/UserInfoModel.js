import AchievementModel from "./AchievementModel";
import EducationModel from "./EducationModel";
import ExperienceModel from "./ExperienceModel";
import ProjectModel from "./ProjectModel";
import SkillModel from "./SkillModel";

export default class UserInfoModel {
  id = Date.now();
  firstName = "";
  lastName = "";
  email = "";
  phone = "";
  educations = new Array();
  experiences = new Array();
  projects = new Array();
  skills = new Array();
  achievements = new Array();

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phone = data.phone;
      this.educations = data.educations.map((item) => {
        return new EducationModel(item);
      });
      this.experiences = data.experiences.map((item) => {
        return new ExperienceModel(item);
      });
      this.projects = data.projects.map((item) => {
        return new ProjectModel(item);
      });
      this.skills = data.skills.map((item) => {
        return new SkillModel(item);
      });
      this.achievements = data.achievements.map((item) => {
        return new AchievementModel(item);
      });
    }
  }
}
