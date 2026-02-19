import SkillBulletPointModel from "./SkillBulletPointModel";

export default class SkillModel {
  id = Date.now();
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
