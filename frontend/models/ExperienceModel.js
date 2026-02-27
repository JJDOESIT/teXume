import ExperienceBulletPointModel from "./ExperienceBulletPointModel";
import { v4 as uuid } from "uuid";

export default class ExperienceModel {
  id = uuid();
  title = "";
  startDate;
  endDate;
  company = "";
  location = "";
  description = new Array();

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.title = data.title;
      this.startDate = data.startDate;
      this.endDate = data.endDate;
      this.company = data.company;
      this.location = data.location;
      this.description = data.description.map((item) => {
        return new ExperienceBulletPointModel(item);
      });
    }
  }
}
