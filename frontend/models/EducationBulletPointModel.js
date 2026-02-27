import { v4 as uuid } from "uuid";

export default class EducationBulletPointModel {
  id = uuid();
  point = "";

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.point = data.point;
    }
  }
}
