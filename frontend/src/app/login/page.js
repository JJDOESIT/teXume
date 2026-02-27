"use client";

import styles from "./login.module.css";

import Link from "next/link";
import { useState, useContext } from "react";
import { getCookie, setCookie } from "../../../utilities/cookies";
import { login } from "../../../api/authentication";
import { navbarAlertContext } from "../../../components/navbarAlertProvider/navbarAlertProvider";
import { accountContext } from "../../../components/accountProvider/accountProvider";
import { add } from "../../../api/template";

export default function Login() {
  const { setIsLoggedIn } = useContext(accountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showNavbarAlert } = useContext(navbarAlertContext);

  // When the user attempts to login
  async function submit() {
    setPassword("");

    const response = await login(username, password);
    const data = await response.json();

    if (response.ok) {
      const token = data["jwt"];
      await setCookie("token", token);
      showNavbarAlert("success", "Welcome back!", 2000);
      setIsLoggedIn(true);
    } else if (response.status == 400) {
      showNavbarAlert("error", "Invalid username or password.", 2000);
    } else {
      showNavbarAlert(
        "error",
        "Something went wrong! Please refresh and try again.",
      );
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <button
          onClick={async () => {
            const cookie = await getCookie("token");
            const token = cookie["value"];
            add("Calm", token);
            add("Formal", token);
            add("Italic", token);
            add("Minimal", token);
            add("Professional", token);
            add("Split", token);
            add("Stripped", token);
          }}
        >
          Herro
        </button>
        <div className={styles.wrapper}>
          <div className={styles.titleText}>
            <p>Sign in</p>
          </div>
          <div className={styles.welcomeText}>
            <p>Welcome back! It is nice to see you again.</p>
          </div>

          <div className={styles.firstRow}>
            <div className="primaryEmeraldInput">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className={styles.secondRow}>
            <div className="primaryEmeraldInput">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>
            </div>
          </div>

          <div
            className={`${styles.submit} primaryEmeraldButton`}
            onClick={submit}
          >
            <p>Submit</p>
          </div>

          <span className={styles.lineSpacer}></span>

          <div className={styles.noAccountText}>
            <p>Don't have an account?</p>
          </div>
          <Link
            className={`${styles.signUp} primaryGrayButton`}
            href="/sign-up"
          >
            <p>Sign up now</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
