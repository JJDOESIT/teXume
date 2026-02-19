import UserAccountModel from "./UserAccountModel";

export default class GuestAccountModel {
  id = Date.now();
  session = "";
  userAccountModel = new UserAccountModel();

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.session = data.session;
      this.userAccountModel = data.userAccountModel;
    }
  }
}
