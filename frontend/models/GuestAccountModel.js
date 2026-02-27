import UserAccountModel from "./UserAccountModel";
import { v4 as uuid } from "uuid";

export default class GuestAccountModel {
  id = uuid();
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
