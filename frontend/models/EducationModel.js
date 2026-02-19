import EducationBulletPointModel from "./EducationBulletPointModel";

export default class EducationModel {
  id = Date.now();
  school = "";
  degree = "";
  location = "";
  startDate;
  endDate;
  description = new Array();

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.school = data.school;
      this.degree = data.degree;
      this.location = data.location;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.description = data.description.map((item) => {
        return new EducationBulletPointModel(item);
      });
    }
  }
}
