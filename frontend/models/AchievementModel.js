export default class AchievementModel {
  id = Date.now();
  title = "";
  description = "";
  date;

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.date = data.date;
    }
  }
}
