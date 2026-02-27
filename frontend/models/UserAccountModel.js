import UserInfoModel from "./UserInfoModel";
import { v4 as uuid } from "uuid";

export default class UserAccountModel {
  id = uuid();
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
