export default class ProjectBulletPointModel {
  id = Date.now();
  point = "";

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.point = data.point;
    }
  }
}
