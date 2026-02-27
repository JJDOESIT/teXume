import SkillBulletPointModel from "./SkillBulletPointModel";
import { v4 as uuid } from "uuid";

export default class SkillModel {
  id = uuid();
  category = "";
  description = new Array();

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.category = data.category;
      this.description = data.description.map((item) => {
        return new SkillBulletPointModel(item);
      });
    }
  }
}
