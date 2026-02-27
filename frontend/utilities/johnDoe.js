import AchievementModel from "../models/AchievementModel";

const {
  default: EducationBulletPointModel,
} = require("../models/EducationBulletPointModel");
const { default: EducationModel } = require("../models/EducationModel");
const {
  default: ExperienceBulletPointModel,
} = require("../models/ExperienceBulletPointModel");
const { default: ExperienceModel } = require("../models/ExperienceModel");
const {
  default: ProjectBulletPointModel,
} = require("../models/ProjectBulletPointModel");
const { default: ProjectModel } = require("../models/ProjectModel");
const {
  default: SkillBulletPointModel,
} = require("../models/SkillBulletPointModel");
const { default: SkillModel } = require("../models/SkillModel");
const { default: UserInfoModel } = require("../models/UserInfoModel");

export default function createJohnDoe() {
  const userInfoModel = new UserInfoModel();

  userInfoModel.firstName = "John";
  userInfoModel.lastName = "Doe";
  userInfoModel.email = "johndoe@gmail.com";
  userInfoModel.phone = "(123) 456-7890";

  userInfoModel.educations.push(new EducationModel());
  userInfoModel.educations[0].school = "Harvard University";
  userInfoModel.educations[0].location = "Boston, MA";
  userInfoModel.educations[0].degree = "B.S. in Computer Science";
  userInfoModel.educations[0].startDate = "2022-08-01";
  userInfoModel.educations[0].endDate = "2022-05-01";

  userInfoModel.educations[0].description.push(new EducationBulletPointModel());
  userInfoModel.educations[0].description[0].point = "Honors college | 4.0 GPA";

  userInfoModel.experiences.push(new ExperienceModel());
  userInfoModel.experiences[0].title = "Software Engineer";
  userInfoModel.experiences[0].company = "Microsoft";
  userInfoModel.experiences[0].location = "Reston, VA";
  userInfoModel.experiences[0].startDate = "2022-05-01";
  userInfoModel.experiences[0].endDate = null;

  userInfoModel.experiences[0].description.push(
    new ExperienceBulletPointModel(),
  );
  userInfoModel.experiences[0].description[0].point =
    "Improved application performance and reliability by optimizing database queries, refactoring legacy code, and introducing automated testing";

  userInfoModel.experiences[0].description.push(
    new ExperienceBulletPointModel(),
  );
  userInfoModel.experiences[0].description[1].point =
    "Worked cross-functionally with product and design teams to translate requirements into robust, maintainable software solutions";

  userInfoModel.experiences[0].description.push(
    new ExperienceBulletPointModel(),
  );
  userInfoModel.experiences[0].description[2].point =
    "Designed, developed, and maintained scalable backend services and APIs to support high-traffic applications";

  userInfoModel.experiences.push(new ExperienceModel());
  userInfoModel.experiences[1].title = "Software Engineer Intern";
  userInfoModel.experiences[1].company = "MetLife";
  userInfoModel.experiences[1].location = "Cary, NC";
  userInfoModel.experiences[1].startDate = "2021-05-01";
  userInfoModel.experiences[1].endDate = "2021-08-01";

  userInfoModel.experiences[1].description.push(
    new ExperienceBulletPointModel(),
  );
  userInfoModel.experiences[1].description[0].point =
    "Gained hands-on experience with version control, code reviews, and agile development workflows in a production environment";

  userInfoModel.experiences[1].description.push(
    new ExperienceBulletPointModel(),
  );
  userInfoModel.experiences[1].description[1].point =
    "Collaborated with a small engineering team to design and implement new features using modern JavaScript frameworks and REST APIs";

  userInfoModel.experiences[1].description.push(
    new ExperienceBulletPointModel(),
  );
  userInfoModel.experiences[1].description[2].point =
    "Assisted in debugging and improving existing code by writing unit tests and fixing performance and reliability issues";

  userInfoModel.projects.push(new ProjectModel());
  userInfoModel.projects[0].title = "2D Physics Engine";
  userInfoModel.projects[0].date = "2024-02-01";

  userInfoModel.projects[0].description.push(new ProjectBulletPointModel());
  userInfoModel.projects[0].description[0].point =
    "Designed a 2D physics engine supporting both rigid and soft bodies with customizable properties";

  userInfoModel.projects[0].description.push(new ProjectBulletPointModel());
  userInfoModel.projects[0].description[1].point =
    "Implemented precise collision detection using the Separating Axis Theorem and optimized performance using spatial partitioning with quadtrees";

  userInfoModel.skills.push(new SkillModel());
  userInfoModel.skills[0].category = "Languages";

  userInfoModel.skills[0].description.push(new SkillBulletPointModel());
  userInfoModel.skills[0].description[0].point = "C#";

  userInfoModel.skills[0].description.push(new SkillBulletPointModel());
  userInfoModel.skills[0].description[1].point = "Python";

  userInfoModel.skills[0].description.push(new SkillBulletPointModel());
  userInfoModel.skills[0].description[2].point = "Java";

  userInfoModel.skills[0].description.push(new SkillBulletPointModel());
  userInfoModel.skills[0].description[3].point = "C++";

  userInfoModel.skills[0].description.push(new SkillBulletPointModel());
  userInfoModel.skills[0].description[4].point = "JavaScript";

  userInfoModel.skills[0].description.push(new SkillBulletPointModel());
  userInfoModel.skills[0].description[5].point = "HTML/CSS";

  userInfoModel.skills[0].description.push(new SkillBulletPointModel());
  userInfoModel.skills[0].description[6].point = "SQL";

  userInfoModel.skills.push(new SkillModel());
  userInfoModel.skills[1].category = "Frameworks & Technologies";

  userInfoModel.skills[1].description.push(new SkillBulletPointModel());
  userInfoModel.skills[1].description[0].point = "Next.js";

  userInfoModel.skills[1].description.push(new SkillBulletPointModel());
  userInfoModel.skills[1].description[1].point = "React";

  userInfoModel.skills[1].description.push(new SkillBulletPointModel());
  userInfoModel.skills[1].description[2].point = "Blazor";

  userInfoModel.skills[1].description.push(new SkillBulletPointModel());
  userInfoModel.skills[1].description[3].point = ".NET";

  userInfoModel.skills[1].description.push(new SkillBulletPointModel());
  userInfoModel.skills[1].description[4].point = "MongoDB";

  userInfoModel.skills[1].description.push(new SkillBulletPointModel());
  userInfoModel.skills[1].description[5].point = "Git";

  userInfoModel.achievements.push(new AchievementModel());
  userInfoModel.achievements[0].title = "Hackathon Winner";
  userInfoModel.achievements[0].date = "2022-03-01";
  userInfoModel.achievements[0].description =
    "Built a collaborative full-stack application designed to support teacher workflows";

  return userInfoModel;
}
