import UserInfoModel from "./UserInfoModel";

export default class UserAccountModel {
  id = Date.now();
  username = "";
  password = "";
  userInfoModel = new UserInfoModel();

  constructor(data) {
    if (data != null) {
      this.id = data.id;
      this.username = data.username;
      this.password = data.password;
      this.userInfoModel = data.userInfoModel;
    }
  }
}
