import styles from "./userInfoSave.module.css";

import {
  getCookie,
  setCookie,
  deleteCookie,
} from "../../../../utilities/cookies";
import { useContext } from "react";
import { navbarAlertContext } from "../../../../components/navbarAlertProvider/navbarAlertProvider";
import { updateUserInfo } from "../../../../api/account";
import { signUpGuest } from "../../../../api/authentication";
import { accountContext } from "../../../../components/accountProvider/accountProvider";

export default function UserInfoSave(props) {
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const { isLoggedIn, checkIfLoggedIn } = useContext(accountContext);

  // Create a guest acccount and populate with user info
  async function createGuestAccount() {
    const response = await signUpGuest(props.userInfo);

    if (!response.ok) {
      showNavbarAlert(
        "error",
        "Something went wrong! Please refresh and try again.",
      );
      return;
    }

    const data = await response.json();
    const token = data["token"];
    await setCookie("token", token);
  }

  // Save the user's changes
  async function saveChanges() {
    const cookie = await getCookie("token");

    const token = cookie["value"];
    const response = await updateUserInfo(props.userInfo, token);

    if (!response.ok) {
      if (response.status == 403) {
        await deleteCookie("token");
        showNavbarAlert(
          "error",
          "Oops! Your session expired. Refresh the page or log back in.",
        );
      } else {
        showNavbarAlert(
          "error",
          "Something went wrong! Please refresh and try again.",
        );
      }
      return;
    }

    showNavbarAlert("success", "Success! Info saved.", 2000);
    props.setIsLoading(false);
  }

  // When the user saves
  async function submit() {
    const loggedInBefore = isLoggedIn;
    const loggedInAfter = await checkIfLoggedIn();

    if (loggedInBefore && !loggedInAfter) {
      return;
    }

    props.setIsLoading(true);
    const cookie = await getCookie("token");
    if (cookie == null) {
      await createGuestAccount();
    }
    await saveChanges();
  }

  return (
    <div className={`${styles.save} primaryEmeraldButton`} onClick={submit}>
      <p>Save</p>
    </div>
  );
}
