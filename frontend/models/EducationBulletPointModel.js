export default class EducationBulletPointModel {
  id = Date.now();
  point = "";

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.point = data.point;
    }
  }
}
