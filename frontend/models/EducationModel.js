import EducationBulletPointModel from "./EducationBulletPointModel";
import { v4 as uuid } from "uuid";

export default class EducationModel {
  id = uuid();
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
