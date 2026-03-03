import styles from "./userInfoDetails.module.css";

import UserInfoModel from "../../../models/UserInfoModel";

export default function UserInfoDetails({ userInfo, setUserInfo }) {
  return (
    <section className={styles.container}>
      <div className={styles.firstRow}>
        <div className="primaryEmeraldInput">
          <label>First name</label>
          <input
            type="text"
            placeholder="John"
            value={userInfo.firstName}
            onChange={(event) => {
              setUserInfo((prev) => {
                const copy = new UserInfoModel(prev);
                copy.firstName = event.target.value;
                return copy;
              });
            }}
          ></input>
        </div>
        <div className="primaryEmeraldInput">
          <label>Last name</label>
          <input
            type="text"
            placeholder="Doe"
            value={userInfo.lastName}
            onChange={(event) => {
              setUserInfo((prev) => {
                const copy = new UserInfoModel(prev);
                copy.lastName = event.target.value;
                return copy;
              });
            }}
          ></input>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className="primaryEmeraldInput">
          <label>Email</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={userInfo.email}
            onChange={(event) => {
              setUserInfo((prev) => {
                const copy = new UserInfoModel(prev);
                copy.email = event.target.value;
                return copy;
              });
            }}
          ></input>
        </div>
      </div>

      <div className={styles.thirdRow}>
        <div className="primaryEmeraldInput">
          <label>Phone</label>
          <input
            type="text"
            placeholder="(123) 456-789"
            value={userInfo.phone}
            onChange={(event) => {
              setUserInfo((prev) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

                let formatted = digits;
                if (digits.length > 3 && digits.length <= 6)
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                else if (digits.length > 6)
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;

                const copy = new UserInfoModel(prev);
                copy.phone = formatted;
                return copy;
              });
            }}
          ></input>
        </div>
      </div>
    </section>
  );
}
