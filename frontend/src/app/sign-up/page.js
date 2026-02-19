"use client";

import styles from "./sign-up.module.css";

import Link from "next/link";
import { useState, useContext } from "react";
import { navbarAlertContext } from "../../../components/navbarAlertProvider/navbarAlertProvider";
import { signUp } from "../../../api/authentication";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { showNavbarAlert } = useContext(navbarAlertContext);
  const router = useRouter();

  // User attempts to sign up
  async function submit() {
    if (!validateInput()) {
      return;
    }

    const response = await signUp(username, password, firstName, lastName);

    if (response.ok) {
      showNavbarAlert("success", `Welcome to TeXume ${firstName}!`, 2000);
      router.push("/login");
    } else if (response.status == 409) {
      showNavbarAlert(
        "warning",
        "Username taken. Please try another one.",
        2000,
      );
    } else {
      showNavbarAlert(
        "error",
        "Something went wrong! Please refresh and try again.",
      );
    }
  }

  // Validate the user input
  function validateInput() {
    if (firstName.length < 1 || firstName.length > 32) {
      showNavbarAlert(
        "warning",
        "First name must be between 1-32 characters.",
        2000,
      );
      return false;
    } else if (lastName.length < 1 || lastName.length > 32) {
      showNavbarAlert(
        "warning",
        "Last name must be between 1-32 characters.",
        2000,
      );
      return false;
    } else if (username.length < 2 || username.length > 32) {
      showNavbarAlert(
        "warning",
        "Username must be between 2-32 characters.",
        2000,
      );
      return false;
    } else if (password.length < 6 || password.length > 64) {
      showNavbarAlert(
        "warning",
        "Password must be between 6-64 characters.",
        2000,
      );
      return false;
    }
    return true;
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleText}>
          <p>Sign up</p>
        </div>
        <div className={styles.welcomeText}>
          <p>Making a resume is as easy as 123!</p>
        </div>

        <span className={styles.lineSpacer}></span>

        <div className={styles.firstRow}>
          <div className="primaryEmeraldInput">
            <label>First name</label>
            <input
              type="text"
              placeholder="John"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            ></input>
          </div>
          <div className="primaryEmeraldInput">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Doe"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className={styles.secondRow}>
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

        <div className={styles.thirdRow}>
          <div className="primaryEmeraldInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
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
          <p>Create account</p>
        </div>
        <div className={styles.hasAccountText}>
          <p>Already have an account?</p>
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </section>
  );
}
