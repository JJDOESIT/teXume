"use client";

import styles from "./account.module.css";

import Loading from "../../../components/loading/loading";
import UserAccountModel from "../../../models/UserAccountModel";
import { useContext, useEffect, useState } from "react";
import { navbarAlertContext } from "../../../components/navbarAlertProvider/navbarAlertProvider";
import { useRouter } from "next/navigation";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { deleteCookie, getCookie, setCookie } from "../../../utilities/cookies";
import { getUserAccount, updateUserAccount } from "../../../api/account";
import { accountContext } from "../../../components/accountProvider/accountProvider";

export default function Account() {
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const { isLoggedIn, checkIfLoggedIn } = useContext(accountContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userAccount, setUserAccount] = useState(null);
  const [userAccountBuffer, setUserAccountBuffer] = useState(null);
  const router = useRouter();

  // Authenticate the user
  async function authenticate() {
    const loggedIn = await checkIfLoggedIn();
    const cookie = await getCookie("token");

    if (cookie == null || !loggedIn) {
      showNavbarAlert("error", "Please log in.", 2000);
      router.push("/login");
      return;
    }

    const token = cookie["value"];
    const response = await getUserAccount(token);

    if (!response.ok) {
      await deleteCookie("token");
      router.push("/login");
      return;
    }

    const data = await response.json();
    setUserAccount(new UserAccountModel(data));
    setUserAccountBuffer(new UserAccountModel(data));
    setIsLoading(false);
  }

  // Save updated information
  async function save() {
    if (!validateInput()) {
      return;
    }

    const cookie = await getCookie("token");

    if (cookie == null) {
      router.push("/login");
      return;
    }

    const token = cookie["value"];
    const response = await updateUserAccount(userAccountBuffer, token);

    if (!response.ok) {
      if (response.status == 403) {
        await deleteCookie("token");
        router.push("/login");
        return;
      } else if (response.status == 409) {
        showNavbarAlert(
          "error",
          "Username taken. Please try another one.",
          2000,
        );
      }
      setUserAccountBuffer(userAccount);
      return;
    }

    const jwt = await response.text();
    await setCookie("token", jwt);
    setUserAccount(userAccountBuffer);
    showNavbarAlert("success", "Information saved.", 2000);
    setIsEditing(false);
  }

  // Validate the user input
  function validateInput() {
    if (
      userAccountBuffer.username.length < 2 ||
      userAccountBuffer.username.length > 32
    ) {
      showNavbarAlert(
        "warning",
        "Username must be between 2-32 characters.",
        2000,
      );
      return false;
    } else if (
      userAccountBuffer.password != "" &&
      (userAccountBuffer.password.length < 6 ||
        userAccountBuffer.password.length > 64)
    ) {
      showNavbarAlert(
        "warning",
        "Password must be between 6-64 characters.",
        2000,
      );
      return false;
    }
    return true;
  }

  // Logout the user
  async function logout() {
    await deleteCookie("token");
    router.push("/login");
  }

  // Authenticate the user on render
  useEffect(() => {
    authenticate();
  }, []);

  return (
    <section className={styles.container}>
      {!isLoading ? (
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <p className={styles.pageTitle}>Account Settings</p>
            <div className={styles.details}>
              <div className={styles.detailsHeader}>
                <p>Personal Details</p>
                {!isEditing ? (
                  <div
                    className={`${styles.configure} secondaryGrayButton`}
                    onClick={() => setIsEditing(true)}
                  >
                    <AdjustmentsHorizontalIcon />
                    <p>Configure</p>
                  </div>
                ) : (
                  <div
                    className={`${styles.save} primaryEmeraldButton`}
                    onClick={() => save()}
                  >
                    <p>Save</p>
                  </div>
                )}
              </div>

              <div className={styles.fields}>
                {!isEditing ? (
                  <>
                    <div className={styles.fieldRow}>
                      <p className={styles.fieldLabel}>First Name</p>
                      <p className={styles.fieldValue}>
                        {userAccountBuffer.userInfoModel.firstName}
                      </p>
                    </div>
                    <div className={styles.fieldRow}>
                      <p className={styles.fieldLabel}>Last Name</p>
                      <p className={styles.fieldValue}>
                        {userAccountBuffer.userInfoModel.lastName}
                      </p>
                    </div>
                    <div className={styles.fieldRow}>
                      <p className={styles.fieldLabel}>Username</p>
                      <p className={styles.fieldValue}>
                        {userAccountBuffer.username}
                      </p>
                    </div>
                    <div className={styles.fieldRow}>
                      <p className={styles.fieldLabel}>Password</p>
                      <p className={styles.fieldValue}>••••••••</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`primaryEmeraldInput ${styles.fieldInput}`}>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={userAccountBuffer.userInfoModel.firstName}
                        onChange={(event) => {
                          setUserAccountBuffer((prev) => {
                            let copy = new UserAccountModel(prev);
                            copy.userInfoModel.firstName = event.target.value;
                            return copy;
                          });
                        }}
                      />
                    </div>
                    <div className={`primaryEmeraldInput ${styles.fieldInput}`}>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={userAccountBuffer.userInfoModel.lastName}
                        onChange={(event) => {
                          setUserAccountBuffer((prev) => {
                            let copy = new UserAccountModel(prev);
                            copy.userInfoModel.lastName = event.target.value;
                            return copy;
                          });
                        }}
                      />
                    </div>
                    <div className={`primaryEmeraldInput ${styles.fieldInput}`}>
                      <input
                        type="text"
                        placeholder="Username"
                        value={userAccountBuffer.username}
                        onChange={(event) => {
                          setUserAccountBuffer((prev) => {
                            let copy = new UserAccountModel(prev);
                            copy.username = event.target.value;
                            return copy;
                          });
                        }}
                      />
                    </div>
                    <div className={`primaryEmeraldInput ${styles.fieldInput}`}>
                      <input
                        type="password"
                        placeholder="Password (Leave blank to keep current)"
                        onChange={(event) => {
                          setUserAccountBuffer((prev) => {
                            let copy = new UserAccountModel(prev);
                            copy.password = event.target.value;
                            return copy;
                          });
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.logout} onClick={() => logout()}>
              <p>Log out</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </section>
  );
}
