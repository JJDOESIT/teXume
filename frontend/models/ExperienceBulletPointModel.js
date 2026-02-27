import { v4 as uuid } from "uuid";

export default class ExperienceBulletPointModel {
  id = uuid();
  point = "";

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.point = data.point;
    }
  }
}
