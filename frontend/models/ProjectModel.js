import ProjectBulletPointModel from "./ProjectBulletPointModel";

export default class ProjectModel {
  id = Date.now();
  title = "";
  date;
  description = new Array();

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.title = data.title;
      this.date = data.date;
      this.description = data.description.map((item) => {
        return new ProjectBulletPointModel(item);
      });
    }
  }
}
