import UserInfoModel from "../../../models/UserInfoModel";
import { getCookie, setCookie, deleteCookie } from "../../../utilities/cookies";
import { useContext } from "react";
import { navbarAlertContext } from "../../navbarAlertProvider/navbarAlertProvider";
import { updateUserInfo } from "../../../api/account";
import { signUpGuest } from "../../../api/authentication";
import { accountContext } from "../../accountProvider/accountProvider";

export default function UserInfoSave({ userInfo, setUserInfo, setIsLoading }) {
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const { isLoggedIn, checkIfLoggedIn } = useContext(accountContext);

  // Create a guest acccount and populate with user info
  async function createGuestAccount() {
    const response = await signUpGuest(userInfo);

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
    const response = await updateUserInfo(userInfo, token);

    if (!response.ok) {
      if (response.status == 403) {
        await deleteCookie("token");
        showNavbarAlert(
          "error",
          "Oops! Your session expired. Please log back in.",
          2000,
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
    setIsLoading(false);
  }

  // When the user saves
  async function submit() {
    const loggedInBefore = isLoggedIn;
    const loggedInAfter = await checkIfLoggedIn();

    if (loggedInBefore && !loggedInAfter) {
      setUserInfo(new UserInfoModel());
      return;
    }

    setIsLoading(true);
    const cookie = await getCookie("token");
    if (cookie == null) {
      await createGuestAccount();
    }
    await saveChanges();
  }

  return (
    <div className="secondaryEmeraldButton" onClick={submit}>
      <p>Save</p>
    </div>
  );
}
